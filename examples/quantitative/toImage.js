import { createSSRApp } from 'vue'
import axios from 'axios';
import Chart from 'chart.js/auto';
import { createCanvas, loadImage } from 'canvas';
import express from 'express';
import { createApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
const app = express();
const port = 3000;

// 获取股票历史数据
async function getStockData(stockCode) {
    const url = `https://tsanghi.com/api/fin/stock/XSHG/daily?token=55969acdb0134b2eba8bb47dd40c47f7&ticker=${stockCode}`;
    const response = await axios.get(url);
    return response.data.data;
}

// 使用Chart.js可视化数据
function visualizeData(data, startDate, endDate) {
    const filteredData = data.filter(item => {
        const date = new Date(item.date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
    const dates = filteredData.map(item => item.date);
    const closes = filteredData.map(item => item.close);

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

    return canvas;
}

const StockChart = {
    template: `
        <div>
            <div>
                <label>起始日期：</label>
                <input type="date" v-model="startDate" />
                <label>结束日期：</label>
                <input type="date" v-model="endDate" />
                <button @click="fetchData">更新图表</button>
            </div>
            <canvas ref="chartCanvas" style="width:100%;height:500px;"></canvas>
        </div>
    `,
    data() {
        return {
            stockCode: '600519',
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            chartInstance: null
        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const stockData = await getStockData(this.stockCode);
                const canvas = visualizeData(stockData, this.startDate, this.endDate);
                
                // 更新DOM中的canvas
                const ctx = this.$refs.chartCanvas.getContext('2d');
                this.$refs.chartCanvas.width = canvas.width;
                this.$refs.chartCanvas.height = canvas.height;
                ctx.drawImage(canvas, 0, 0);
            } catch (error) {
                console.error('获取数据失败:', error);
            }
        }
    }
};

// 修改 express 路由
app.get('/', async (req, res) => {
    const app = createSSRApp(StockChart);
    
    try {
        const html = await renderToString(app);
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>股票图表</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
                <script>
                    const { createApp } = Vue;
                    const app = createApp(${JSON.stringify(StockChart)});
                    // 确保在客户端挂载时触发mounted
                    app.mount('#app', true);  // 添加true参数强制水合
                </script>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).end('Internal Server Error');
    }
});

// 修改main函数
app.listen(port, () => {
    console.log(`服务已启动，访问 http://localhost:${port}/chart?stockCode=600519&startDate=2023-01-01&endDate=2023-12-31`);
});
