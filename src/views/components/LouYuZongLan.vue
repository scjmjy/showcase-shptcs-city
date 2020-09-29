<template>
    <slope-card :opts="slopeOpts">
        <div style="padding: 10px">
            <div class="u-flex u-w-100">
                <card-item class="card-item" :opts="huGuanQiYe"></card-item>
                <card-item class="card-item" :opts="shuiShou"></card-item>
                <div class="card-item"></div>
            </div>
            <div class="u-flex u-w-100 u-m-t-20">
                <card-item class="card-item" :opts="zhongDianQiYe"></card-item>
                <card-item class="card-item" :opts="zhongDianQiYeShuiShou"></card-item>
                <card-item class="card-item" :opts="shuiShouZhanBi"></card-item>
            </div>
        </div>
    </slope-card>
</template>

<script lang="ts">
import Vue from 'vue'
import SlopeCard from '@/components/SlopeCard.vue'
import CardItem from '@/components/CardItem.vue'
export default Vue.extend({
    components: { SlopeCard, CardItem },
    computed: {
        slopeOpts() {
            return {
                title: '楼宇总览',
                titleStyle: {
                    'margin-left': '-10px;'
                }
            }
        },
        huGuanQiYe() {
            return {
                icon: 'dolar',
                value: 7500,
                suffix: '+',
                suffixStyle: {
                    'vertical-align': 'super'
                },
                title: '沪管企业总数'
            }
        },
        shuiShou() {
            return {
                icon: 'dolar',
                value: 3.2,
                suffix: '亿',
                title: '税收总额（2019）'
            }
        },
        zhongDianQiYe() {
            return {
                icon: 'dolar',
                value: 41,
                suffix: '家',
                title: '重点企业数（500万以上）'
            }
        },
        zhongDianQiYeShuiShou() {
            return {
                icon: 'dolar',
                value: 2.5,
                suffix: '亿',
                title: '重点企业税收总额'
            }
        },
        shuiShouZhanBi() {
            return {
                icon: 'dolar',
                value: 67,
                suffix: '%',
                title: '税收占比'
            }
        }
    }
})
</script>

<style>
.card-item {
    flex: 1;
    /* width: 200px;
    height: 140px; */
}
</style>
