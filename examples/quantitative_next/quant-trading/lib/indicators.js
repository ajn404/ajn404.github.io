// 技术指标库
const indicators = {
  // 简单移动平均线 (SMA)
  sma: function(data, period) {
    const result = [];
    for(let i = 0; i < data.length; i++) {
      if(i < period - 1) {
        result.push(null);
        continue;
      }
      let sum = 0;
      for(let j = 0; j < period; j++) {
        sum += data[i - j];
      }
      result.push(sum / period);
    }
    return result;
  },
  
  // 相对强弱指标 (RSI)
  rsi: function(data, period = 14) {
    const changes = [];
    const gains = [];
    const losses = [];
    let avgGain = 0;
    let avgLoss = 0;
    const result = [];

    // 计算价格变化
    for(let i = 1; i < data.length; i++) {
      changes[i] = data[i] - data[i-1];
      gains[i] = changes[i] > 0 ? changes[i] : 0;
      losses[i] = changes[i] < 0 ? -changes[i] : 0;
    }

    // 计算首个 RSI
    for(let i = 1; i <= period; i++) {
      avgGain += gains[i];
      avgLoss += losses[i];
    }
    
    avgGain = avgGain / period;
    avgLoss = avgLoss / period;

    for(let i = 0; i < period; i++) {
      result.push(null);
    }

    // 首个 RSI 值
    let rs = avgGain / avgLoss;
    result.push(100 - (100 / (1 + rs)));

    // 计算后续的 RSI 值
    for(let i = period + 1; i < data.length; i++) {
      avgGain = ((avgGain * (period - 1)) + gains[i]) / period;
      avgLoss = ((avgLoss * (period - 1)) + losses[i]) / period;
      rs = avgGain / avgLoss;
      result.push(100 - (100 / (1 + rs)));
    }

    return result;
  }
};

export default indicators;
