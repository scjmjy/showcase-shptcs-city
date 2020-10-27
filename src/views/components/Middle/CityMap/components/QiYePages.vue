<template>
    <div class="container">
        <item-list :items="items" />
        <el-pagination class="el-pagination-custom" :current-page="page.page" :page-size="1" layout="prev, pager, next, jumper" :total="page.total" @current-change="gotoPage" :small="true">
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
            currentQiYe: undefined as QiYe | undefined
        }
    },
    computed: {
        items(): Item[] {
            if (!this.currentQiYe) {
                return []
            }
            const { name, address, tax, area, contact, cc, tag } = this.currentQiYe
            const items = [
                {
                    icon: '重点企业数',
                    iconColor: '#FFD200',
                    text: '名称：' + name
                },
                {
                    icon: '地址',
                    iconColor: '#2BC0EC',
                    text: '地址：' + address
                },
                {
                    icon: '税收总额',
                    iconColor: '#00D98B',
                    text: '税收：' + tax
                },
                {
                    icon: '办公面积',
                    iconColor: '#CDD41B',
                    text: '办公面积：' + area
                },
                {
                    icon: '新增会员数',
                    iconColor: '#00D98B',
                    text: '联系人：' + contact
                },
                {
                    icon: '商会企业数',
                    iconColor: '#EB6F49',
                    text: '商会名称：' + cc
                },
                {
                    icon: '标签',
                    iconColor: '#8886FF',
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
            this.gotoPage(1)
        },
        gotoPage(page: number) {
            this.page
                .gotoPage(page)
                .then(({ conflict, list }) => {
                    this.currentQiYe = list[0]
                })
                .catch(err => {
                    this.$message({ type: 'error', message: `获取资产数据失败：${err.message}` })
                })
        }
    }
})
</script>

<style lang="scss">

</style>
