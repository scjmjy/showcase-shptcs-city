<template>
    <card :opts="cardOpts">
        <div style="padding: 10px">
            <card-item class="card-item" :opts="shangHuiQiYe"></card-item>
            <card-item class="card-item" :opts="shangHuiQiYeShuiShou"></card-item>
            <card-item class="card-item" :opts="xinZengHuiYuan"></card-item>
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
                title: '长寿商会信息',
                justify: 'start'
            }
        },
        shangHuiQiYe() {
            return {
                icon: 'dolar',
                value: 41,
                suffix: '家',
                title: '商会企业数'
            }
        },
        shangHuiQiYeShuiShou() {
            return {
                icon: 'dolar',
                value: 2.5,
                suffix: '亿',
                title: '商会企业税收总额'
            }
        },
        xinZengHuiYuan() {
            return {
                icon: 'dolar',
                value: 10,
                suffix: '家',
                title: '新增会员数'
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
