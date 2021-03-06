<template>
    <card :opts="cardOpts" @click="onTitleClick">
        <div ref="chartContainer" :style="{ width: width + 'px', height: height + 'px' }"></div>
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { State, ZhongDianShuiShouTop10 } from '@/store/state'
import echarts from 'echarts'
import Card from '@/components/Card.vue'

const barColors = ['#007af9', '#009bfa', '#00bdfc', '#00d4fc', '#00FFFF']

export default Vue.extend({
    components: { Card },
    props: {
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 300
        }
    },
    computed: {
        ...mapState({
            ZhongDianShuiShouTop10: state => (state as State).ZhongDianShuiShouTop10
        }),
        top5(): ZhongDianShuiShouTop10[] {
            const top5 = this.ZhongDianShuiShouTop10.map(qiye => {
                return {
                    ...qiye,
                    name: qiye.name.replace(/有限公司$/g, ''),
                }
            })
            return top5.sort((a, b) => a.value - b.value)
        },
        cardOpts(): any {
            return {
                title: '重点企业税收Top5',
                clickable: true
            }
        },
        chartOption(): echarts.EChartOption {
            const yData: string[] = []
            const data: any[] = []
            let max = 0
            for (let index = 0; index < this.top5.length; index++) {
                const yi = this.top5[index]
                data.push({
                    value: yi.value,
                    itemStyle: {
                        color: barColors[index % barColors.length]
                    }
                })
                yData.push(yi.name)
                max = Math.max(max, yi.value)
            }
            const opt: echarts.EChartOption = {
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}<br />{c}亿元',
                    backgroundColor: 'rgb(0,121,202)'
                },
                polar: {},
                angleAxis: {
                    type: 'value',
                    max: (max * 4) / 3, // 让极坐标的左上角1/4空出来
                    axisLabel: {
                        color: 'white',
                        formatter(value) {
                            if (value > max) {
                                return ''
                            }
                            return value + '亿'
                        }
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
                radiusAxis: {
                    type: 'category',
                    data: yData,
                    axisLine: {
                        lineStyle: {
                            color: '#0a3053'
                        }
                    },
                    axisLabel: {
                        color: 'white',
                        interval: 0
                    }
                },
                series: [{
                    type: 'bar',
                    coordinateSystem: 'polar',
                    barWidth: 15,
                    data,
                    animationDuration: this.dur
                }]
            }
            return opt
        }
    },
    data() {
        return {
            chart: undefined as echarts.ECharts | undefined,
            dur: 3000
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
            this.chart = undefined
        }
    },
    watch: {
        chartOption(opt) {
            if (this.chart) {
                this.chart.setOption(opt)
            }
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.chartContainer as HTMLDivElement)
        },
        onTitleClick() {
            this.$root.$emit('map-shuishoutop10')
        }
    }
})
</script>

<style></style>
