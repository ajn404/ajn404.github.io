<template>
    <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
let chartInstance = null;

const chartOptions = {
    animationDurationUpdate: 1200,
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.4)',
        textStyle: {
            color: '#f3ffff',
        },
        axisPointer: {
            type: 'shadow',
        },
        formatter: (params) => {
            const dataMapping = {
                看电影计划: null,
                看电影完成: null,
                吃爆米花计划: null,
                吃爆米花完成: null,
                追剧计划: null,
                追剧完成: null,
            };

            params.forEach((item) => {
                if (dataMapping[item.seriesName] === null) {
                    dataMapping[item.seriesName] = item.value;
                }
            });

            return `
        看电影计划: ${dataMapping['看电影计划']} &nbsp;&nbsp;
        看电影完成: ${dataMapping['看电影完成']}<br/>
        吃爆米花计划: ${dataMapping['吃爆米花计划']} &nbsp;&nbsp;
        吃爆米花完成: ${dataMapping['吃爆米花完成']}<br/>
        追剧计划: ${dataMapping['追剧计划']} &nbsp;&nbsp;
        追剧完成: ${dataMapping['追剧完成']}<br/>
      `;
        },
        borderColor: 'transparent',
    },
    legend: {
        data: ['看电影计划', '看电影完成', '吃爆米花计划', '吃爆米花完成', '追剧计划', '追剧完成'],
        selectedMode: false,
        textStyle: {
            color: '#fff',
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 40,
        right: '4%',
        top: 21,
    },
    grid: {
        left: '1%',
        right: '1%',
        bottom: '5%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            data: [
                '小明', '小红', '小刚', '小丽', '小强', '小美', '小张', '小李', '小王', '小陈', '小刘', '小黄', '小周', '小吴',
            ],
            axisLabel: {
                color: '#D4EFFF',
            },
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.1)',
                },
            },
        },
        {
            type: 'category',
            show: false,
            data: [
                '小明', '小红', '小刚', '小丽', '小强', '小美', '小张', '小李', '小王', '小陈', '小刘', '小黄', '小周', '小吴',
            ],
        },
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                color: '#D4EFFF',
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.1)',
                },
            },
        },
    ],
    series: [
        {
            name: '看电影计划',
            type: 'bar',
            xAxisIndex: 1,
            data: Array(14).fill(5),
            barWidth: 16,
            itemStyle: {
                color: 'rgba(6, 255, 164, 0.2)',
            },
            z: 1,
        },
        {
            name: '看电影完成',
            type: 'bar',
            data: [3, 2, 4, 1, 5, 4, 2, 5, 3, 4, 2, 1, 5, 3],
            barWidth: 8,
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(6, 255, 164, 1)' },
                        { offset: 1, color: 'rgba(14, 255, 209, 0)' },
                    ],
                    global: false,
                },
                borderWidth: 4,
            },
            z: 2,
        },
        {
            name: '吃爆米花计划',
            type: 'bar',
            xAxisIndex: 1,
            data: Array(14).fill(10),
            barWidth: 16,
            itemStyle: {
                color: 'rgba(0, 219, 255, 0.2)',
            },
            z: 1,
        },
        {
            name: '吃爆米花完成',
            type: 'bar',
            data: [7, 8, 9, 6, 10, 5, 8, 7, 9, 10, 6, 8, 5, 7],
            barWidth: 8,
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(0, 219, 255, 1)' },
                        { offset: 1, color: 'rgba(0, 219, 255, 0)' },
                    ],
                    global: false,
                },
                borderWidth: 4,
            },
            z: 2,
        },
        {
            name: '追剧计划',
            type: 'bar',
            xAxisIndex: 1,
            data: Array(14).fill(20),
            barWidth: 16,
            itemStyle: {
                color: 'rgba(255, 176, 6, 0.2)',
            },
            z: 1,
        },
        {
            name: '追剧完成',
            type: 'bar',
            data: [18, 19, 17, 16, 20, 14, 19, 18, 17, 20, 15, 19, 14, 18],
            barWidth: 8,
            barGap: '140%',
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(255, 176, 6, 1)' },
                        { offset: 1, color: 'rgba(255, 176, 6, 0)' },
                    ],
                    global: false,
                },
            },
            z: 2,
        },
    ],
};

const initMarkPoint = () => {
    chartOptions.series.forEach((item) => {
        if (item.barWidth === 8) {
            item.markPoint = {
                symbol: 'rect',
                symbolSize: [14, 1],
                label: {
                    show: false,
                },
                data: item.data.map((data, index) => ({ coord: [index, data] })),
            };
        }
    });
};

const renderChart = () => {
    if (chartRef.value) {
        chartInstance = echarts.init(chartRef.value);
        initMarkPoint();
        chartInstance.setOption(chartOptions);
    }
};

onMounted(() => {
    renderChart();
    window.addEventListener('resize', chartInstance.resize);
});

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.dispose();
    }
    window.removeEventListener('resize', chartInstance.resize);
});
</script>

<style scoped>
.chart {
    width: 100%;
    height: 260px;
}
</style>
