<template>
    <card :opts="cardOpts">
        <div class="u-flex-col u-wh-100">
            <div class="u-flex first-row">
                <overview class="u-flex-1 overview" />
                <diao-yan-nian-du-tong-ji class="u-flex-1 nian-du-tong-ji" />
            </div>
            <div class="u-flex u-col-start second-row">
                <diao-yan-fen-lei-tong-ji class="u-flex-1" />
                <wei-jie-jue-wen-ti class="u-flex-1" />
                <wei-jie-jue-fen-lei-tong-ji class="u-flex-1" />
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import Overview from './Overview.vue'
import DiaoYanNianDuTongJi from './DiaoYanNianDuTongJi.vue'
import DiaoYanFenLeiTongJi from './DiaoYanFenLeiTongJi.vue'
import WeiJieJueWenTi from './WeiJieJueWenTi.vue'
import WeiJieJueFenLeiTongJi from './WeiJieJueFenLeiTongJi.vue'
@Component({
    components: { Card, Overview, DiaoYanNianDuTongJi, DiaoYanFenLeiTongJi, WeiJieJueWenTi, WeiJieJueFenLeiTongJi }
})
export default class LouZhangZhi extends Vue {
    get cardOpts() {
        return {
            title: '楼长制板块',
            justify: 'start',
            titleStyle: { 'margin-left': '20px' }
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
.first-row {
    border-bottom: 1px solid #2d426d;
    height: 231px;
}
.second-row {
    height: 253px;
}
.overview {
    padding: 20px;
}
.nian-du-tong-ji {
    border-left: 1px solid #2d426d;
    padding: 20px;
}
</style>
