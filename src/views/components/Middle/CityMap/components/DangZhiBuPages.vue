<template>
    <div class="container">
        <item-list :items="items" />
        <div v-if="items.length === 0" class="placeholder">暂无数据</div>
        <el-pagination
            class="el-pagination-custom"
            :current-page="currentPage"
            :page-size="1"
            layout="prev, pager, next, jumper"
            :total="pageTotal"
            @current-change="gotoPage"
            :small="true"
        >
        </el-pagination>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapState } from 'vuex'
import { LouYu, State } from '@/store/state'
import ItemList, { Item } from './ItemList.vue'
import api from '@/store/api'

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
            currentPage: 0,
            currentDzb: undefined as DangZhiBu | undefined
        }
    },
    computed: {
        ...mapState({
            louYuList: state => (state as State).louYuList
        }),
        pageTotal(): number {
            const louyu = this.louYuList.find(louyu => louyu.id === this.id)
            if (!louyu) {
                return 0
            }
            return louyu.dangZhiBu.length
        },
        items(): Item[] {
            const louyu = this.louYuList.find(louyu => louyu.id === this.id)
            if (!louyu) {
                return []
            }
            const dangzhibu = louyu.dangZhiBu[this.currentPage - 1]
            if (!dangzhibu) {
                return []
            }
            const { name, address, num } = dangzhibu
            const items = [
                {
                    icon: '党支部数',
                    iconColor: '#FF4005',
                    text: '党支部名称：' + (name || '-')
                },
                {
                    icon: '开展企业组团服务',
                    iconColor: '#00FFFB',
                    text: '党员人数：' + (num || '-')
                },
                {
                    icon: '地址',
                    iconColor: '#2BC8EC',
                    text: '党支部地址：' + (address || '-')
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
            this.currentPage = page
        }
    }
})
</script>

<style lang="scss" scoped>
.container {
    .placeholder {
        font-size: 25px;
        color: white;
    }
}
</style>
