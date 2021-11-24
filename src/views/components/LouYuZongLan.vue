<template>
    <slope-card :opts="slopeOpts" @click="onTitleClick">
        <div class="zonglan-content">
            <div class="u-w-100" style="white-space: nowrap;">
                <card-item class="card-item card-item--small" :opts="huGuanQiYe"></card-item>
                <card-item class="card-item card-item--small" :opts="zhongDianQiYe"></card-item>
                <card-item class="card-item" :opts="shuiShouZhanBi"></card-item>
            </div>
            <div class="u-w-100 u-m-t-40" style="white-space: nowrap;">
                <card-item class="card-item card-item--small" :opts="shuiShou"></card-item>
                <card-item class="card-item card-item--small" :opts="xinYinJinQiYeShu"></card-item>
                <card-item class="card-item" :opts="xinZengQuShui"></card-item>
            </div>
        </div>
    </slope-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { State, LouYuZongLan } from '@/store/state'
import SlopeCard from '@/components/SlopeCard.vue'
import CardItem from '@/components/CardItem.vue'

export default Vue.extend({
    components: { SlopeCard, CardItem },
    computed: {
        ...mapState({
            louYuZongLan: state => (state as State).louYuZongLan,
        }),
        slopeOpts() {
            return {
                clickable: true,
                title: '企业总览',
                titleStyle: {
                    left: '20px',
                },
            }
        },
        huGuanQiYe() {
            return {
                icon: '户管企业总数',
                iconColor: '#06DAD6',
                value: this.louYuZongLan.huGuanQiYeZongShu,
                suffix: '',
                suffixStyle: {
                    'vertical-align': 'super',
                },
                title: '户管企业总数',
            }
        },
        shuiShou() {
            return {
                icon: '税收总额',
                iconColor: '#00D98B',
                value: this.louYuZongLan.shuiShouZongE,
                suffix: '亿',
                title: '2020年税收总额',
            }
        },
        zhongDianQiYe() {
            return {
                icon: '重点企业数',
                iconColor: '#FFD200',
                value: this.louYuZongLan.zhongDianQiYeShu,
                suffix: '家',
                title: '重点企业数',
            }
        },
        shuiShouZhanBi() {
            return {
                icon: '税收占比',
                iconColor: '#00FFFB',
                value: this.louYuZongLan.shuiShouZanBi,
                suffix: '%',
                title: '重点企业税收占比',
            }
        },
        xinYinJinQiYeShu() {
            return {
                icon: '新引进企业数',
                iconColor: '#ED1C24',
                value: this.louYuZongLan.xinYinJinQiYeShu,
                suffix: '家',
                title: '新引进企业数',
            }
        },
        xinZengQuShui() {
            return {
                icon: '新增区税',
                iconColor: '#0B93D9',
                value: this.louYuZongLan.xinZengQuShui,
                suffix: '万',
                title: '新增区税',
            }
        },
    },
    methods: {
        onTitleClick() {
            this.$root.$emit('map-louyu')
        },
    },
})
</script>

<style scoped>
.zonglan-content {
    padding: 60px 20px;
}
</style>
