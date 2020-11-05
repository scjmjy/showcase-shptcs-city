<template>
    <card :opts="cardOpts">
        <dv-scroll-board
            :config="scrollConfigLeft"
            @click="onClickLeft"
            style="width:610px; height:280px; display: inline-block; border-right: 1px solid #2d426d;"
        />
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

const imgWenZhang = require('../../assets/img/文章.jpg')
const imgQiYeWenZhang = require('../../assets/img/企业文章.jpg')
const imgDiaoYanDuiXiang = require('../../assets/img/调研对象类型.jpg')
const imgDiaoYanFangShi = require('../../assets/img/调研方式.jpg')
const imgJianYiChuLi = require('../../assets/img/建议处理单位.jpg')
const imgSuQiuLeiXing = require('../../assets/img/诉求类型.jpg')
const imgTongYong = require('../../assets/img/通用.jpg')
const imgDangAn = imgTongYong

const nums = [0, 1, 2, 3, 4, 5, 6, 10000]
const strs = ['文章', '企业文章', '调研方式', '建议处理单位', '诉求类型', '调研对象类型', '档案', '通用']
const more = [
    { color: '#00FFFB', img: imgWenZhang },
    { color: '#FF3838', img: imgQiYeWenZhang },
    { color: '#FFF10B', img: imgDiaoYanFangShi },
    { color: 'rgb(128,92,254)', img: imgJianYiChuLi },
    { color: 'rgb(255,121,48)', img: imgSuQiuLeiXing },
    { color: 'rgb(253,209,0)', img: imgDiaoYanDuiXiang },
    { color: 'rgb(0,217,139)', img: imgDangAn },
    { color: 'white', img: imgTongYong }
]
const XinXiCategoryEnum = new Enum(nums, strs, more)

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
                columnWidth: [130, 130],
                // columnWidth: [130],
                evenRowBGC: 'transparent',
                oddRowBGC: 'transparent'
            }
        }
    },
    created() {
        this.newInterval(
            () => {
                this.$store.dispatch('requestXinxi')
            },
            1000 * 60,
            true
        )
    },
    methods: {
        buildCategory(category: string) {
            const color = XinXiCategoryEnum.str2more(category).color
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
            const more = XinXiCategoryEnum.str2more(xinxi.category)
            xinxi.img = more.img
            this.$root.$emit('popup-xinxi', { labelColor: more.color, id: xinxi.id, xinXi: xinxi })
        },
        onClickRight({ row, ceil, rowIndex, columnIndex }: any) {
            const xinxi = this.xinXiOriginRight[rowIndex]
            const more = XinXiCategoryEnum.str2more(xinxi.category)
            xinxi.img = more.img
            this.$root.$emit('popup-xinxi', { labelColor: more.color, id: xinxi.id, xinXi: xinxi })
        }
    }
})
</script>

<style lang="scss">
</style>
