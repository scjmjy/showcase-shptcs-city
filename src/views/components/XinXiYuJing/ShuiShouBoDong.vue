<template>
    <div class="u-rela">
        <div class="bg-earth-left"></div>
        <div class="bg-earth-right"></div>
        <div ref="gaugeChart" style="display: inline-block;" :style="{ width: gaugeWidth + 'px', height: gaugeHeight + 'px' }"></div>
        <div ref="lineChart" style="display: inline-block;" :style="{ width: lineWidth + 'px', height: lineHeight + 'px' }"></div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import echarts from 'echarts'

export default Vue.extend({
    props: {
        gaugeWidth: {
            type: Number,
            default: 230
        },
        gaugeHeight: {
            type: Number,
            default: 225
        },
        lineWidth: {
            type: Number,
            default: 325
        },
        lineHeight: {
            type: Number,
            default: 225
        }
    },
    computed: {
        ...mapState({
            shuiShouBoDong: state => state.shuiShouBoDong
        }),
        gaugeChartOption() {
            if (!this.shuiShouBoDong) {
                return {}
            }
            const { upNum, upPercent, downNum, downPercent } = this.shuiShouBoDong.upAndDown
            const opt = {
                title: {
                    text: '重点企业税收波动预警',
                    left: 'center',
                    top: 25,
                    textStyle: {
                        color: 'white',
                        fontSize: 20,
                        textShadowColor: '#88EEEE',
                        textShadowBlur: 5
                    }
                },
                series: [
                    {
                        ...this.gaugeUpOpts.common,
                        type: 'gauge',
                        min: 0,
                        max: Math.max(100, upPercent),
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                width: 8,
                                color: [
                                    [upPercent / 100, 'rgb(255,76,53)'],
                                    [1, 'rgb(0,193,250)']
                                ]
                            }
                        },
                        axisTick: {
                            // 坐标轴小标记
                            show: false
                        },
                        title: this.gaugeUpOpts.title,
                        splitLine: {
                            // 分隔线
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        detail: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            formatter: function(value) {
                                return `{up|}{v|${value}}{percent|%}`
                            },
                            ...this.gaugeUpOpts.detail
                        },
                        data: [{ value: upPercent, name: upNum + '家' }]
                    },
                    {
                        ...this.gaugeDownOpts.common,
                        type: 'gauge',
                        min: 0,
                        max: Math.max(100, upPercent),
                        pointer: {
                            show: false
                        },
                        title: this.gaugeDownOpts.title,
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                width: 8,
                                color: [
                                    [downPercent / 100, 'rgb(0,255,120)'],
                                    [1, 'rgb(0,193,250)']
                                ]
                            }
                        },
                        axisTick: {
                            // 坐标轴小标记
                            show: false
                        },
                        splitLine: {
                            // 分隔线
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        detail: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            formatter: function(value) {
                                return `{down|}{v|${value}}{percent|%}`
                            },
                            ...this.gaugeDownOpts.detail
                        },
                        data: [{ value: downPercent, name: downNum + '家' }]
                    }
                ]
            }
            return opt
        },
        lineChartOption() {
            if (!this.shuiShouBoDong) {
                return {}
            }
            const { upLog, downLog } = this.shuiShouBoDong
            const opt = {
                grid: {
                    top: 70
                },
                title: {
                    text: '{icon|}{v|近180天税收波动预警}',
                    top: 25,
                    textStyle: {
                        rich: {
                            icon: {
                                width: 20,
                                height: 20,
                                backgroundColor: {
                                    image: require('@/assets/img/alarm_bell.png')
                                }
                            },
                            v: {
                                color: 'rgb(0,184,248)',
                                fontWeight: 'bolder',
                                fontSize: 14,
                                padding: [0, 0, 0, 3]
                            }
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgb(0,121,202)',
                    formatter: params => {
                        const month = params[0].value[0]
                        const up = params[0].value[1]
                        const down = params[1].value[1]
                        return `${month}月<br/>税收上升：${up}家<br/>税收下降：${down}家`
                    }
                },
                legend: {
                    left: 165,
                    top: 27,
                    icon: 'roundRect',
                    textStyle: { color: 'white' },
                    data: [{ name: '上升' }, { name: '下降' }]
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        color: 'white',
                        formatter: '{value}月'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#0a3053'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#0a3053'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'white'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#0a3053'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#0a3053'
                        }
                    }
                },
                series: [
                    {
                        name: '上升',
                        type: 'line',
                        data: upLog,
                        itemStyle: {
                            color: 'rgb(255,80,66)'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgb(255,80,66, 0.3)' },
                                    { offset: 1, color: 'rgb(255,80,66, 0.05)' }
                                ]
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 6
                    },
                    {
                        name: '下降',
                        type: 'line',
                        data: downLog,
                        itemStyle: {
                            color: 'rgb(0,215,143)'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgb(0,215,143, 0.3)' },
                                    { offset: 1, color: 'rgb(0,215,143, 0.05)' }
                                ]
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 6
                    }
                ]
            }

            return opt
        }
    },
    data() {
        return {
            gaugeChart: null,
            lineChart: null,
            dur: 3000,
            gaugeUpOpts: {
                common: {
                    center: ['28%', '60%'],
                    radius: '40%'
                },
                title: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    offsetCenter: [0, '90%'],
                    // borderRadius: 50,
                    // backgroundColor: '#009bf8',
                    backgroundColor: {
                        image: require('@/assets/img/pill.png')
                    },
                    width: 65,
                    fontSize: 14,
                    lineHeight: 23,
                    color: '#eee',
                    rich: {}
                },
                detail: {
                    offsetCenter: [0, '5%'],
                    rich: {
                        up: {
                            width: 12,
                            height: 17,
                            backgroundColor: {
                                image: require('@/assets/img/arrow_up.png')
                            }
                        },
                        v: {
                            fontWeight: 'bolder',
                            fontSize: 21,
                            color: 'rgb(255,76,53)',
                            padding: [0, 0, 0, 3]
                        },
                        percent: {
                            fontSize: 14
                        }
                    }
                }
            },
            gaugeDownOpts: {
                common: {
                    center: ['75%', '60%'],
                    radius: '40%'
                },
                title: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    offsetCenter: [0, '90%'],
                    backgroundColor: {
                        image: require('@/assets/img/pill.png')
                    },
                    width: 65,
                    fontSize: 14,
                    lineHeight: 23,
                    color: '#eee',
                    rich: {}
                },
                detail: {
                    offsetCenter: [0, '5%'],
                    rich: {
                        down: {
                            width: 12,
                            height: 17,
                            backgroundColor: {
                                image: require('@/assets/img/arrow_down.png')
                            }
                        },
                        v: {
                            fontWeight: 'bolder',
                            fontSize: 21,
                            color: 'rgb(0,255,120)',
                            padding: [0, 0, 0, 3]
                        },
                        percent: {
                            fontSize: 14
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (this.gaugeChart) {
            this.gaugeChart.dispose()
            this.gaugeChart = null
        }
        if (this.lineChart) {
            this.lineChart.dispose()
            this.lineChart = null
        }
    },
    watch: {
        gaugeChartOption(opt) {
            if (this.gaugeChart) {
                this.gaugeChart.setOption(opt)
            }
        },
        lineChartOption(opt) {
            if (this.lineChart) {
                this.lineChart.setOption(opt)
            }
        }
    },
    methods: {
        initChart() {
            this.gaugeChart = echarts.init(this.$refs.gaugeChart)
            this.lineChart = echarts.init(this.$refs.lineChart)
        }
    }
})
</script>

<style scoped>
.bg-earth-left {
    position: absolute;
    left: 18px;
    top: 95px;
    width: 90px;
    height: 97px;
    background-image: url(../../../assets/img/earth_small.png);
    background-repeat: no-repeat;
    background-size: contain;
}
.bg-earth-right {
    position: absolute;
    left: 128px;
    top: 95px;
    width: 90px;
    height: 97px;
    background-image: url(../../../assets/img/earth_small.png);
    background-repeat: no-repeat;
    background-size: contain;
}
</style>
