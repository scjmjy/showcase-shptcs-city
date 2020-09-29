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
            yiYuanLouYu: state => state.yiYuanLouYu
        }),
        cardOpts() {
            return {
                title: '亿元楼宇一览'
            }
        },
        chartOption() {
            const yData = []
            const data = []
            for (let index = 0; index < this.yiYuanLouYu.length; index++) {
                const yi = this.yiYuanLouYu[index]
                data.push({
                    value: yi.value,
                    itemStyle: {
                        color: barColors[index % barColors.length]
                    }
                })
                yData.push(yi.name)
            }
            const opt = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b}<br />{c}亿',
                    backgroundColor: 'rgb(0,121,202)'
                },
                grid: {
                    top: 20,
                    left: 20,
                    right: 20,
                    bottom: 20,
                    containLabel: true
                },
                xAxis: {
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
                },
                yAxis: {
                    type: 'category',
                    data: yData,
                    axisLine: {
                        lineStyle: {
                            color: '#0a3053'
                        }
                    },
                    axisLabel: {
                        color: 'white'
                    }
                },
                barWidth: 15,
                series: {
                    type: 'bar',
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
