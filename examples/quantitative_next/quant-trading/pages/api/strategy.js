import indicators from '../../lib/indicators';

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
        type: 'sma',
        period: period
      };
      
    case 'rsi':
      return {
        name: 'RSI策略',
        parameters: { period },
        type: 'rsi',
        period: period
      };
      
    default:
      throw new Error('不支持的策略类型');
  }
} 