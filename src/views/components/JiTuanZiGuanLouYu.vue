<template>
    <card :opts="cardOpts">
        <div style="padding: 10px">
            <card-item class="card-item" :opts="louYu"></card-item>
            <card-item class="card-item" :opts="siCai"></card-item>
            <card-item class="card-item" :opts="xuNiZhuChe"></card-item>
        </div>
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import CardItem from '@/components/CardItem.vue'
export default Vue.extend({
    components: { Card, CardItem },
    computed: {
        cardOpts() {
            return {
                title: '集团自管楼宇',
                justify: 'start'
            }
        },
        louYu() {
            return {
                icon: 'dolar',
                value: 41,
                suffix: '家',
                title: '楼宇数'
            }
        },
        siCai() {
            return {
                icon: 'dolar',
                value: '暂无数据',
                suffix: '',
                title: '四才企业'
            }
        },
        xuNiZhuChe() {
            return {
                icon: 'dolar',
                value: '暂无数据',
                suffix: '',
                title: '虚拟注册企业'
            }
        }
    }
})
</script>

<style>
.card-item {
    /* width: 200px;
    height: 140px; */
}
</style>
