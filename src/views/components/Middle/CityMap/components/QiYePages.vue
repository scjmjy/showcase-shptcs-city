<template>
    <div class="container">
        <item-list :items="items" />
        <div v-if="items.length === 0" class="placeholder">暂无数据</div>
        <el-pagination class="el-pagination-custom" :current-page="currentPage" :page-size="1" layout="prev, pager, next, jumper" :total="pageTotal" @current-change="gotoPage" :small="true">
        </el-pagination>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapState } from 'vuex'
import { LouYu, QiYe, State } from '@/store/state'
import ItemList, { Item } from './ItemList.vue'
import api from '@/store/api'

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
            currentPage: 1
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
            return louyu.qiYeList.length
        },
        items(): Item[] {
            const louyu = this.louYuList.find(louyu => louyu.id === this.id)
            if (!louyu) {
                return []
            }
            const qiye = louyu.qiYeList[this.currentPage - 1]
            if (!qiye) {
                return []
            }
            const { name, address, shuiShou, area, contact, shangHui, tag } = qiye
            const items = [
                {
                    icon: '重点企业数',
                    iconColor: '#FFD200',
                    text: '名称：' + (name || '-')
                },
                {
                    icon: '地址',
                    iconColor: '#2BC0EC',
                    text: '地址：' + (address || '-')
                },
                {
                    icon: '税收总额',
                    iconColor: '#00D98B',
                    text: '税收：' + (shuiShou || '-')
                },
                {
                    icon: '办公面积',
                    iconColor: '#CDD41B',
                    text: '办公面积：' + (area || '-')
                },
                {
                    icon: '新增会员数',
                    iconColor: '#00D98B',
                    text: '联系人：' + (contact || '-')
                },
                {
                    icon: '商会企业数',
                    iconColor: '#EB6F49',
                    text: '商会名称：' + (shangHui || '-')
                },
                {
                    icon: '标签',
                    iconColor: '#8886FF',
                    text: '标签：' + (tag || '-')
                }
            ]
            return items
        }
    },
    created() {
    },
    methods: {
        gotoPage(page) {
            this.currentPage = page
        }
    }
})
</script>

<style lang="scss">
.container {
    .placeholder {
        font-size: 25px;
        color: white;
    }
}
</style>
