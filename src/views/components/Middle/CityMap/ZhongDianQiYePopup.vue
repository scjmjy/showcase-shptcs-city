<template>
    <popup icon="楼宇总数" iconColor="#00FFFB" :name="name" :value="value" :title="`楼宇名称：${louYu.name}`" position="bottom-right" @input="emitEvent('input', $event)">
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
import Popup from '@/components/popup/Popup.vue'
import QiYePages from './components/QiYePages.vue'
import DangZhiBuPages from './components/DangZhiBuPages.vue'
import ItemList, { Item } from './components/ItemList.vue'
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
    name: 'ZhongDianQiYePopup',
    components: { Popup, ItemList, QiYePages, DangZhiBuPages },
    props: {
        name: {
            type: String,
            default: ''
        },
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
                    icon: '地址',
                    iconColor: '#2BC0EC',
                    text: '地址：' + address
                },
                {
                    icon: '走访企业数',
                    iconColor: '#06DAD6',
                    text: '企业数：' + qiYe
                },
                {
                    icon: '办公面积',
                    iconColor: '#CDD41B',
                    text: '办公面积：' + area
                },
                {
                    icon: '税收总额',
                    iconColor: '#00D98B',
                    text: '税收：' + tax
                }
            ]
            return items
        },
        louZhangZhiInfo(): Item[] {
            if (!this.louYu.louZhangZhi) {
                return []
            }
            const { louZhang, visit, problems, rate } = this.louYu.louZhangZhi
            const items = [
                {
                    icon: '户管企业总数',
                    iconColor: '#06DAD6',
                    text: '楼长：' + louZhang
                },
                {
                    icon: '走访次数',
                    iconColor: '#41A6FF',
                    text: '走访次数：' + visit
                },
                {
                    icon: '问题总数',
                    iconColor: '#EB6F49',
                    text: '未解决问题数：' + problems
                },
                {
                    icon: '完成率',
                    iconColor: '#00D98B',
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
    padding: 20px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    .row {
        border: 1px solid rgb(0, 99, 167);
        padding: 20px 15px;
        margin-bottom: 14px;
        width: 475px;
        display: flex;
        span {
            margin-top: 35px;
            margin-right: 30px;
            height: 100%;
            width: 60px;
            font-size: 18px;
            color: white;
            text-shadow: 0 0 5px white;
        }
    }
}
</style>
