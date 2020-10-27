<template>
    <card :opts="cardOpts">
        <div class="qita-content">
            <div class="u-w-100" style="white-space: nowrap;">
                <card-item class="card-item" :opts="louYu"></card-item>
                <card-item class="card-item" :opts="siCai"></card-item>
                <card-item class="card-item" :opts="xuNiZhuChe"></card-item>
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { State } from '@/store/state'
import Card from '@/components/Card.vue'
import CardItem from '@/components/CardItem.vue'
export default Vue.extend({
    components: { Card, CardItem },
    computed: {
        ...mapState({
            qiTaLouYuQiYe: state => (state as State).qiTaLouYuQiYe
        }),
        cardOpts() {
            return {
                title: '其他楼宇企业',
                justify: 'start',
                titleStyle: { 'margin-left': '20px' }
            }
        },
        louYu() {
            return {
                icon: '楼宇数',
                iconColor: '#00FFFB',
                value: this.qiTaLouYuQiYe.jiTuanZiGuan,
                suffix: '',
                title: '集团自管楼宇'
            }
        },
        siCai() {
            return {
                icon: '四才企业',
                iconColor: '#00DA8C',
                value: this.qiTaLouYuQiYe.siCaiQiYe,
                suffix: '',
                title: '四才企业'
            }
        },
        xuNiZhuChe() {
            return {
                icon: '虚拟注册企业',
                iconColor: '#299BFF',
                value: this.qiTaLouYuQiYe.xvNiZhuChe,
                suffix: '',
                title: '虚拟注册企业'
            }
        }
    }
})
</script>

<style scoped>
.qita-content {
    padding: 0px 20px;
    height: 100%;
    display: flex;
    align-items: center;
}
</style>
