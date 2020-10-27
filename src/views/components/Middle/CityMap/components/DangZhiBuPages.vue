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
            currentDzb: undefined as DangZhiBu | undefined
        }
    },
    computed: {
        items(): Item[] {
            if (!this.currentDzb) {
                return []
            }
            const { name, address, members } = this.currentDzb
            const items = [
                {
                    icon: '党支部数',
                    iconColor: '#FF4005',
                    text: '党支部名称：' + name
                },
                {
                    icon: '开展企业组团服务',
                    iconColor: '#00FFFB',
                    text: '党员人数：' + members
                },
                {
                    icon: '地址',
                    iconColor: '#2BC8EC',
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
            this.gotoPage(1)
        },
        gotoPage(page: number) {
            this.page
                .gotoPage(page)
                .then(({ conflict, list }) => {
                    this.currentDzb = list[0]
                })
                .catch(err => {
                    this.$message({ type: 'error', message: `获取党支部数据失败：${err.message}` })
                })
        }
    }
})
</script>

<style></style>
