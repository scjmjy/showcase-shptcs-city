<template>
    <popup :value="value" :title="`楼长：${weiJieJueWenTi.name}`" @input="emitEvent('input', $event)">
        <div class="content">
            <scroll-list class="list" title="未解决问题" :data="weiJieJueWenTi.wenTi" />
            <rose-pie :delay="500" class="pie" title="未解决问题分类统计" :data="weiJieJueWenTi.fenLei" />
        </div>
    </popup>
</template>

<script lang="ts">
import Vue from 'vue'
import Popup from '@/components/Popup.vue'
import ScrollList from '@/components/ScrollList.vue'
import RosePie from '@/components/chart/RosePie.vue'
import api from '@/store/api'

export default Vue.extend({
    name: 'LouZhangPopup',
    components: { Popup, ScrollList, RosePie },
    props: {
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
        }
    }
})
</script>

<style lang="scss" scoped>
.content {
    border: 1px solid rgb(0, 99, 167);
    display: flex;

    .list {
        width: 405px;
        height: 270px;
        padding: 10px;
        border-right: 1px solid rgb(0, 99, 167);
    }
    .pie {
        width: 405px;
        height: 270px;
    }
}
</style>
