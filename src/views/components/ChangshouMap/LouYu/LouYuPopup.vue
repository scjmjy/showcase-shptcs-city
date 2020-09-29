<template>
    <popup :value="value" :title="`楼宇名称：${louYu.name}`" position="bottom" @input="emitEvent('input', $event)">
        <div class="content">
            <div class="row">
                <span>楼宇</span>
                <item-list :items="louYuInfo" />
            </div>
            <div class="row">
                <span>楼长制</span>
                <item-list :items="louZhangZhiInfo" />
            </div>
            <div class="row">
                <span>党支部</span>
                <dang-zhi-bu-pages :id="id" />
            </div>
            <div class="row">
                <span>企业</span>
                <qi-ye-pages :id="id" />
            </div>
        </div>
    </popup>
</template>

<script lang="ts">
import Vue from 'vue'
import Popup from '@/components/Popup.vue'
import QiYePages from '../components/QiYePages.vue'
import DangZhiBuPages from '../components/DangZhiBuPages.vue'
import ItemList, { Item } from '../components/ItemList.vue'
import api from '@/store/api'

type LouYu = {
    name: string
    address: string
    qiYe: number
    area: string
    tax: string

    louZhangZhi: {
        louZhang: string
        visit: number
        problems: number
        rate: number
    }
}
export default Vue.extend({
    name: 'LouYuPopup',
    components: { Popup, ItemList, QiYePages, DangZhiBuPages },
    props: {
        // 楼宇 id
        id: {
            type: Number,
            default: -1
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            louYu: {} as LouYu
        }
    },
    computed: {
        louYuInfo(): Item[] {
            const { address, qiYe, area, tax } = this.louYu
            const items = [
                {
                    icon: 'dolar',
                    text: '地址：' + address
                },
                {
                    icon: 'dolar',
                    text: '企业数：' + qiYe
                },
                {
                    icon: 'dolar',
                    text: '办公面积：' + area
                },
                {
                    icon: 'dolar',
                    text: '税收：' + tax
                }
            ]
            return items
        },
        louZhangZhiInfo(): Item[] {
            const { louZhang, visit, problems, rate } = this.louYu.louZhangZhi
            const items = [
                {
                    icon: 'dolar',
                    text: '楼长：' + louZhang
                },
                {
                    icon: 'dolar',
                    text: '走访次数：' + visit
                },
                {
                    icon: 'dolar',
                    text: '未解决问题数：' + problems
                },
                {
                    icon: 'dolar',
                    text: '完成率：' + rate
                }
            ]
            return items
        }
    },
    created() {
        this.fetch()
    },
    mounted() {
        // console.log('LouZhangPopup mounted')
        // api.getlouYuDetail(this.id)
        //     .then((res: any) => {
        //         this.louYu = res
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    },
    methods: {
        emitEvent(evName: string, evArg: any) {
            this.$emit(evName, evArg)
        },
        fetch() {
            api.getLouYuInfo(this.id).then(res => {
                this.louYu = res.data
            })
        }
    }
})
</script>

<style lang="scss" scoped>
.content {
    border: 1px solid rgb(0, 99, 167);
    display: flex;
    flex-direction: column;
    .row {
        width: 475px;
        display: flex;
    }
}
</style>
