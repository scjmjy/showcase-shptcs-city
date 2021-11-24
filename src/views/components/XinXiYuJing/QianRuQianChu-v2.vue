<template>
    <div class="u-rela">
        <div ref="barChart" style="display: inline-block;" :style="{ width: barWidth + 'px', height: barHeight + 'px' }"></div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import echarts from 'echarts'

export default Vue.extend({
    props: {
        barWidth: {
            type: Number,
            default: 350,
        },
        barHeight: {
            type: Number,
            default: 225,
        },
    },
    computed: {
        ...mapState({
            qianRuQianChu: state => state.qianRuQianChu,
        }),
        barChartOption() {
            if (!this.qianRuQianChu) {
                return {}
            }
            const { inLog, outLog } = this.qianRuQianChu
            const opt = {
                grid: {
                    top: 65,
                    bottom: 40,
                },
                title: {
                    text: '{icon|}{v|企业迁入迁出统计}',
                    left: 5,
                    top: 20,
                    textStyle: {
                        rich: {
                            icon: {
                                width: 20,
                                height: 20,
                                backgroundColor: {
                                    image: require('@/assets/img/统计.png'),
                                },
                            },
                            v: {
                                color: 'rgb(0,184,248)',
                                fontWeight: 'bolder',
                                fontSize: 14,
                                padding: [0, 0, 0, 3],
                            },
                        },
                    },
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
                        type: 'shadow',
                    },
                },
                legend: {
                    left: 165,
                    top: 23,
                    icon: 'roundRect',
                    textStyle: { color: 'white' },
                    data: [{ name: '迁入' }, { name: '迁出' }],
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        color: 'white',
                        formatter: '{value}',
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgb(104,135,178)',
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'white',
                        formatter: value => Math.abs(value),
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgb(104,135,178)',
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: '迁入',
                        type: 'bar',
                        data: inLog,
                        barWidth: 10,
                        itemStyle: {
                            color: 'rgb(255,124,41)',
                        },
                        stack: 'month',
                    },
                    {
                        name: '迁出',
                        type: 'bar',
                        data: outLog,
                        barWidth: 10,
                        itemStyle: {
                            color: 'rgb(0,215,143)',
                        },
                        stack: 'month',
                    },
                ],
            }

            return opt
        },
    },
    data() {
        return {
            barChart: null,
            dur: 3000,
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (this.barChart) {
            this.barChart.dispose()
            this.barChart = null
        }
    },
    watch: {
        barChartOption(opt) {
            if (this.barChart) {
                this.barChart.setOption(opt)
            }
        },
    },
    methods: {
        initChart() {
            this.barChart = echarts.init(this.$refs.barChart)
        },
    },
})
</script>

<style></style>
