import indicators from '../lib/indicators';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 请求' });
  }

  try {
    const { strategy, period } = req.body;
    
    // 根据选择的策略类型返回相应的策略对象
    const strategyImplementation = createStrategy(strategy, Number(period));
    
    res.status(200).json(strategyImplementation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createStrategy(strategyType, period) {
  switch (strategyType) {
    case 'sma':
      return {
        name: '简单移动平均线策略',
        parameters: { period },
        
        generateSignal(data) {
          if (data.length < period + 1) return null;
          
          const prices = data.map(candle => candle.close);
          const sma = indicators.sma(prices, period);
          const currentPrice = prices[prices.length - 1];
          const currentSMA = sma[sma.length - 1];
          const previousPrice = prices[prices.length - 2];
          const previousSMA = sma[sma.length - 2];
          
          // 价格从下方穿过 SMA，买入信号
          if (previousPrice < previousSMA && currentPrice > currentSMA) {
            return 'buy';
          }
          
          // 价格从上方穿过 SMA，卖出信号
          if (previousPrice > previousSMA && currentPrice < currentSMA) {
            return 'sell';
          }
          
          return null;
        }
      };
      
    case 'rsi':
      return {
        name: 'RSI策略',
        parameters: { period },
        
        generateSignal(data) {
          if (data.length < period + 1) return null;
          
          const prices = data.map(candle => candle.close);
          const rsiValues = indicators.rsi(prices, period);
          const currentRSI = rsiValues[rsiValues.length - 1];
          
          // RSI < 30 超卖，买入信号
          if (currentRSI < 30) {
            return 'buy';
          }
          
          // RSI > 70 超买，卖出信号
          if (currentRSI > 70) {
            return 'sell';
          }
          
          return null;
        }
      };
      
    default:
      throw new Error('不支持的策略类型');
  }
}

// 辅助函数：计算策略性能指标
function calculateStrategyMetrics(trades) {
  const winningTrades = trades.filter(trade => trade.profit > 0);
  const losingTrades = trades.filter(trade => trade.profit <= 0);
  
  return {
    totalTrades: trades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    winRate: winningTrades.length / trades.length,
    averageWin: winningTrades.reduce((sum, trade) => sum + trade.profit, 0) / winningTrades.length,
    averageLoss: losingTrades.reduce((sum, trade) => sum + trade.profit, 0) / losingTrades.length,
    profitFactor: Math.abs(
      winningTrades.reduce((sum, trade) => sum + trade.profit, 0) /
      losingTrades.reduce((sum, trade) => sum + trade.profit, 0)
    )
  };
}
