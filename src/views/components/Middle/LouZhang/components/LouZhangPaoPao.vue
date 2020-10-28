<template>
    <div class="pao-pao-container" :style="containerStyle">
        <div class="left-side">
            <div class="louzhang-name">{{ '楼长：' + data.name }}</div>
            <div class="louzhang-data">
                <div>{{ '负责企业数：' + data.qiYeShu }}</div>
                <div>{{ '负责楼宇数：' + data.louYuShu }}</div>
                <div>{{ '税收60万以上企业数：' + data.qiYeShu60 }}</div>
                <div>{{ '走访次数：' + data.zouFangShu }}</div>
                <div>{{ '未解决问题数：' + data.weiJieJue }}</div>
            </div>
        </div>
        <div class="right-side">
            <div ref="chart" class="u-wh-100"></div>
            <div class="man-yi">{{ data.manYiDu }}%</div>
            <div class="wan-cheng-lv">{{ data.wanChengLv }}%</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { LouZhang } from '@/store/state'
import FlashPoint from '@/components/FlashPoint.vue'
import echarts from 'echarts'
/**
 * 楼长泡泡对话框组件
 */
export default Vue.extend({
    name: 'LouZhangPaoPao',
    props: {
        type: {
            type: String,
            default: '' // br / bl ...
        },
        data: {
            type: Object as PropType<LouZhang>,
            default: () => new LouZhang()
        }
    },
    data() {
        const { manYiDu, wanChengLv } = this.data
        const buManYiDu = 100 - manYiDu
        const weiWanChengLv = 100 - wanChengLv

        return {
            chart: undefined as echarts.ECharts | undefined,
            chartOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}%',
                    backgroundColor: 'rgb(0,121,202)'
                },
                legend: {
                    data: ['满意', '完成率'],
                    left: 'center',
                    top: 5,
                    itemWidth: 10,
                    itemHeight: 6,
                    itemGap: 10,
                    padding: 0,
                    textStyle: {
                        fontSize: 10,
                        color: '#07739A'
                    }
                },
                series: [
                    {
                        name: '楼长评估',
                        type: 'pie',
                        radius: ['75%', '90%'],
                        center: ['50%', '60%'],
                        avoidLabelOverlap: false,
                        startAngle: 0,
                        label: {
                            show: false,
                            position: 'inside'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        data: [
                            { value: weiWanChengLv, name: '未完成率', itemStyle: { color: 'red' } },
                            { value: wanChengLv, name: '完成率', itemStyle: { color: '#00D98B' } },
                            { value: manYiDu, name: '满意', itemStyle: { color: '#FE693B' } },
                            { value: buManYiDu, name: '不满意度', itemStyle: { color: 'red' } }
                        ]
                    }
                ]
            } as echarts.EChartOption
        }
    },
    computed: {
        containerStyle() {
            const { type } = this
            let padding, background, width, height
            switch (type) {
                case 'bl':
                    width = '280px'
                    height = '155px'
                    padding = '15px 14px 25px 14px'
                    background = 'paopao-bl.png'
                    break
                case 'br':
                    width = '280px'
                    height = '155px'
                    padding = '15px 14px 25px 14px'
                    background = 'paopao-br.png'
                    break
                case 'tl':
                    width = '280px'
                    height = '155px'
                    padding = '25px 14px 15px 14px'
                    background = 'paopao-tl.png'
                    break
                case 'tr':
                    width = '280px'
                    height = '155px'
                    padding = '25px 14px 15px 14px'
                    background = 'paopao-tr.png'
                    break
                case 'lt':
                    width = '296px'
                    height = '147px'
                    padding = '15px 14px 15px 24px'
                    background = 'paopao-lt.png'
                    break
                case 'lb':
                    width = '296px'
                    height = '147px'
                    padding = '15px 14px 15px 24px'
                    background = 'paopao-lb.png'
                    break
                case 'rt':
                    width = '296px'
                    height = '147px'
                    padding = '15px 24px 15px 14px'
                    background = 'paopao-rt.png'
                    break
                case 'rb':
                    width = '296px'
                    height = '147px'
                    padding = '15px 24px 15px 14px'
                    background = 'paopao-rb.png'
                    break
                default:
                    throw new Error('无效的 type：' + type)
            }
            const url = require('../../../../../assets/img/' + background)
            return {
                width,
                height,
                padding,
                background: `url(${url})`
            }
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
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.chart as HTMLDivElement)
            this.chart.setOption(this.chartOption)
        }
    },
    watch: {
        chartOption: {
            handler(val) {
                if (this.chart) {
                    this.chart.setOption(val)
                }
            },
            deep: true
        }
    }
})
</script>

<style lang="scss" scoped>
.pao-pao-container {
    cursor: pointer;
    transition: all 0.3s;

    .left-side,
    .right-side {
        display: inline-block;
        height: 100%;
        vertical-align: top;
    }
    .left-side {
        width: 60%;

        .louzhang-name {
            font-size: 16px;
            font-weight: bold;
            color: white;
            text-shadow: 0 0 5px white;
        }

        .louzhang-data {
            font-size: 11px;
            color: #00f6ff;

            & > div {
                margin-top: 2px;
            }
        }
    }
    .right-side {
        width: 40%;
        position: relative;

        .man-yi {
            position: absolute;
            text-align: center;
            left: 23px;
            top: 44px;
            width: 55px;
            padding-bottom: 8px;
            border-bottom: 1px solid #024676;
            font-size: 15px;
            color: #fe693b;
        }
        .wan-cheng-lv {
            position: absolute;
            text-align: center;
            left: 23px;
            top: 75px;
            width: 55px;
            font-size: 15px;
            color: #00d98b;
        }
    }

    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(1.1) translate(2px, 2px);
    }
}
</style>