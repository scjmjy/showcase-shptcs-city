<template>
    <card :opts="cardOpts">
        <div class="dangjian-content">
            <div class="u-w-100" style="white-space: nowrap;">
                <card-item class="card-item" style="width: 177px;" :opts="dangZhiBu"></card-item>
                <card-item class="card-item" style="width: 177px;" :opts="qiYeZuTuan"></card-item>
                <card-item class="card-item" style="width: 177px;" :opts="dangJianHuoDong"></card-item>
                <card-item class="card-item" style="width: 177px;" :opts="huoDongPinTai"></card-item>
                <card-item class="card-item" style="width: 177px;" :opts="zhiYuanZhe"></card-item>
                <card-item class="card-item" style="width: 177px;" :opts="zhiYuanZheHuoDong"></card-item>
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { State, DangJian } from '@/store/state'
import Card from '@/components/Card.vue'
import CardItem from '@/components/CardItem.vue'

@Component({
    components: { Card, CardItem },
    computed: {
        ...mapState<State>({
            dangJian: (state: State) => state.dangJian
        })
    }
})
export default class DangJianBanKuai extends Vue {
    dangJian?: DangJian

    get cardOpts() {
        return {
            title: '党建板块',
            justify: 'start',
            titleStyle: { 'margin-left': '20px' }
        }
    }
    get dangZhiBu() {
        return {
            icon: '党支部数',
            iconColor: '#FF4005',
            value: this.dangJian ? this.dangJian.dangZhiBu : '-',
            suffix: '家',
            title: '党支部数'
        }
    }
    get qiYeZuTuan() {
        return {
            icon: '开展企业组团服务',
            iconColor: '#00FFFB',
            value: this.dangJian ? this.dangJian.qiYeZuTuan : '-',
            suffix: '次',
            title: '开展企业组团服务'
        }
    }
    get dangJianHuoDong() {
        return {
            icon: '开展党建活动',
            iconColor: '#FF2828',
            value: this.dangJian ? this.dangJian.dangJianHuoDong : '-',
            suffix: '次',
            title: '开展党建活动'
        }
    }
    get huoDongPinTai() {
        return {
            icon: '搭建相关活动平台',
            iconColor: '#5553CE',
            value: this.dangJian ? this.dangJian.huoDongPinTai : '-',
            suffix: '家',
            title: '搭建相关活动平台'
        }
    }
    get zhiYuanZhe() {
        return {
            icon: '培养楼宇志愿者',
            iconColor: '#00FFFB',
            value: this.dangJian ? this.dangJian.zhiYuanZhe : '-',
            suffix: '人',
            title: '培养楼宇志愿者'
        }
    }
    get zhiYuanZheHuoDong() {
        return {
            icon: '组织楼宇志愿者活动',
            iconColor: '#00D98B',
            value: this.dangJian ? this.dangJian.zhiYuanZheHuoDong : '-',
            suffix: '次',
            title: '组织楼宇志愿者活动'
        }
    }
}
</script>

<style scoped>
.dangjian-content {
    padding: 0px 20px;
    height: 100%;
    display: flex;
    align-items: center;
}
</style>
