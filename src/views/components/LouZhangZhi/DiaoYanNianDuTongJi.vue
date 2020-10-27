<template>
    <div class="u-wh-100">
        <div ref="barChart" class="u-wh-100" style="display: inline-block;"></div>
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
            default: 200
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
            grid: {
                containLabel: true,
                left: 0,
                right: 10,
                top: 45,
                bottom: 0
            },
            title: {
                text: '大调研年度数据可视化统计',
                textStyle: {
                    color: 'white',
                    fontSize: 20,
                    textShadowColor: 'white',
                    textShadowBlur: 5
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgb(0,121,202)',
                formatter: (params: any) => {
                    const weiChuLi = params[0].value
                    const yiChuLi = params[1].value
                    const zongShu = params[2].value
                    return `未处理：${weiChuLi}个<br/>已处理：${yiChuLi}个<br/>总数：${zongShu}个`
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                left: 263,
                top: 3,
                icon: 'roundRect',
                textStyle: { color: '#7698E6', fontSize: 12 },
                data: [{ name: '未处理' }, { name: '已处理' }]
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'white',
                    // formatter: '{value}月'
                    formatter: (value) => {
                        // return value + '月'
                        return value == 12 ? '12月' : String(value)
                    }
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
                    barWidth: 14,
                    itemStyle: {
                        color: '#34B6FF'
                    },
                    stack: 'month'
                },
                {
                    name: '已处理',
                    type: 'bar',
                    data: yiChuLi,
                    barWidth: 14,
                    itemStyle: {
                        color: '#FDB246'
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
