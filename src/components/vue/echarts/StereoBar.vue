<template>
    <div class="chart" ref="chart"></div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);
let myChart = null;

const chartData = ref([
    {
        name: 'Marketing',
        value: 35,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#ff9a9e' }, // Pink (start)
            { offset: 1, color: '#fad0c4' }  // Light Pink (end)
        ]),
    },
    {
        name: 'Sales',
        value: 50,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#a18cd1' }, // Purple (start)
            { offset: 1, color: '#fbc2eb' }  // Light Purple (end)
        ]),
    },
    {
        name: 'Finance',
        value: 65,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#84fab0' }, // Green (start)
            { offset: 1, color: '#8fd3f4' }  // Light Green (end)
        ]),
    },
    {
        name: 'Operations',
        value: 80,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#ffecd2' }, // Orange (start)
            { offset: 1, color: '#fcb69f' }  // Light Orange (end)
        ]),
    },
    {
        name: 'Human Resources',
        value: 55,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#89f7fe' }, // Light Blue (start)
            { offset: 1, color: '#66a6ff' }  // Blue (end)
        ]),
    },
    {
        name: 'Product Development',
        value: 70,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#f6d365' }, // Yellow (start)
            { offset: 1, color: '#fda085' }  // Light Yellow (end)
        ]),
    },
    {
        name: 'IT',
        value: 45,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#c3cfe2' }, // Greyish Blue (start)
            { offset: 1, color: '#e2e2e2' }  // Light Grey (end)
        ]),
    },
    {
        name: 'Legal',
        value: 60,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#fcb69f' }, // Peach (start)
            { offset: 1, color: '#fdabac' }  // Light Peach (end)
        ]),
    }
]);

const maxData = computed(() => {
    return chartData.value.reduce((pre, cur) => {
        return Math.max(pre || 0, cur ? cur.value : 0);
    }, 0) + 10;
});

const initChart = () => {
    if (!myChart) myChart = echarts.init(chart.value);
    const data = chartData.value;
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: params => {
                const item = params[0];
                return `${item.seriesName}<br/>${item.name} : ${item.value}`;
            }
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '0%',
            top: '5%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                data: data.map(item => item.name),
                axisLine: { show: false },
                axisLabel: { color: '#fff' }
            },
            {
                type: 'category',
                axisTick: { show: false },
                data: data.map(item => item.name),
                axisLine: { show: false },
                axisLabel: { show: false }
            }
        ],
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisLabel: { show: false, color: '#fff' },
            splitLine: { show: false }
        },
        series: [
            {
                name: 'Department Distribution',
                type: 'pictorialBar',
                symbolSize: [30, 10],
                symbolOffset: [0, -5],
                z: 120,
                data: data.map(item => ({
                    value: item.value,
                    symbolPosition: 'end',
                    itemStyle: {
                        color: item.color,
                    }
                })),
            },
            {
                name: 'Department Distribution',
                type: 'bar',
                data: data.map(item => ({
                    value: item.value,
                    itemStyle: {
                        color: item.color,
                    }
                })),
                label: {
                    show: true,
                    position: 'top',
                    color: '#fff'
                },
                barWidth: 30,
            },
            {
                name: 'Department Distribution',
                type: 'bar',
                xAxisIndex: 1,
                data: data.map(item => ({
                    value: maxData.value,
                    itemStyle: {
                        color: 'rgba(61,187,255,.16)',
                        borderRadius: 5,
                    }
                })),
                barWidth: 30
            }
        ],
    };

    myChart.setOption(option);
};

onMounted(async () => {
    await nextTick();
    initChart();
});

watch(() => chartData.value, async () => {
    initChart();
});
</script>

<style scoped>
.chart {
    width: 100%;
    height: 200px;
}
</style>
