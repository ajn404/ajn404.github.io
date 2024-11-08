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
    let list = [];
    const fromCity = {
        "name": "恩施",
        "value": [109.486991, 30.284255, 3]
    };
    data.cities.forEach((toCity, toIndex) => {
        // 确保不从自己到自己，并且只处理组合（fromIndex < toIndex）
        list.push(`${fromCity.name}-${toCity.name}`);
        if (!list.includes(`${toCity.name}-${fromCity.name}`))
            data.moveLines.push({
                fromName: fromCity.name,
                toName: toCity.name,
                coords: [
                    fromCity.value.slice(0, 2), // 取经纬度
                    toCity.value.slice(0, 2)
                ],
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
                layoutSize: '75%',
                roam: false,

                itemStyle: {
                    normal: {
                        borderColor: 'rgba(192,245,249,.8)',
                        borderWidth: 3,
                        shadowColor: '#6FFDFF',
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    },
                },
            },
            {
                show: true,
                map: 'china',
                zoom: 1.2,
                layoutCenter: ['50%', '50%'],
                layoutSize: '75%',

                label: {
                    normal: {
                        //静态的时候展示样式
                        show: true, //是否显示地图省份得名称
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                            fontFamily: 'Arial',
                        },
                    },
                    emphasis: {
                        //动态展示的样式
                        color: '#fff',
                    },
                },
                roam: false, // 是否开启鼠标滚轮缩放
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            color: '#fff',
                        },
                        color: '#fff',
                        borderColor: '#32CBE0',
                        borderWidth: 1.5,
                        areaColor: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 1000,
                            x2: 0,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0.5,
                                    color: '#0D59C1', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#53C9C7', // 100% 处的颜色
                                },
                            ],
                            global: true, // 缺省为 false
                        },
                    },
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
                layoutSize: '75%',
                roam: false,
                silent: true,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(35, 161, 184,0.5)',
                        shadowColor: 'rgba(35, 161, 184,0.8)',
                        shadowOffsetY: 5,
                        shadowBlur: 15,
                        areaColor: '#257AB2',
                    },
                },
                regions: [
                    {
                        name: '南海诸岛',
                        itemStyle: {
                            // 隐藏地图
                            normal: {
                                opacity: 0, // 为 0 时不绘制该图形
                            },
                        },
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
                layoutSize: '75%',
                roam: false,
                silent: true,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(7, 65, 117,0.5)',
                        shadowColor: 'rgba(7, 65, 117,0.8)',
                        shadowOffsetY: 15,
                        shadowBlur: 8,
                        areaColor: '#0A2763',
                    },
                },
                regions: [
                    {
                        name: '南海诸岛',
                        itemStyle: {
                            // 隐藏地图
                            normal: {
                                opacity: 0, // 为 0 时不绘制该图形
                            },
                        },
                        label: {
                            show: false, // 隐藏文字
                        },
                    },
                ],
            }],
        series: [{
            tooltip: {
                show: false,
            },
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
                scale: 10,
                brushType: 'stroke',
            },
            showEffectOn: 'render',
            itemStyle: {
                normal: {
                    shadowColor: '#0ff',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    color: function (params) {
                        let colorList = [
                            new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#64fbc5',
                                },
                                {
                                    offset: 1,
                                    color: '#018ace',
                                },
                            ]),
                            new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#64fbc5',
                                },
                                {
                                    offset: 1,
                                    color: '#018ace',
                                },
                            ]),
                            new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#168e6d',
                                },
                                {
                                    offset: 1,
                                    color: '#c78d7b',
                                },
                            ]),
                            new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#61c0f1',
                                },
                                {
                                    offset: 1,
                                    color: '#6f2eb6',
                                },
                            ]),
                            new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#168e6d',
                                },
                                {
                                    offset: 1,
                                    color: '#c78d7b',
                                },
                            ]),
                            new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#61c0f1',
                                },
                                {
                                    offset: 1,
                                    color: '#6f2eb6',
                                },
                            ]),
                        ];
                        return colorList[params.dataIndex];
                    },
                },
            },
            symbolSize: [10, 5],
            data: data.cities,
            zlevel: 1,
        }, {
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
    const draftChartJsonData = await fetch("/assets/json/points.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const chinaJson = await chinaData.json();
    const draftChartJson = await draftChartJsonData.json();
    nextTick(() => {
        initChart(draftChartJson, chinaJson);
    })
})
</script>

<style scoped>
.chart-container {
    height: 100vh;
    width: 100vw;
}

.chart {
    margin: 0 auto;
    height: 100%;
    width: 100%;
}
</style>
