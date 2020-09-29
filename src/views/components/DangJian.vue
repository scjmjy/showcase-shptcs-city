<template>
    <card :opts="cardOpts">
        <div class="card-item-group">
            <card-item class="card-item" :opts="dangZhiBu"></card-item>
            <card-item class="card-item" :opts="qiYeZuTuan"></card-item>
            <card-item class="card-item" :opts="dangJianHuoDong"></card-item>
            <card-item class="card-item" :opts="huoDongPinTai"></card-item>
            <card-item class="card-item" :opts="zhiYuanZhe"></card-item>
            <card-item class="card-item" :opts="zhiYuanZheHuoDong"></card-item>
        </div>
    </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import State, { DangJian } from '@/store/state'
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
            justify: 'start'
        }
    }
    get dangZhiBu() {
        return {
            icon: 'dolar',
            value: this.dangJian ? this.dangJian.dangZhiBu : '-',
            suffix: '家',
            title: '党支部数'
        }
    }
    get qiYeZuTuan() {
        return {
            icon: 'dolar',
            value: this.dangJian ? this.dangJian.qiYeZuTuan : '-',
            suffix: '次',
            title: '开展企业组团服务'
        }
    }
    get dangJianHuoDong() {
        return {
            icon: 'dolar',
            value: this.dangJian ? this.dangJian.dangJianHuoDong : '-',
            suffix: '次',
            title: '开展党建活动'
        }
    }
    get huoDongPinTai() {
        return {
            icon: 'dolar',
            value: this.dangJian ? this.dangJian.huoDongPinTai : '-',
            suffix: '家',
            title: '搭建相关活动平台'
        }
    }
    get zhiYuanZhe() {
        return {
            icon: 'dolar',
            value: this.dangJian ? this.dangJian.zhiYuanZhe : '-',
            suffix: '人',
            title: '培养楼宇志愿者'
        }
    }
    get zhiYuanZheHuoDong() {
        return {
            icon: 'dolar',
            value: this.dangJian ? this.dangJian.zhiYuanZheHuoDong : '-',
            suffix: '次',
            title: '组织楼宇志愿者活动'
        }
    }
}
</script>

<style scoped>
.card-item-group {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-item {
    flex: 1;
}
</style>
