<template>
    <popup :name="name" :value="value" :icon="icon" :labelColor="labelColor" label="未解决问题" :title="wenti.title" @input="emitEvent('input', $event)">
        <div class="content">
            <div class="left">
                <div>楼宇名称：<span>{{ wenti.louYu }}</span></div>
                <div>企业名称：<span>{{ wenti.qiYe }}</span></div>
                <div>问题类别：<span>{{ wenti.category }}</span></div>
                <div>楼长：<span>{{ wenti.louZhang }}</span></div>
                <div>上报时间：<span>{{ wenti.time }}</span></div>
            </div>
            <div class="right">
                <div>问题详情：</div>
                <div>{{ wenti.desc }}</div>
            </div>
        </div>
    </popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Popup from '@/components/popup/Popup.vue'
import ScrollList from '@/components/ScrollList.vue'
import RosePie from '@/components/chart/RosePie.vue'
import api from '@/store/api'
import { WenTi } from '@/store/state'

export default Vue.extend({
    name: 'ProblemDetailPopup',
    components: { Popup, ScrollList, RosePie },
    props: {
        name: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: '未解决数'
        },
        id: {
            type: Number,
            default: -1
        },
        labelColor: {
            type: String,
            default: 'white'
        },
        wenti: {
            type: Object as PropType<WenTi>,
            default: () => new WenTi()
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            detail: {
                louYu: '',
                qiYe: '',
                louZhang: '',
                category: '',
                date: '',
                content: ''
            }
        }
    },
    mounted() {
        console.log('LouZhangPopup mounted')
        // api.getWenTiDetail(this.id)
        //     .then((res: any) => {
        //         this.detail = res
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
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
    width: 820px;
    height: 220px;
    margin: 15px 5px 5px 5px;
    padding: 30px 45px 35px 45px;
    border: 1px solid rgb(0, 99, 167);
    display: flex;
    .left {
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        height: 100%;
        font-size: 16px;
        color: #00F6FF;
        vertical-align: top;
        &> div {
            font-weight: bolder;
        }
        & span {
            font-weight: normal;
        }
    }

    .right {
        margin-left: 45px;
        display: inline-flex;
        flex-direction: column;
        width: 400px;
        height: 100%;
        font-size: 16px;
        color: #00F6FF;

        &> div:first-of-type {
            font-weight: bolder
        }
        &> div:last-of-type {
            margin-top: 15px;
            flex: 1;
            overflow: auto;
            line-height: 30px;
        }
    }
}
</style>
