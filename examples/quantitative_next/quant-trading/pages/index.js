import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import StrategyForm from '../components/StrategyForm';
import Backtest from '../lib/backtest';

export default function Home() {
  const [marketData, setMarketData] = useState(null);
  const [backtestResults, setBacktestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      // 使用默认股票代码进行初始化
      const response = await fetch('/api/data?stockCode=600519');
      const data = await response.json();
      setMarketData(data.data); // 注意这里要访问 data.data
    } catch (error) {
      console.error('获取市场数据失败:', error);
    }
  };

  const handleStrategySubmit = async (parameters) => {
    setLoading(true);
    try {
      // 首先获取股票数据
      const response = await fetch(`/api/data?stockCode=${parameters.stockCode}&startDate=${parameters.startDate}&endDate=${parameters.endDate}`);
      const { data: stockData } = await response.json();
      setMarketData(stockData);

      // 然后获取策略实现
      const strategyResponse = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: parameters.strategy,
          period: Number(parameters.period)
        })
      });
      const strategy = await strategyResponse.json();
      
      // 运行回测
      const backtest = new Backtest(stockData, strategy);
      const results = backtest.run();
      setBacktestResults(results);
    } catch (error) {
      console.error('回测失败:', error);
      alert('回测失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">量化交易回测系统</h1>
      <StrategyForm onSubmit={handleStrategySubmit} disabled={loading} />
      {loading && <div className="my-4">正在进行回测...</div>}
      {backtestResults && (
        <div className="my-4">
          <h2 className="text-xl font-bold">回测结果</h2>
          <p>最终资金: ¥{backtestResults.finalCapital.toFixed(2)}</p>
          <p>收益率: {(backtestResults.returns * 100).toFixed(2)}%</p>
        </div>
      )}
      <Chart data={marketData} backtestResults={backtestResults} />
    </div>
  );
} 