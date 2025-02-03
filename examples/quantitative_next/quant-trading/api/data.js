import axios from 'axios';

// 数据获取API
export default async function handler(req, res) {
  try {
    const { stockCode, startDate, endDate } = req.query;
    
    if (!stockCode) {
      return res.status(400).json({ error: '请提供股票代码' });
    }

    // 设置默认的日期范围
    const defaultStartDate = startDate || '2023-01-01';
    const defaultEndDate = endDate || '2023-12-31';

    const url = `https://tsanghi.com/api/fin/stock/XSHG/daily?token=55969acdb0134b2eba8bb47dd40c47f7&ticker=${stockCode}&startDate=${defaultStartDate}&endDate=${defaultEndDate}`;
    
    const response = await axios.get(url);
    const stockData = response.data.data;

    // 格式化数据以适应我们的回测系统
    const formattedData = stockData.map(item => ({
      timestamp: new Date(item.date).getTime(),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      date: item.date
    }));

    // 按日期升序排序
    formattedData.sort((a, b) => a.timestamp - b.timestamp);

    res.status(200).json({
      success: true,
      data: formattedData,
      metadata: {
        stockCode,
        startDate: defaultStartDate,
        endDate: defaultEndDate,
        totalRecords: formattedData.length
      }
    });
  } catch (error) {
    console.error('获取股票数据失败:', error);
    res.status(500).json({ 
      error: '获取数据失败',
      message: error.message 
    });
  }
}
