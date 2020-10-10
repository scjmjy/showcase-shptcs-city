<template>
    <card :opts="cardOpts">
        <div class="shanghui-content">
            <div class="u-w-100" style="white-space: nowrap;">
                <card-item class="card-item" :opts="shangHuiQiYe"></card-item>
                <card-item class="card-item" :opts="shangHuiQiYeShuiShou"></card-item>
                <card-item class="card-item" :opts="xinZengHuiYuan"></card-item>
            </div>
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
                justify: 'start',
                titleStyle: { 'margin-left': '20px' }
            }
        },
        shangHuiQiYe() {
            return {
                icon: '商会企业数',
                iconColor: '#EB704A',
                value: 41,
                suffix: '家',
                title: '商会企业数'
            }
        },
        shangHuiQiYeShuiShou() {
            return {
                icon: '商会企业税收总额',
                iconColor: '#00FFFB',
                value: 2.5,
                suffix: '亿',
                title: '商会企业税收总额'
            }
        },
        xinZengHuiYuan() {
            return {
                icon: '新增会员数',
                iconColor: '#00DA8C',
                value: 10,
                suffix: '家',
                title: '新增会员数'
            }
        }
    }
})
</script>

<style scoped>
.shanghui-content {
    padding: 0px 20px;
    height: 100%;
    display: flex;
    align-items: center;
}
</style>
