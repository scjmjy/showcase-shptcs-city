<template>
    <card :opts="slopeOpts" @click="onTitleClick">
        <!-- <iframe
            class="fr-frame"
            src="http://localhost:8075/webroot/decision/view/form?viewlet=rotary_gear.frm"
            width="628px"
            height="238px"
            frameborder="0"
        ></iframe> -->
        <!-- <div ref="gaugeChart" style="display: inline-block;" :style="{ width: gaugeWidth + 'px', height: gaugeHeight + 'px' }"></div> -->
        <div ref="gaugeChart" class="u-wh-100" style="display: inline-block;"></div>
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import echarts from 'echarts'
import { mapState } from 'vuex'
import { State } from '@/store/state'

export default Vue.extend({
    components: { Card },
    props: {
        gaugeWidth: {
            type: Number,
            default: 250
        },
        gaugeHeight: {
            type: Number,
            default: 225
        }
    },
    data() {
        return {
            gaugeChart: undefined as echarts.ECharts | undefined,
            gaugeCommonOpts: {
                type: 'gauge',
                splitLine: {
                    // 分隔线
                    length: 10, // 属性length控制线长
                    lineStyle: {
                        // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 3,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    // 坐标轴线
                    lineStyle: {
                        // 属性lineStyle控制线条样式
                        color: [
                            [20 / 100, '#00d98b'],
                            [80 / 100, '#0096ff'],
                            [1, '#ff3838']
                        ],
                        width: 3,
                        shadowColor: '#10364d', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {
                    // 坐标轴小标记
                    fontWeight: 'bolder',
                    fontSize: 8,
                    color: '#fff'
                },
                axisTick: {
                    // 坐标轴小标记
                    length: 7, // 属性length控制线长
                    lineStyle: {
                        // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    shadowColor: '#10364d',
                    shadowBlur: 5
                },
                title: {
                    offsetCenter: [0, '-125%'],
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 19,
                        color: '#fff',
                        shadowColor: '#10364d',
                        shadowBlur: 10
                    }
                },
                detail: {
                    offsetCenter: [0, '85%'],
                    width: 80,
                    lineHeight: 20,
                    fontSize: 20,
                    color: '#eee',
                    backgroundColor: {
                        image: require('@/assets/img/pill.png')
                    },
                    formatter: function(value) {
                        return `${value}家`
                    },
                    rich: {}
                }
            },
            gaugeLeftOpts: {
                center: ['110', '55%'],
                radius: '80'
            },
            gaugeMiddleOpts: {
                center: ['50%', '55%'],
                radius: '80'
            },
            gaugeRightOpts: {
                center: ['520', '55%'],
                radius: '80'
            }
        }
    },
    computed: {
        slopeOpts(): any {
            return {
                clickable: true,
                title: `重点企业分析(${this.zhongDianQiYe.year}年)`
            }
        },
        ...mapState({
            zhongDianQiYe: state => (state as State).zhongDianQiYe
        }),
        gaugeChartOption(): any {
            if (!this.zhongDianQiYe) {
                return {}
            }
            const { num60, num100, num500, num } = this.zhongDianQiYe
            // let maxNum = num - (num % 100) // 100的整数倍
            let maxNum = 100
            const opt = {
                series: [
                    {
                        ...this.gaugeCommonOpts,
                        ...this.gaugeLeftOpts,
                        min: 0,
                        max: maxNum,
                        data: [{ value: num60, name: '60万以上企业' }]
                    },
                    {
                        ...this.gaugeCommonOpts,
                        ...this.gaugeMiddleOpts,
                        min: 0,
                        max: maxNum,
                        data: [{ value: num100, name: '100万以上企业' }]
                    },
                    {
                        ...this.gaugeCommonOpts,
                        ...this.gaugeRightOpts,
                        min: 0,
                        max: maxNum,
                        data: [{ value: num500, name: '500万以上企业' }]
                    }
                ]
            }
            return opt
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    beforeDestroy() {
        if (this.gaugeChart) {
            this.gaugeChart.dispose()
            this.gaugeChart = undefined
        }
    },
    watch: {
        gaugeChartOption: {
            deep: true,
            handler(opt) {
                if (this.gaugeChart) {
                    this.gaugeChart.setOption(opt)
                }
            }
        }
    },
    methods: {
        onTitleClick() {
            this.$root.$emit('map-zhongdianqiye')
        },
        initChart() {
            this.gaugeChart = echarts.init(this.$refs.gaugeChart as HTMLDivElement)
            this.gaugeChart.setOption({})
        }
    }
})
</script>

<style>
</style>
