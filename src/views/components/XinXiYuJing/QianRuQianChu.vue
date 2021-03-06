<template>
    <div class="u-rela">
        <div class="bg-earth-left"></div>
        <div class="bg-earth-right"></div>
        <div ref="gaugeChart" style="display: inline-block;" :style="{ width: gaugeWidth + 'px', height: gaugeHeight + 'px' }"></div>
        <div ref="barChart" style="display: inline-block; margin-left: 10px;" :style="{ width: barWidth + 'px', height: barHeight + 'px' }"></div>
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
        barWidth: {
            type: Number,
            default: 350
        },
        barHeight: {
            type: Number,
            default: 225
        }
    },
    computed: {
        ...mapState({
            qianRuQianChu: state => state.qianRuQianChu
        }),
        gaugeChartOption() {
            if (!this.qianRuQianChu) {
                return {}
            }
            const { inNum, inPercent, outNum, outPercent } = this.qianRuQianChu.inAndOut
            const opt = {
                title: {
                    text: '迁入迁出企业统计',
                    left: 'center',
                    top: 25,
                    textStyle: {
                        color: 'white',
                        fontSize: 20
                        // textShadowColor: 'white',
                        // textShadowBlur: 5
                    }
                },
                series: [
                    {
                        ...this.gaugeUpOpts.common,
                        type: 'gauge',
                        min: 0,
                        max: Math.max(100, inPercent),
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                width: 10,
                                color: [
                                    [inPercent / 100, 'rgb(255,76,53)'],
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
                                return `{in|}{v|${value}}{percent|%}`
                            },
                            ...this.gaugeUpOpts.detail
                        },
                        data: [{ value: inPercent, name: inNum + '家' }]
                    },
                    {
                        ...this.gaugeDownOpts.common,
                        type: 'gauge',
                        min: 0,
                        max: Math.max(100, inPercent),
                        pointer: {
                            show: false
                        },
                        title: this.gaugeDownOpts.title,
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                width: 10,
                                color: [
                                    [outPercent / 100, 'rgb(0,255,120)'],
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
                                return `{out|}{v|${value}}{percent|%}`
                            },
                            ...this.gaugeDownOpts.detail
                        },
                        data: [{ value: outPercent, name: outNum + '家' }]
                    }
                ]
            }
            return opt
        },
        barChartOption() {
            if (!this.qianRuQianChu) {
                return {}
            }
            const { inLog, outLog } = this.qianRuQianChu
            const opt = {
                grid: {
                    top: 70,
                    bottom: 40
                },
                title: {
                    text: '{icon|}{v|近180天迁入迁出统计}',
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
                        const down = Math.abs(params[1].value[1])
                        return `${month}<br/>迁入：${up}家<br/>迁出：${down}家`
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    left: 165,
                    top: 28,
                    icon: 'roundRect',
                    textStyle: { color: 'white' },
                    data: [{ name: '迁入' }, { name: '迁出' }]
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        color: 'white',
                        formatter: '{value}'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgb(104,135,178)'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'white',
                        formatter: value => Math.abs(value)
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgb(104,135,178)'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '迁入',
                        type: 'bar',
                        data: inLog,
                        barWidth: 10,
                        itemStyle: {
                            color: 'rgb(255,124,41)'
                        },
                        stack: 'month'
                    },
                    {
                        name: '迁出',
                        type: 'bar',
                        data: outLog,
                        barWidth: 10,
                        itemStyle: {
                            color: 'rgb(0,215,143)'
                        },
                        stack: 'month'
                    }
                ]
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
                        in: {
                            width: 16,
                            height: 17,
                            backgroundColor: {
                                image: require('@/assets/img/in.png')
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
                        out: {
                            width: 16,
                            height: 17,
                            backgroundColor: {
                                image: require('@/assets/img/out.png')
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
        }
    }
})
</script>

<style></style>
