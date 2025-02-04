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

    if (!data || !data.length) {
      chartInstance.current.setOption({
        title: {
          text: '暂无数据',
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#999',
            fontSize: 20
          }
        }
      });
      return;
    }

    const option = {
      title: { 
        text: '价格走势与交易信号',
        left: 'center',
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['价格', '买入点', '卖出点'],
        bottom: 10
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.date),
        axisLabel: {
          formatter: (value) => {
            return value.substring(5); // 只显示月-日
          }
        }
      },
      yAxis: {
        type: 'value',
        scale: true,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: '价格',
          type: 'line',
          data: data.map(item => item.close),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1
          }
        }
      ]
    };

    // 如果有回测结果，添加交易点位
    if (backtestResults && backtestResults.trades) {
      option.series.push(
        {
          name: '买入点',
          type: 'scatter',
          data: backtestResults.trades.map(trade => [
            data.findIndex(item => item.timestamp === trade.entryTime),
            trade.entry
          ]),
          itemStyle: { color: '#91cc75' },
          symbolSize: 10
        },
        {
          name: '卖出点',
          type: 'scatter',
          data: backtestResults.trades.map(trade => [
            data.findIndex(item => item.timestamp === trade.exitTime),
            trade.exit
          ]),
          itemStyle: { color: '#ee6666' },
          symbolSize: 10
        }
      );
    }

    chartInstance.current.setOption(option);
  }, [data, backtestResults]);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-[600px]"
    />
  );
};

export default Chart;
