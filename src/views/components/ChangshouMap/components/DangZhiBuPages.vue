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

type DangZhiBu = {
    name: string
    address: string
    members: number
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
            page: new PageController(api.getDangZhiBu, 1),
            currentDzb: {} as DangZhiBu
        }
    },
    computed: {
        items(): Item[] {
            const { name, address, members } = this.currentDzb
            const items = [
                {
                    icon: 'dolar',
                    text: '党支部名称：' + name
                },
                {
                    icon: 'dolar',
                    text: '党员人数：' + members
                },
                {
                    icon: 'dolar',
                    text: '党支部地址：' + address
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
                    this.currentDzb = list[0]
                })
                .catch(err => {
                    this.$message({ type: 'error', message: `获取资产数据失败：${err.message}` })
                })
        }
    }
})
</script>

<style></style>
