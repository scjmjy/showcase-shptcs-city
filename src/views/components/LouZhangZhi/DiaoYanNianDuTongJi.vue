<template>
    <div>
        <div ref="barChart" style="display: inline-block;" :style="{ width: barWidth + 'px', height: barHeight + 'px' }"></div>
    </div>
</template>

<script lang="ts">
import echarts from 'echarts'
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import State, { DiaoYanNianDuTongJi } from '@/store/state'
@Component<DiaoYanNianDuTongJiCom>({
    props: {
        barWidth: {
            type: Number,
            default: 560
        },
        barHeight: {
            type: Number,
            default: 230
        }
    },
    computed: {
        ...mapState<State>({
            diaoYanNianDuTongJi: (state: State) => state.diaoYanNianDuTongJi
        })
    },
    watch: {
        chartOption(opt) {
            if (this.barChart) {
                this.barChart.setOption(opt)
            }
        }
    }
})
export default class DiaoYanNianDuTongJiCom extends Vue {
    diaoYanNianDuTongJi!: DiaoYanNianDuTongJi
    barChart: echarts.ECharts | null = null
    dur = 3000
    mounted() {
        this.initChart()
    }
    beforeDestroy() {
        if (this.barChart) {
            this.barChart.dispose()
        }
    }
    get chartOption() {
        if (!this.diaoYanNianDuTongJi) {
            return {}
        }
        const { months, weiChuLi, yiChuLi } = this.diaoYanNianDuTongJi
        const zongShu: number[] = []
        for (let index = 0; index < weiChuLi.length; index++) {
            zongShu.push(weiChuLi[index] + yiChuLi[index])
        }
        const opt = {
            title: {
                text: '大调研年度数据可视化统计',
                textStyle: {
                    color: 'white',
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgb(0,121,202)',
                formatter: (params: any) => {
                    const weiChuLi = params[0].value
                    const yiChuLi = params[1].value
                    const zongShu = params[2].value
                    return `未处理：${weiChuLi}<br/>已处理：${yiChuLi}<br/>总数：${zongShu}`
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                left: 185,
                top: 6,
                icon: 'roundRect',
                textStyle: { color: 'white' },
                data: [{ name: '未处理' }, { name: '已处理' }]
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
                },
                data: months
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'white'
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
                    name: '未处理',
                    type: 'bar',
                    data: weiChuLi,
                    barWidth: 20,
                    itemStyle: {
                        color: 'rgb(51,181,255)'
                    },
                    stack: 'month'
                },
                {
                    name: '已处理',
                    type: 'bar',
                    data: yiChuLi,
                    barWidth: 20,
                    itemStyle: {
                        color: 'rgb(254,177,71)'
                    },
                    stack: 'month'
                },
                {
                    name: '总数',
                    type: 'line',
                    data: zongShu,
                    itemStyle: {
                        color: 'rgb(0,215,143)'
                    },
                    symbol: 'circle',
                    symbolSize: 6
                }
            ]
        }

        return opt
    }
    initChart() {
        this.barChart = echarts.init(this.$refs.barChart as HTMLDivElement)
    }
}
</script>

<style></style>
