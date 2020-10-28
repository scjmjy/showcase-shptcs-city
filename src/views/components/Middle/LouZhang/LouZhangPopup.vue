<template>
    <popup :value="value" :img="img" :icon="icon" label="楼长" :title="weiJieJueWenTi.name" @input="emitEvent('input', $event)">
        <div class="content">
            <scroll-list class="list" title="未解决问题" :data="weiJieJueWenTi.wenTi" @click="openWenTiDetail" />
            <rose-pie class="pie" title="未解决问题分类统计" :data="weiJieJueWenTi.fenLei" />
        </div>
    </popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Popup from '@/components/popup/Popup.vue'
import ScrollList from '@/components/ScrollList.vue'
import RosePie from '@/components/chart/RosePie.vue'
import api from '@/store/api'

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
            weiJieJueWenTi: {
                name: '',
                wenTi: [],
                fenLei: [] as number[]
            }
        }
    },
    mounted() {
        console.log('LouZhangPopup mounted')
        api.getLouZhangWeiJiejueWenTi(this.id)
            .then((res: any) => {
                this.weiJieJueWenTi = res
            })
            .catch(err => {
                console.log(err)
            })
    },
    beforeDestroy() {
        console.log('LouZhangPopup beforeDestroy')
    },
    methods: {
        emitEvent(evName: string, evArg: any) {
            this.$emit(evName, evArg)
        },
        openWenTiDetail(item, index) {
            this.$root.$emit('popup-problem-detail', { id: index, category: '公共事业' })
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
        padding: 25px 15px 15px 15px;
        border-right: 1px solid rgb(0, 99, 167);
    }
    .pie {
        padding: 25px 15px 15px 15px;
        width: 50%;
        height: 100%;
    }
}
</style>
