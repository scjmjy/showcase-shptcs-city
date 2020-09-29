<template>
    <div>
        <div ref="gaugeChart" style="display: inline-block;" :style="{ width: gaugeWidth + 'px', height: gaugeHeight + 'px' }"></div>
        <div ref="barChart" style="display: inline-block;" :style="{ width: barWidth + 'px', height: barHeight + 'px' }"></div>
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
        barWidth: {
            type: Number,
            default: 325
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
                    textStyle: {
                        color: 'white'
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
                                return `{up|}${value}%`
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
                                return `{up|}${value}%`
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
                title: {
                    text: '{icon|}近180天迁入迁出统计',
                    top: 4,
                    textStyle: {
                        color: 'rgb(0,184,248)',
                        fontSize: 14,
                        rich: {
                            icon: {
                                width: 20,
                                height: 20,
                                backgroundColor: {
                                    image: require('@/assets/img/alarm_bell.png')
                                }
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
                        return `${month}月<br/>迁入：${up}家<br/>迁出：${down}家`
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    left: 165,
                    top: 6,
                    icon: 'roundRect',
                    textStyle: { color: 'white' },
                    data: [{ name: '迁入' }, { name: '迁出' }]
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        color: 'white',
                        formatter: '{value}月'
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
                    center: ['25%', '50%'],
                    radius: '45%'
                },
                title: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    offsetCenter: [0, '90%'],
                    borderRadius: 50,
                    backgroundColor: '#009bf8',
                    width: 65,
                    fontSize: 20,
                    barHeight: 23,
                    color: '#eee',
                    rich: {}
                },
                detail: {
                    offsetCenter: [0, '5%'],
                    fontWeight: 'bolder',
                    fontSize: 20,
                    width: 65,
                    color: 'rgb(255,76,53)',
                    rich: {
                        up: {
                            width: 20,
                            height: 30,
                            backgroundColor: {
                                image: require('@/assets//img/arrow_up.png')
                            }
                        }
                    }
                }
            },
            gaugeDownOpts: {
                common: {
                    center: ['75%', '50%'],
                    radius: '45%'
                },
                title: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    offsetCenter: [0, '90%'],
                    borderRadius: 50,
                    backgroundColor: '#009bf8',
                    width: 65,
                    fontSize: 20,
                    barHeight: 23,
                    color: '#eee',
                    rich: {}
                },
                detail: {
                    offsetCenter: [0, '5%'],
                    fontWeight: 'bolder',
                    fontSize: 20,
                    width: 65,
                    color: 'rgb(0,255,120)',
                    rich: {
                        up: {
                            width: 20,
                            height: 30,
                            backgroundColor: {
                                image: require('@/assets//img/arrow_down.png')
                            }
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
