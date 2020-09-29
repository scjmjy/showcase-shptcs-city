<template>
    <card :opts="cardOpts">
        <div ref="chartContainer" :style="{ width: width + 'px', height: height + 'px' }"></div>
    </card>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
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
            zhongDianShuiShouTop5: state => state.zhongDianShuiShouTop5
        }),
        cardOpts() {
            return {
                title: '重点企业税收Top5'
            }
        },
        chartOption() {
            const yData = []
            const data = []
            let max = 0
            for (let index = 0; index < this.zhongDianShuiShouTop5.length; index++) {
                const yi = this.zhongDianShuiShouTop5[index]
                data.push({
                    value: yi.value,
                    itemStyle: {
                        color: barColors[index % barColors.length]
                    }
                })
                yData.push(yi.name)
                max = Math.max(max, yi.value)
            }
            const opt = {
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}<br />{c}万元',
                    backgroundColor: 'rgb(0,121,202)'
                },
                polar: {},
                angleAxis: {
                    type: 'value',
                    max: (max * 4) / 3, // 让极坐标的左上角1/4空出来
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
                barWidth: 15,
                series: {
                    type: 'bar',
                    coordinateSystem: 'polar',
                    data,
                    label: {
                        show: true,
                        formatter: '{c}亿',
                        color: '#003c8e',
                        align: 'left'
                    },
                    animationDuration: this.dur
                }
            }
            return opt
        }
    },
    data() {
        return {
            chart: null,
            dur: 3000
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
            this.chart = null
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
            this.chart = echarts.init(this.$refs.chartContainer)
        }
    }
})
</script>

<style></style>
