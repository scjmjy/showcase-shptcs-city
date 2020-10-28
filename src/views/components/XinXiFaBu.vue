<template>
    <card :opts="cardOpts">
        <dv-scroll-board :config="scrollConfig" @click="onClick" style="width:610px; height:280px; display: inline-block; border-right: 1px solid #2d426d;" />
        <dv-scroll-board :config="scrollConfig" @click="onClick" style="margin-left: 20px; width:610px; height:280px; display: inline-block;" />
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { State, XinXiFaBu } from '@/store/state'
import Interval from '@/components/Interval.vue'
import Enum from '@/utils/enum'
import Card from '@/components/Card.vue'

const nums = [0, 1, 2, 3, 4, 5]
const strs = ['政策信息', '党建活动', '招商信息', '', '', '']
const colors = ['#00FFFB', '#FF3838', '#FFF10B', '', '', '']
const XinXiCategoryEnum = new Enum(nums, strs, colors)

export default Vue.extend({
    components: { Card },
    mixins: [Interval],
    computed: {
        ...mapState({
            xinXiOrigin: state => (state as State).xinXiFaBu
        }),
        cardOpts(): any {
            return {
                title: '信息发布',
                justify: 'start',
                titleStyle: { 'margin-left': '20px' }
            }
        },
        xinXiFaBu(): any {
            const xinXiFaBu: any[] = []
            this.xinXiOrigin.forEach((info: any) => {
                const row: string[] = []
                row.push(this.buildCategory(info.category))
                row.push(this.buildTitle(info.title))
                xinXiFaBu.push(row)
            })
            return xinXiFaBu
        },
        scrollConfig(): any {
            return {
                data: this.xinXiFaBu,
                // index: true,
                rowNum: 6,
                align: ['center'],
                // columnWidth: [40, 140],
                columnWidth: [130],
                evenRowBGC: 'transparent',
                oddRowBGC: 'transparent'
            }
        }
    },
    created() {
        this.newInterval(() => {
            this.$store.dispatch('requestXinxi')
        }, 1000*60, true)
    },
    methods: {
        buildCategory(category: string) {
            const color = XinXiCategoryEnum.str2more(category)
            return `<span style="color:${color}; font-size: 18px;">【${category}】</span>`
        },
        buildTitle(title: string) {
            return `<div class="linkable" style="color: #0BB7FF; font-size: 18px;">${title}</div>`
        },
        onClick({ row, ceil, rowIndex, columnIndex }: any) {
            const xinxi = this.xinXiOrigin[rowIndex]
            this.$root.$emit('popup-xinxi', { label: xinxi.category, labelColor: XinXiCategoryEnum.str2more(xinxi.category), id: xinxi.id })
        }
    }
})
</script>

<style lang="scss">
</style>
