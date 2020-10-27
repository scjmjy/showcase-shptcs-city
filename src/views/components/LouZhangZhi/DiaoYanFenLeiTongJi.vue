<template>
    <div style="position: relative;">
        <div ref="chart" class="u-wh-100"></div>
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
import echarts from 'echarts'
import { State } from '@/store/state'

export default Vue.extend({
    data() {
        return {
            barChart: undefined as echarts.ECharts | undefined,
            period: 'week',
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
        chartOption(): echarts.EChartOption {
            if (!this.diaoYanFenLeiTongJi) {
                return {}
            }
            const { week, year } = this.diaoYanFenLeiTongJi
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
                    radius: [10, 75],
                    center: ['50%', '65%'],
                    roseType: 'radius',
                    datasetIndex: 0,
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

                series = [
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 },
                    { type: 'bar', barWidth: 15, stack: 'week', datasetIndex: 1 }
                ]
            }
            const option: echarts.EChartOption = {
                color,
                title: {
                    text: title,
                    left: 'left',
                    textStyle: {
                        color: 'white',
                        fontSize: 20,
                        textShadowColor: 'white',
                        textShadowBlur: 5
                    }
                },
                tooltip,
                dataset: [{ source: year }, { source: week }],
                grid: {
                    containLabel: true,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                xAxis,
                yAxis,
                series
            }
            return option
        }
    },
    mounted() {
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
.radio-group {
    position: absolute;
    left: 175px;
    top: 20px;
}
.radio-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 2px 15px;
    cursor: pointer !important;
}
.radio-item.active {
    border: 1px solid rgb(47, 96, 154);
    border-radius: 4px;
    box-shadow: inset 5px -5px 10px rgb(47, 96, 154), inset -5px 5px 10px rgb(47, 96, 154);
}
.radio-group .radio-item:first-of-type {
    margin-right: 10px;
}
.radio {
    cursor: pointer !important;
    appearance: none;
    outline: none;
    border-radius: 50%;
    border: 1px solid rgb(47, 96, 154);
    width: 16px;
    height: 16px;
    margin: 0px 3px 0px 0px;
    background-color: transparent;
    transition: all 0.5s linear;
}
.radio:checked {
    background-color: rgb(196, 75, 28);
    border: 4px solid rgb(214, 195, 67);
}
.label {
    font-size: 14px;
    color: white;
    cursor: pointer !important;
}
</style>
