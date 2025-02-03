import React, { useState } from 'react';

const StrategyForm = ({ onSubmit, disabled }) => {
  const [parameters, setParameters] = useState({
    stockCode: '',
    strategy: 'sma',
    period: 20,
    startDate: '2023-01-01',
    endDate: '2023-12-31'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(parameters);
    }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">股票代码</label>
          <input
            type="text"
            name="stockCode"
            value={parameters.stockCode}
            onChange={handleChange}
            placeholder="例如: 600519"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">策略选择</label>
          <select
            name="strategy"
            value={parameters.strategy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="sma">简单移动平均线</option>
            <option value="rsi">相对强弱指标</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">周期</label>
          <input
            type="number"
            name="period"
            value={parameters.period}
            onChange={handleChange}
            min="1"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">开始日期</label>
          <input
            type="date"
            name="startDate"
            value={parameters.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">结束日期</label>
          <input
            type="date"
            name="endDate"
            value={parameters.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {disabled ? '回测中...' : '开始回测'}
        </button>
      </div>
    </form>
  );
};

export default StrategyForm;
