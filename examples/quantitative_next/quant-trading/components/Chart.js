import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Chart = ({ data, backtestResults }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    if (!data || !data.prices) return;

    const option = {
      title: { text: '价格走势与交易信号' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: data.timestamps
      },
      yAxis: {
        type: 'value',
        scale: true
      },
      series: [
        {
          name: '价格',
          type: 'line',
          data: data.prices,
          smooth: true
        }
      ]
    };

    // 如果有回测结果，添加交易点位
    if (backtestResults && backtestResults.trades) {
      option.series.push({
        name: '买入点',
        type: 'scatter',
        data: backtestResults.trades.map(trade => [
          trade.timestamp,
          trade.entry
        ]),
        itemStyle: { color: '#73c0de' }
      });
    }

    chartInstance.current.setOption(option);
  }, [data, backtestResults]);

  return (
    <div 
      ref={chartRef} 
      style={{ height: '500px', width: '100%' }}
      className="mt-8 border rounded shadow-lg"
    />
  );
};

export default Chart;
