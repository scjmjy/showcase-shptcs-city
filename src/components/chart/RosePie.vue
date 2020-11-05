<template>
    <div class="u-wh-100" style="position: relative;">
        <div ref="chart" class="u-wh-100"></div>
        <div v-if="data.length === 0" class="placehoder">暂无数据</div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import echarts from 'echarts'

export default Vue.extend({
    name: 'RosePie',
    props: {
        title: {
            type: String,
            default: '我的标题'
        },
        data: {
            type: Array as PropType<number[]>,
            default: () => []
        },
        delay: {
            // 如果需要动画结束之后才销毁此 chart，那么可以传入一个大于 0 的毫秒延时， -1 代表立即销毁
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            roseChart: undefined as echarts.ECharts | undefined
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
        const chart = this.roseChart
        if (chart) {
            if (this.delay === -1) {
                chart.dispose()
                this.roseChart = undefined
            } else {
                setTimeout(() => {
                    chart.dispose()
                    this.roseChart = undefined
                }, this.delay)
            }
        }
    },
    methods: {
        initChart() {
            this.roseChart = echarts.init(this.$refs.chart as HTMLDivElement)
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
                        color: 'white',
                        fontSize: 20
                        // textShadowColor: 'white',
                        // textShadowBlur: 5
                    }
                },
                tooltip: {
                    backgroundColor: 'rgb(0,121,202)'
                },
                series: [
                    {
                        type: 'pie',
                        name: title,
                        radius: [10, '60%'],
                        center: ['50%', '60%'],
                        roseType: 'radius',
                        data,
                        label: {
                            show: true,
                            color: 'rgb(0, 247, 255)',
                            alignTo: 'labelLine',
                            padding: [-15, -70, 0, -70],
                            bleedMargin: -100
                        },
                        labelLine: {
                            length: 5,
                            length2: 70
                        }
                    }
                ]
            }
            this.roseChart.setOption(option)
        }
    },
    watch: {
        data(newData) {
            const opt: echarts.EChartOption = {
                series: [
                    {
                        name: this.title,
                        data: newData
                    }
                ]
            }
            if (this.roseChart) {
                this.roseChart.setOption(opt)
            }
        }
    }
})
</script>

<style lang="scss">
.placehoder {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
    color: white;
    font-size: 25px;
}
</style>