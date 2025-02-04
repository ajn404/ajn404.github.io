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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">量化交易回测系统</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6">
            {/* 策略表单部分 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <StrategyForm onSubmit={handleStrategySubmit} disabled={loading} />
              </div>
            </div>

            {/* 加载状态提示 */}
            {loading && (
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-blue-700">正在进行回测...</span>
              </div>
            )}

            {/* 回测结果部分 */}
            {backtestResults && (
              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">回测结果</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="metric-card">
                      <dt className="metric-label">最终资金</dt>
                      <dd className="metric-value">¥{backtestResults.finalCapital.toFixed(2)}</dd>
                    </div>
                    <div className="metric-card">
                      <dt className="metric-label">收益率</dt>
                      <dd className="metric-value text-green-600">
                        {(backtestResults.returns * 100).toFixed(2)}%
                      </dd>
                    </div>
                    <div className="metric-card">
                      <dt className="metric-label">最大回撤</dt>
                      <dd className="metric-value text-red-600">
                        {(backtestResults.maxDrawdown * 100).toFixed(2)}%
                      </dd>
                    </div>
                    <div className="metric-card">
                      <dt className="metric-label">总交易次数</dt>
                      <dd className="metric-value">{backtestResults.totalTrades}</dd>
                    </div>
                    <div className="metric-card">
                      <dt className="metric-label">胜率</dt>
                      <dd className="metric-value">
                        {(backtestResults.winRate * 100).toFixed(2)}%
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 图表部分 */}
            <div className="chart-container">
              <Chart data={marketData} backtestResults={backtestResults} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 