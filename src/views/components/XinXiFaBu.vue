<template>
    <card :opts="cardOpts">
        <dv-scroll-board :config="scrollConfigLeft" @click="onClickLeft" style="width:610px; height:280px; display: inline-block; border-right: 1px solid #2d426d;" />
        <dv-scroll-board :config="scrollConfigRight" @click="onClickRight" style="margin-left: 20px; width:610px; height:280px; display: inline-block;" />
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
const strs = ['档案', '', '', '', '', '']
const colors = ['#00FFFB', '#FF3838', '#FFF10B', '', '', '']
const XinXiCategoryEnum = new Enum(nums, strs, colors)

export default Vue.extend({
    name: 'XinXiFaBu',
    components: { Card },
    mixins: [Interval],
    computed: {
        ...mapState({
            xinXiOrigin: state => (state as State).xinXi
        }),
        cardOpts(): any {
            return {
                title: '信息发布',
                justify: 'start',
                titleStyle: { 'margin-left': '20px' }
            }
        },
        xinXiOriginLeft(): any[] {
            const count = this.xinXiOrigin.length / 2
            return this.xinXiOrigin.slice(0, count)
        },
        xinXiOriginRight(): any[] {
            return this.xinXiOrigin.slice(this.xinXiOriginLeft.length)
        },
        xinXiFaBuLeft(): any[] {
            const xinXiFaBu: any[] = []
            this.xinXiOriginLeft.forEach((info: any) => {
                const row: string[] = []
                row.push(this.buildCategory(info.category))
                row.push(this.buildTitle(info.title))
                row.push(this.buildContent(info.content))
                xinXiFaBu.push(row)
            })
            return xinXiFaBu
        },
        xinXiFaBuRight(): any[] {
            const xinXiFaBu: any[] = []
            this.xinXiOriginRight.forEach((info: any) => {
                const row: string[] = []
                row.push(this.buildCategory(info.category))
                row.push(this.buildTitle(info.title))
                row.push(this.buildContent(info.content))
                xinXiFaBu.push(row)
            })
            return xinXiFaBu
        },
        scrollConfigLeft(): any {
            return {
                data: this.xinXiFaBuLeft,
                // index: true,
                rowNum: 6,
                align: ['center'],
                columnWidth: [130, 150],
                // columnWidth: [130],
                evenRowBGC: 'transparent',
                oddRowBGC: 'transparent'
            }
        },
        scrollConfigRight(): any {
            return {
                data: this.xinXiFaBuRight,
                // index: true,
                rowNum: 6,
                align: ['center'],
                columnWidth: [130, 150],
                // columnWidth: [130],
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
        buildContent(content: string) {
            return `<div class="linkable u-line-1" style="color: #0BB7FF; font-size: 18px;">${content}</div>`
        },
        onClickLeft({ row, ceil, rowIndex, columnIndex }: any) {
            const xinxi = this.xinXiOriginLeft[rowIndex]

            this.$root.$emit('popup-xinxi', {labelColor: XinXiCategoryEnum.str2more(xinxi.category), id: xinxi.id, xinXi: xinxi })
        },
        onClickRight({ row, ceil, rowIndex, columnIndex }: any) {
            const xinxi = this.xinXiOriginRight[rowIndex]

            this.$root.$emit('popup-xinxi', {labelColor: XinXiCategoryEnum.str2more(xinxi.category), id: xinxi.id, xinXi: xinxi })
        }
    }
})
</script>

<style lang="scss">
</style>
