<template>
    <popup :name="name" :value="value" :img="img" :icon="icon" label="楼长" :title="louzhangName" @input="emitEvent('input', $event)">
        <div class="content">
            <scroll-list class="list" title="未解决问题" :data="weiJieJueWenTi" @click="openWenTiDetail" />
            <rose-pie class="pie" title="未解决问题分类统计" :data="weiJieJueFenLeiTongJi" />
        </div>
    </popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Popup from '@/components/popup/Popup.vue'
import ScrollList from '@/components/ScrollList.vue'
import RosePie from '@/components/chart/RosePie.vue'
import api from '@/store/api'
import { WeiJieJueFenLeiTongJi, WenTi, WentiCategoryEnum } from '@/store/state'

export default Vue.extend({
    name: 'LouZhangPopup',
    components: { Popup, ScrollList, RosePie },
    props: {
        img: {
            type: String,
            default: undefined
        },
        icon: {
            type: String,
            default: undefined
        },
        name: {
            type: String,
            default: undefined
        },
        louzhangName: {
            type: String,
            default: undefined
        },
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
            weiJieJueWenTiOrigin: [] as WenTi[],
            weiJieJueFenLeiTongJiOrigin: [] as WeiJieJueFenLeiTongJi[]
        }
    },
    computed: {
        weiJieJueWenTi(): string[] {
            return this.weiJieJueWenTiOrigin.map(wenti => {
                return `${wenti.category}：${wenti.title}`
            })
        },
        weiJieJueFenLeiTongJi(): any[] {
            return this.weiJieJueFenLeiTongJiOrigin.map(item => {
                return {
                    name: item.category,
                    value: item.count
                }
            })
        }
    },
    mounted() {
        console.log('LouZhangPopup mounted')
    },
    watch: {
        id: {
            handler(newId) {
                api.requestWeiJieJueWenTi(newId)
                    .then((res: any) => {
                        this.weiJieJueWenTiOrigin = WenTi.fromServer(res.data) as WenTi[]
                    })
                    .catch(err => {
                        console.log(err)
                    })
                api.requestWeiJieJueFenLeiTongJi(newId)
                    .then((res: any) => {
                        this.weiJieJueFenLeiTongJiOrigin = WeiJieJueFenLeiTongJi.fromServer(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            immediate: true
        }
    },
    beforeDestroy() {
        console.log('LouZhangPopup beforeDestroy')
    },
    methods: {
        emitEvent(evName: string, evArg: any) {
            this.$emit(evName, evArg)
        },
        openWenTiDetail({ item, index }) {
            const wenti = this.weiJieJueWenTiOrigin[index]
            this.$root.$emit('popup-problem-detail', { id: wenti.id, labelColor: WentiCategoryEnum.str2more(wenti.category), wenti })
        }
    }
})
</script>

<style lang="scss" scoped>
.content {
    width: 820px;
    height: 273px;
    margin: 15px 5px 5px 5px;
    border: 1px solid rgb(0, 99, 167);
    display: flex;

    .list {
        width: 50%;
        height: 100%;
        padding: 20px 15px 15px 15px;
        border-right: 1px solid rgb(0, 99, 167);
    }
    .pie {
        padding: 25px 15px 15px 15px;
        width: 50%;
        height: 100%;
    }
}
</style>
