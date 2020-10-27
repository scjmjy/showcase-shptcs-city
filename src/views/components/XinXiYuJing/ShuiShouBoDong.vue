<template>
    <div class="u-rela">
        <div class="bg-earth-left"></div>
        <div class="bg-earth-right"></div>
        <div ref="gaugeChart" style="display: inline-block;" :style="{ width: gaugeWidth + 'px', height: gaugeHeight + 'px' }"></div>
        <div ref="barChart" style="display: inline-block; margin-left: 10px;" :style="{ width: lineWidth + 'px', height: lineHeight + 'px' }"></div>
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
            default: 250
        },
        gaugeHeight: {
            type: Number,
            default: 225
        },
        lineWidth: {
            type: Number,
            default: 350
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
                        textShadowColor: 'white',
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
        barChartOption() {
            if (!this.shuiShouBoDong) {
                return {}
            }
            const { upLog, downLog } = this.shuiShouBoDong
            const series = [
                    { type: 'bar', barWidth: 15, stack: '1', datasetIndex: 0 },
                    { type: 'bar', barWidth: 15, stack: '1', datasetIndex: 0 },
                    { type: 'bar', barWidth: 15, stack: '1', datasetIndex: 0 },
                    { type: 'bar', barWidth: 15, stack: '1', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: '1', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: '1', datasetIndex: 1 }
                ]
            const opt = {
                grid: {
                    top: 70,
                    bottom: 40
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
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: params => {
                        if (Array.isArray(params)) {
                            let tip = ''
                            params.forEach(series => {
                                if (series.value && series.seriesIndex !== undefined) {
                                    const index = (series.seriesIndex % (series.value.length - 1)) + 1
                                    const value = Math.abs(series.value[index])
                                    tip += `${series.seriesName}：${value}家<br/>`
                                }
                            })
                            return tip
                        } else {
                            return ''
                        }
                    },
                    backgroundColor: 'rgb(0,121,202)'
                },
                // legend: {
                //     left: 165,
                //     top: 27,
                //     icon: 'roundRect',
                //     textStyle: { color: 'white' },
                //     data: [{ name: '上升' }, { name: '下降' }]
                // },
                dataset: [{ source: upLog }, { source: downLog }],
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: 'white'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#7389B9'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#0a3053'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: 'white',
                            formatter: value => Math.abs(value)
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
                    }
                ],
                series
            }

            return opt
        }
    },
    data() {
        return {
            gaugeChart: null,
            barChart: null,
            dur: 3000,
            gaugeUpOpts: {
                common: {
                    center: ['28%', '60%'],
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
        if (this.barChart) {
            this.barChart.dispose()
            this.barChart = null
        }
    },
    watch: {
        gaugeChartOption(opt) {
            if (this.gaugeChart) {
                this.gaugeChart.setOption(opt)
            }
        },
        barChartOption(opt) {
            if (this.barChart) {
                this.barChart.setOption(opt)
            }
        }
    },
    methods: {
        initChart() {
            this.gaugeChart = echarts.init(this.$refs.gaugeChart)
            this.barChart = echarts.init(this.$refs.barChart)
            this.barChart.setOption({
                color: [
                    'rgb(253,209,0)',
                    'rgb(199,255,65)',
                    'rgb(255,121,48)',
                    'rgb(51,181,255)',
                    'rgb(63,236,253)',
                    'rgb(0,217,139)',
                    'rgb(38,67,255)'
                ]
            })
        }
    }
})
</script>

<style scoped>
</style>
