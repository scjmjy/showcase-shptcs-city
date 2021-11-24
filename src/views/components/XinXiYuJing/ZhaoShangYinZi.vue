<template>
    <div class="u-rela">
        <div class="title">招商引资完成情况</div>
        <div class="u-flex">
            <div ref="leftChart" class="chart" style="display: inline-block;" :style="{ width: leftWidth + 'px', height: leftHeight + 'px' }"></div>
            <div ref="rightChart" class="chart" style="display: inline-block;" :style="{ width: rightWidth + 'px', height: rightHeight + 'px' }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import echarts from 'echarts'
import { State, ZhaoShangYinZi } from '@/store/state'
import img1 from '@/assets/img/pattern-1.png'
import img2 from '@/assets/img/pattern-2.png'
import img3 from '@/assets/img/pattern-3.png'

const patternImg1 = new Image()
patternImg1.src = img1
const patternImg2 = new Image()
patternImg2.src = img2
const patternImg3 = new Image()
patternImg3.src = img3

export default Vue.extend({
    props: {
        leftWidth: {
            type: Number,
            default: 125,
        },
        leftHeight: {
            type: Number,
            default: 225,
        },
        rightWidth: {
            type: Number,
            default: 210,
        },
        rightHeight: {
            type: Number,
            default: 225,
        },
    },
    computed: {
        ...mapState({
            zhaoShangYinZi: (state: State) => state.zhaoShangYinZi,
        }),
        leftChartOptsDynamic(): echarts.EChartOption {
            const { complete } = this.zhaoShangYinZi as ZhaoShangYinZi
            const opt = {
                title: {
                    text: '{a|' + complete + '}{c|%}',
                },
                series: [
                    {
                        name: 'complete',
                        data: [
                            {
                                value: complete,
                                name: 'complete',
                                itemStyle: {
                                    normal: {
                                        color: {
                                            // 完成的圆环的颜色
                                            colorStops: [
                                                {
                                                    offset: 0,
                                                    color: '#4FADFD', // 0% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#28E8FA', // 100% 处的颜色
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                            {
                                value: 100 - complete,
                                name: 'uncomplete',
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#173164',
                                    },
                                },
                            },
                        ],
                    },
                ],
            }
            return opt
        },
        rightChartOptsDynamic(): echarts.EChartOption {
            const { projectYiYuan, projectQianWanYuan, projectPuTong } = this.zhaoShangYinZi as ZhaoShangYinZi
            return {
                series: [
                    {
                        name: 'ZhaoShang',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {
                                value: projectPuTong,
                                name: `普通项目${projectPuTong}个`,
                                itemStyle: {
                                    color: {
                                        image: patternImg1,
                                        repeat: 'repeat',
                                    },
                                },
                            },
                            {
                                value: projectQianWanYuan,
                                name: `千万元项目${projectQianWanYuan}个`,
                                itemStyle: {
                                    color: {
                                        image: patternImg1,
                                        repeat: 'repeat',
                                    },
                                },
                            },
                            {
                                value: projectYiYuan,
                                name: `亿元项目${projectYiYuan}个`,
                                itemStyle: {
                                    color: {
                                        image: patternImg3,
                                        repeat: 'repeat',
                                    },
                                },
                            },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            }
        },
    },
    data() {
        function getCirlPoint(x0, y0, r, angle) {
            const x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
            const y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
            return {
                x: x1,
                y: y1,
            }
        }
        let angle = 0
        const interval = setInterval(() => {
            if (this.leftChart) {
                angle += 3
                this.leftChart.setOption(this.leftChartOptsDynamic)
            }
        }, 100)
        return {
            leftChart: undefined as undefined | echarts.ECharts,
            rightChart: undefined as undefined | echarts.ECharts,
            dur: 3000,
            interval,
            leftChartOpts: {
                title: {
                    text: '{a|' + 0.0 + '}{c|%}',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 24,
                                color: '#29EEF3',
                            },

                            c: {
                                fontSize: 16,
                                color: '#ffffff',
                                // padding: [5,0]
                            },
                        },
                    },
                    itemGap: 35,
                    subtext: '税收完成百分比',
                    subtextStyle: {
                        color: '#DBDCD9',
                    },
                },
                series: [
                    {
                        name: 'ring5',
                        type: 'custom',
                        coordinateSystem: 'none',
                        renderItem: function(params, api) {
                            return {
                                type: 'arc',
                                shape: {
                                    cx: api.getWidth() / 2,
                                    cy: api.getHeight() / 2,
                                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                                    startAngle: ((0 + angle) * Math.PI) / 180,
                                    endAngle: ((90 + angle) * Math.PI) / 180,
                                },
                                style: {
                                    stroke: '#0CD3DB',
                                    fill: 'transparent',
                                    lineWidth: 1.5,
                                },
                                silent: true,
                            }
                        },
                        data: [0],
                    },
                    {
                        name: 'ring5',
                        type: 'custom',
                        coordinateSystem: 'none',
                        renderItem: function(params, api) {
                            return {
                                type: 'arc',
                                shape: {
                                    cx: api.getWidth() / 2,
                                    cy: api.getHeight() / 2,
                                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                                    startAngle: ((180 + angle) * Math.PI) / 180,
                                    endAngle: ((270 + angle) * Math.PI) / 180,
                                },
                                style: {
                                    stroke: '#0CD3DB',
                                    fill: 'transparent',
                                    lineWidth: 1.5,
                                },
                                silent: true,
                            }
                        },
                        data: [0],
                    },
                    {
                        name: 'ring5',
                        type: 'custom',
                        coordinateSystem: 'none',
                        renderItem: function(params, api) {
                            return {
                                type: 'arc',
                                shape: {
                                    cx: api.getWidth() / 2,
                                    cy: api.getHeight() / 2,
                                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                                    startAngle: ((270 + -angle) * Math.PI) / 180,
                                    endAngle: ((40 + -angle) * Math.PI) / 180,
                                },
                                style: {
                                    stroke: '#0CD3DB',
                                    fill: 'transparent',
                                    lineWidth: 1.5,
                                },
                                silent: true,
                            }
                        },
                        data: [0],
                    },
                    {
                        name: 'ring5',
                        type: 'custom',
                        coordinateSystem: 'none',
                        renderItem: function(params, api) {
                            return {
                                type: 'arc',
                                shape: {
                                    cx: api.getWidth() / 2,
                                    cy: api.getHeight() / 2,
                                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                                    startAngle: ((90 + -angle) * Math.PI) / 180,
                                    endAngle: ((220 + -angle) * Math.PI) / 180,
                                },
                                style: {
                                    stroke: '#0CD3DB',
                                    fill: 'transparent',
                                    lineWidth: 1.5,
                                },
                                silent: true,
                            }
                        },
                        data: [0],
                    },
                    {
                        name: 'ring5',
                        type: 'custom',
                        coordinateSystem: 'none',
                        renderItem: function(params, api) {
                            const x0 = api.getWidth() / 2
                            const y0 = api.getHeight() / 2
                            const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
                            const point = getCirlPoint(x0, y0, r, 90 + -angle)
                            return {
                                type: 'circle',
                                shape: {
                                    cx: point.x,
                                    cy: point.y,
                                    r: 2,
                                },
                                style: {
                                    stroke: '#0CD3DB', //粉
                                    fill: '#0CD3DB',
                                },
                                silent: true,
                            }
                        },
                        data: [0],
                    },
                    {
                        name: 'ring5', //绿点
                        type: 'custom',
                        coordinateSystem: 'none',
                        renderItem: function(params, api) {
                            const x0 = api.getWidth() / 2
                            const y0 = api.getHeight() / 2
                            const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
                            const point = getCirlPoint(x0, y0, r, 270 + -angle)
                            return {
                                type: 'circle',
                                shape: {
                                    cx: point.x,
                                    cy: point.y,
                                    r: 2,
                                },
                                style: {
                                    stroke: '#0CD3DB', //绿
                                    fill: '#0CD3DB',
                                },
                                silent: true,
                            }
                        },
                        data: [0],
                    },
                    {
                        name: 'complete',
                        type: 'pie',
                        radius: ['58%', '45%'],
                        silent: true,
                        clockwise: true,
                        startAngle: 90,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: 'center',
                            },
                        },
                        data: [],
                    },
                    {
                        name: '',
                        type: 'gauge',
                        radius: '58%',
                        center: ['50%', '50%'],
                        startAngle: 0,
                        endAngle: 359.9,
                        splitNumber: 8,
                        hoverAnimation: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            length: 60,
                            lineStyle: {
                                width: 5,
                                color: '#061740',
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0,
                            },
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: 0,
                                name: '',
                            },
                        ],
                    },
                ],
            } as echarts.EChartOption,
            rightChartOpts: {
                tooltip: {
                    trigger: 'none',
                },
                series: [
                    {
                        name: 'ZhaoShang',
                        type: 'pie',
                        label: {
                            color: '#DBDCD9',
                            position: 'outer',
                            alignTo: 'edge',
                            margin: 10,
                            fontSize: 10,
                        },
                        labelLine: {
                            length: 15,
                            length2: 5,
                            lineStyle: {
                                color: '#DBDCD9',
                                type: 'solid',
                            },
                        },
                    },
                ],
            } as echarts.EChartOption,
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (this.leftChart) {
            this.leftChart.dispose()
            this.leftChart = undefined
        }
        if (this.rightChart) {
            this.rightChart.dispose()
            this.rightChart = undefined
        }
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = 0
        }
    },
    watch: {
        rightChartOptsDynamic(opt) {
            if (this.rightChart) {
                this.rightChart.setOption(opt)
            }
        },
    },
    methods: {
        initChart() {
            this.leftChart = echarts.init(this.$refs.leftChart as HTMLDivElement)
            this.leftChart.setOption(this.leftChartOpts)
            this.rightChart = echarts.init(this.$refs.rightChart as HTMLDivElement)
            this.rightChart.setOption(this.rightChartOpts)
        },
    },
})
</script>

<style scoped lang="scss">
.title {
    width: 100%;
    color: white;
    text-align: center;
    position: absolute;
    top: 20px;
}
.chart {
    position: relative;
    top: 20px;
}
</style>
