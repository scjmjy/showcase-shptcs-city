<template>
    <div class="container">
        <div class="title">{{ title }}</div>
        <dv-scroll-board class="scroll-board" :config="scrollConfig" @click="onRowClick" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { State } from '@/store/state'
import Enum from '@/utils/enum'
import Interval from '@/components/Interval.vue'
import ScrollList from '@/components/ScrollList.vue'

const nums = [0, 1, 2, 3, 4, 5]
const strs = ['经济纠纷类', '企业科技平台连接失败', '公共交通', '经济纠纷类', '安全监督', '']
const colors = ['rgb(253,209,0)', 'rgb(253,209,0)', 'rgb(199,255,65)', 'rgb(255,121,48)', 'rgb(255,72,116)', 'rgb(230,65,255)']
const WentiCategoryEnum = new Enum(nums, strs, colors)

export default Vue.extend({
    name: 'WeiJieJueTable',
    components: { ScrollList },
    mixins: [Interval],
    data() {
        return {
            // list: [
            //     { category: '经济纠纷类', louzhang: '赵卫国', title: '标题标题标题标题标题标题标题标题' },
            //     { category: '企业科技平台连接失败', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '公共交通', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '经济纠纷类', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '企业科技平台连接失败', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '社会综合', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '企业科技平台连接失败', louzhang: '赵卫国', title: '标题标题标题标题标题标题标题标题' },
            //     { category: '经济纠纷类', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '经济纠纷类', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '企业科技平台连接失败', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '安全监督', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '经济纠纷类', louzhang: '赵卫国', title: '标题标题标题标题' },
            //     { category: '企业科技平台连接失败', louzhang: '赵卫国', title: '标题标题标题标题标题标题标题标题' }
            // ],
            loading: false,
            header: [
                '<span style="font-size: 18px;">楼长</span>',
                '<span style="font-size: 18px;">问题分类</span>',
                '<span style="font-size: 18px;">标题</span>'
            ]
        }
    },
    computed: {
        ...mapState({
            weiJieJueList: state => (state as State).weiJieJueList
        }),
        title(): string {
            return `未解决问题（${this.weiJieJueList.length}）`
        },
        dataList(): string[][] {
            return this.weiJieJueList.map(wenti => {
                const louzhang = this.buildColumn(wenti.louZhang)
                const category = this.buildCategory(wenti.category)
                const title = this.buildTitle(wenti.title)
                // const title = this.buildColumn(wenti.title)
                return [louzhang, category, title]
            })
        },
        scrollConfig(): any {
            return {
                header: this.header,
                data: this.dataList,
                // index: true,
                rowNum: 5,
                align: ['center'],
                columnWidth: [60, 100],
                headerBGC: 'transparent',
                evenRowBGC: 'transparent',
                oddRowBGC: 'transparent'
            }
        }
    },
    created() {
        this.newInterval(
            () => {
                this.$store.dispatch('requestWeiJieJueWenTi', undefined)
            },
            1000 * 60,
            true
        )
    },
    methods: {
        buildColumn(data: string) {
            return `<span style="color: #0BB7FF; font-size: 15px;">${data}</span>`
        },
        buildCategory(category: string) {
            return `<span style="color: ${WentiCategoryEnum.str2more(category)}; font-size: 15px;">${category}</span>`
        },
        buildTitle(title: string) {
            return `<div class="linkable u-line-1" style="color: #0BB7FF; font-size: 15px;">${title}</div>`
        },
        onRowClick({ row, ceil, rowIndex, columnIndex }: any) {
            this.$root.$emit('popup-problem-detail', { id: rowIndex, category: row.category })
        }
    }
})
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 20px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
        // text-shadow: 0 0 5px white;
    }

    .scroll-board {
        // width: 100%;
        width: 362px;
        height: calc(100% - 30px);
        border: 1px solid rgb(46, 69, 101);
    }
}
</style>
