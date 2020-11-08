<template>
    <div style="position: relative;">
        <div ref="chart" class="u-wh-100"></div>
        <div v-if="isShowPlaceholder" class="placehoder">暂无数据</div>
        <div class="radio-group">
            <div class="radio-item" :class="{ active: period === 'year' }">
                <input v-model="period" id="radio-year" class="radio" type="radio" name="period" value="year" />
                <label for="radio-year" class="label">年度</label>
            </div>
            <div class="radio-item" :class="{ active: period === 'week' }">
                <input v-model="period" id="radio-week" class="radio" type="radio" name="period" value="week" />
                <label for="radio-week" class="label">星期</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Interval, { IntervalTask } from '@/components/Interval.vue'
import echarts from 'echarts'
import { State } from '@/store/state'

export default Vue.extend({
    name: 'DiaoYanFenLeiTongJi',
    mixins: [Interval],
    data() {
        return {
            intervalTask: undefined as IntervalTask | undefined,
            barChart: undefined as echarts.ECharts | undefined,
            period: 'week' as 'year' | 'week',
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
            ]
        }
    },
    computed: {
        ...mapState({
            diaoYanFenLeiTongJi: state => (state as State).diaoYanFenLeiTongJi
        }),
        isShowPlaceholder(): boolean {
            const { week, year } = this.diaoYanFenLeiTongJi
            if (this.period === 'year') {
                return year.length === 0
            } else {
                return week.length === 0
            }
        },
        chartOption(): echarts.EChartOption {
            if (!this.diaoYanFenLeiTongJi) {
                return {}
            }
            const { week, year } = this.diaoYanFenLeiTongJi
            // const yearTop8 = year.sort((a, b) => b.value - a.value).slice(0, 8)
            const yearTop8 = year
            const { color } = this
            const title = '调研分类统计'
            let xAxis
            let yAxis
            let tooltip
            let series
            if (this.period === 'year') {
                tooltip = {
                    backgroundColor: 'rgb(0,121,202)'
                }
                series = {
                    type: 'pie',
                    name: title,
                    radius: [10, '50%'],
                    center: ['60%', '65%'],
                    roseType: 'radius',
                    datasetIndex: 0,
                    label: {
                        show: true,
                        color: 'rgb(0, 247, 255)',
                        alignTo: 'labelLine',
                        padding: [-15, -70, 0, -70],
                        bleedMargin: -120
                    },
                    labelLine: {
                        length: 10,
                        length2: 70
                    }
                }
            } else {
                xAxis = {
                    type: 'category',
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
                }

                yAxis = {
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
                }
                tooltip = {
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
                                    const value = (series.value as number[])[series.seriesIndex + 1]
                                    tip += `${series.seriesName}：${value}<br/>`
                                }
                            })
                            return tip
                        } else {
                            return ''
                        }
                    },
                    backgroundColor: 'rgb(0,121,202)'
                }
                series = []
                if (week.length > 0) {
                    const len = week[0].length - 1
                    for (let index = 0; index < len; index++) {
                        series.push({ type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 })
                    }
                }
            }
            const option: echarts.EChartOption = {
                color,
                title: {
                    text: title,
                    left: 30,
                    textStyle: {
                        color: 'white',
                        fontSize: 20
                        // textShadowColor: 'white',
                        // textShadowBlur: 5
                    }
                },
                tooltip,
                dataset: [{ source: yearTop8 }, { source: week }],
                grid: {
                    containLabel: true,
                    left: 30,
                    right: 10,
                    bottom: 16
                },
                xAxis,
                yAxis,
                series
            }
            return option
        }
    },
    mounted() {
        this.intervalTask = this.newInterval(
            () => {
                this.$store.dispatch('requestCategoryResearch')
            },
            1000 * 60,
            true
        )
        this.initChart()
    },
    beforeDestroy() {
        if (this.barChart) {
            this.barChart.dispose()
            this.barChart = undefined
        }
    },
    methods: {
        initChart() {
            this.barChart = echarts.init(this.$refs.chart as HTMLDivElement)
        }
    },
    watch: {
        chartOption(opt) {
            if (this.barChart) {
                this.barChart.setOption(opt, true)
            }
        }
    }
})
</script>

<style scoped>
</style>
