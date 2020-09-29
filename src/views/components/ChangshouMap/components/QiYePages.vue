<template>
    <div class="container">
        <item-list />
        <el-pagination :current-page="page.page" :page-size="1" layout="prev, pager, next, jumper" :total="page.total" @current-change="gotoPage">
        </el-pagination>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import ItemList, { Item } from './ItemList.vue'
import api from '@/store/api'
import PageController from '@/utils/page-controller'

type QiYe = {
    name: string
    address: string
    tax: string
    area: string
    contact: string
    cc: string
    tag: string
}

export default Vue.extend({
    components: { ItemList },
    props: {
        // 楼宇 id
        id: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            page: new PageController(api.getQiYeInLouYu, 1),
            currentQiYe: {} as QiYe
        }
    },
    computed: {
        items(): Item[] {
            const { name, address, tax, area, contact, cc, tag } = this.currentQiYe
            const items = [
                {
                    icon: 'dolar',
                    text: '名称：' + name
                },
                {
                    icon: 'dolar',
                    text: '地址：' + address
                },
                {
                    icon: 'dolar',
                    text: '税收：' + tax
                },
                {
                    icon: 'dolar',
                    text: '办公面积：' + area
                },
                {
                    icon: 'dolar',
                    text: '联系人：' + contact
                },
                {
                    icon: 'dolar',
                    text: '商会名称：' + cc
                },
                {
                    icon: 'dolar',
                    text: '标签：' + tag
                }
            ]
            return items
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        fetch() {
            this.gotoPage(1, true)
        },
        gotoPage(page: number, init = false) {
            this.page
                .gotoPage(page, init)
                .then(list => {
                    this.currentQiYe = list[0]
                })
                .catch(err => {
                    this.$message({ type: 'error', message: `获取资产数据失败：${err.message}` })
                })
        }
    }
})
</script>

<style></style>
