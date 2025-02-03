import indicators from './indicators';

class Backtest {
  constructor(data, strategy, initialCapital = 100000) {
    this.data = data;
    this.strategy = strategy;
    this.initialCapital = initialCapital;
    this.reset();
  }

  reset() {
    this.capital = this.initialCapital;
    this.positions = [];
    this.trades = [];
    this.equity = [];
    this.drawdown = [];
  }

  // 根据策略类型生成交易信号
  generateSignal(data, index) {
    const slicedData = data.slice(0, index + 1);
    const { type, period } = this.strategy;

    switch (type) {
      case 'sma': {
        if (slicedData.length < period + 1) return null;
        
        const prices = slicedData.map(candle => candle.close);
        const sma = indicators.sma(prices, period);
        const currentPrice = prices[prices.length - 1];
        const currentSMA = sma[sma.length - 1];
        const previousPrice = prices[prices.length - 2];
        const previousSMA = sma[sma.length - 2];
        
        if (previousPrice < previousSMA && currentPrice > currentSMA) {
          return 'buy';
        }
        if (previousPrice > previousSMA && currentPrice < currentSMA) {
          return 'sell';
        }
        return null;
      }
      
      case 'rsi': {
        if (slicedData.length < period + 1) return null;
        
        const prices = slicedData.map(candle => candle.close);
        const rsiValues = indicators.rsi(prices, period);
        const currentRSI = rsiValues[rsiValues.length - 1];
        
        if (currentRSI < 30) return 'buy';
        if (currentRSI > 70) return 'sell';
        return null;
      }
      
      default:
        return null;
    }
  }

  run() {
    this.reset();
    
    for(let i = 0; i < this.data.length; i++) {
      const signal = this.generateSignal(this.data, i);
      
      if(signal === 'buy' && this.capital > 0) {
        const price = this.data[i].close;
        const quantity = Math.floor(this.capital * 0.95 / price); // 留5%作为缓冲
        
        if(quantity > 0) {
          const position = { price, quantity, timestamp: this.data[i].timestamp };
          this.positions.push(position);
          this.capital -= price * quantity;
        }
      }
      
      if(signal === 'sell' && this.positions.length > 0) {
        const position = this.positions.pop();
        const price = this.data[i].close;
        const profit = (price - position.price) * position.quantity;
        
        this.capital += position.price * position.quantity + profit;
        this.trades.push({
          entry: position.price,
          exit: price,
          profit,
          entryTime: position.timestamp,
          exitTime: this.data[i].timestamp
        });
      }

      this.equity.push(this.capital + this.positions.reduce((sum, pos) => 
        sum + pos.quantity * this.data[i].close, 0
      ));
    }

    return this.calculateMetrics();
  }

  calculateMetrics() {
    let maxEquity = this.initialCapital;
    let maxDrawdown = 0;

    this.equity.forEach(value => {
      maxEquity = Math.max(maxEquity, value);
      const drawdown = (maxEquity - value) / maxEquity;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
      this.drawdown.push(drawdown);
    });

    const returns = (this.capital - this.initialCapital) / this.initialCapital;
    const winningTrades = this.trades.filter(trade => trade.profit > 0);

    return {
      finalCapital: this.capital,
      returns,
      maxDrawdown,
      totalTrades: this.trades.length,
      winRate: winningTrades.length / this.trades.length || 0,
      trades: this.trades
    };
  }
}

export default Backtest;
