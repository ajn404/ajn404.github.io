<template>
    <div class="chart-container">
        <div ref="chart" class="chart" </div>
        </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, nextTick } from 'vue';
const chart = ref(null);


let myChart = null;

const initChart = (draftChartJson, china) => {
    if (myChart) return

    let data = draftChartJson;
    data.cities.forEach((fromCity, fromIndex) => {
        data.cities.forEach((toCity, toIndex) => {
            // 确保不从自己到自己，并且只处理组合（fromIndex < toIndex）
            if (fromIndex < toIndex) {
                data.moveLines.push({
                    fromName: fromCity.name,
                    toName: toCity.name,
                    coords: [
                        fromCity.value.slice(0, 2), // 取经纬度
                        toCity.value.slice(0, 2)
                    ],
                });
            }
        });
    });
    echarts.registerMap('china', china)
    myChart = echarts.init(chart.value);
    const option = {
        backgroundColor: 'rgb(28,61,115)',
        legend: {
            show: true,
            orient: 'vertical',
            top: '80%',
            left: '30%',
            data: ['地点', '线路'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: [
            {
                map: 'china',
                zlevel: -1,
                zoom: 1.2,
                silent: true,
                layoutCenter: ['50%', '50%'],
                layoutSize: '100%',
                roam: false,
          
                label: {
                    emphasis: {
                        //动态展示的样式
                        show: false,
                        color: '#fff',
                    },
                },
            },
            {
                show: true,
                map: 'china',
                zoom: 1.2,
                layoutCenter: ['50%', '50%'],
                layoutSize: '100%',

                label: {
                    emphasis: {
                        //动态展示的样式
                        color: '#fff',
                    },
                },

                blur: {
                    label: {
                        show: true,
                        color: '#000',
                    },
                },
                roam: false, // 是否开启鼠标滚轮缩放
                itemStyle: {
                    emphasis: {
                        label: {
                            show: true,
                            color: '#fff',
                        },
                        borderWidth: 3,
                        borderColor: 'rgba(255, 230, 175,0.8)',
                        shadowColor: 'rgba(255, 230, 175,0.5)',
                        shadowBlur: 30,
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                            backgroundColor: 'transparent',
                        },
                        areaColor: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: '#1cfbfe',
                                },
                                {
                                    offset: 1,
                                    color: '#3348e7',
                                },
                            ],
                            false
                        ),
                    },
                },
            },
            {
                type: 'map',
                map: 'china',
                zlevel: -2,
                zoom: 1.2,
                layoutCenter: ['50%', '51.4%'],
                layoutSize: '100%',
                roam: false,
                silent: true,
                regions: [
                    {
                        name: '南海诸岛',
                        label: {
                            show: false, // 隐藏文字
                        },
                    },
                ],
            },
            {
                type: 'map',
                map: 'china',
                zlevel: -3,
                zoom: 1.2,
                layoutCenter: ['50%', '52.4%'],
                layoutSize: '100%',
                roam: false,
                silent: true,
                regions: [
                    {
                        name: '南海诸岛',
                        label: {
                            show: false, // 隐藏文字
                        },
                    },
                ],
            }],
        series: [{
            name: '地点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
                period: 15,
                scale: 4,
                brushType: 'fill'
            },
            hoverAnimation: true,
            symbolSize: 12,
            data: data.cities
        }, {
            name: '线路',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 7, //图标大小
            },
            data: data.moveLines
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });

}

onMounted(async () => {
    const chinaData = await fetch("/assets/json/china.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const chinaJson = await chinaData.json();

    const draftChartJsonData = await fetch("/assets/json/points.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const draftChartJson = await draftChartJsonData.json();
    nextTick(() => {
        initChart(draftChartJson, chinaJson);
    })
})
</script>

<style scoped>
.chart-container {
    height: 200px;
    width: 200px;
}
 .chart {
     margin: 0 auto;
     height: 100%;
     width: 100%;
 }
</style>
