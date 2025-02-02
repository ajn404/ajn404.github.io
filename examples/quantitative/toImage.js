const axios = require('axios');
const Chart = require('chart.js/auto');
const { createCanvas, loadImage } = require('canvas');

// 获取股票历史数据
async function getStockData(stockCode) {
    const url = `https://tsanghi.com/api/fin/stock/XSHG/daily?token=55969acdb0134b2eba8bb47dd40c47f7&ticker=${stockCode}`;
    const response = await axios.get(url);
    return response.data.data;
}

// 使用Chart.js可视化数据
function visualizeData(data) {
    const dates = data.map(item => item.date);
    const closes = data.map(item => item.close);

    // 创建canvas
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');

    // 绘制图表
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '收盘价',
                data: closes,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            responsive: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '日期'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '价格'
                    }
                }
            }
        }
    });

    // 保存图表为图片
    const fs = require('fs');
    const out = fs.createWriteStream('stock_chart.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('图表已保存为 stock_chart.png'));
}

// 主函数
async function main() {
    const stockCode = '600519'; // 长电科技
    const stockData = await getStockData(stockCode);
    visualizeData(stockData);
}

main();
