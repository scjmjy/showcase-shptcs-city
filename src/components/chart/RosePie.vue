<template>
    <div></div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import echarts from 'echarts'

export default Vue.extend({
    name: 'RosePie',
    props: {
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 235
        },
        title: {
            type: String,
            default: '我的标题'
        },
        data: {
            type: Array as PropType<number[]>,
            default: () => []
        },
        delay: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            barChart: undefined as echarts.ECharts | undefined
        }
    },
    created() {
        console.log('RosePie created')
    },
    mounted() {
        console.log('RosePie mounted')
        this.initChart()
    },
    beforeDestroy() {
        console.log('RosePie beforeDestroy')
        const chart = this.barChart
        if (chart) {
            if (this.delay === 0) {
                chart.dispose()
                this.barChart = undefined
            } else {
                setTimeout(() => {
                    chart.dispose()
                    this.barChart = undefined
                }, this.delay)
            }
        }
    },
    methods: {
        initChart() {
            this.barChart = echarts.init(this.$el as HTMLDivElement)
            const { title, data } = this

            const option: echarts.EChartOption = {
                color: [
                    'rgb(253,209,0)',
                    'rgb(199,255,65)',
                    'rgb(255,121,48)',
                    'rgb(255,72,116)',
                    'rgb(230,65,255)',
                    'rgb(128,92,254)',
                    'rgb(51,181,255)',
                    'rgb(63,236,253)',
                    'rgb(0,217,139)',
                    'rgb(38,67,255)'
                ],
                title: {
                    text: title,
                    left: 'left',
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgb(0,121,202)'
                },
                grid: {
                    containLabel: true,
                    top: 10,
                    left: -40,
                    right: -40,
                    bottom: 0
                },
                series: [
                    {
                        type: 'pie',
                        name: 'RosePie',
                        radius: [10, 75],
                        center: ['50%', '60%'],
                        roseType: 'radius',
                        data,
                        label: {
                            show: true,
                            color: 'rgb(0, 247, 255)',
                            alignTo: 'labelLine',
                            padding: [-15, -70, 0, -70],
                            bleedMargin: -30
                        },
                        labelLine: {
                            length2: 70
                        }
                    }
                ]
            }
            this.barChart.setOption(option)
        }
    },
    watch: {
        data(newData) {
            const opt: echarts.EChartOption = {
                series: [
                    {
                        name: 'RosePie',
                        data: newData
                    }
                ]
            }
            if (this.barChart) {
                this.barChart.setOption(opt)
            }
        }
    }
})
</script>
