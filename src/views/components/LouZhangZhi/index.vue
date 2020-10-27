<template>
    <card :opts="cardOpts" @click="onTitleClick">
        <div class="u-wh-100">
            <div class="first-row">
                <overview class="overview" />
                <diao-yan-nian-du-tong-ji class="nian-du-tong-ji" />
            </div>
            <div class="second-row">
                <diao-yan-fen-lei-tong-ji class="fen-lei-tong-ji" />
                <wei-jie-jue-wen-ti class="middle" />
                <wei-jie-jue-fen-lei-tong-ji class="wei-jie-jue-tong-ji" />
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
            titleStyle: { 'margin-left': '20px' },
            clickable: true
        }
    }

    onTitleClick() {
        this.$root.$emit('map-louzhangzhi')
    }
}
</script>

<style lang="scss" scoped>
.first-row {
    border-bottom: 1px solid #2d426d;
    height: 231px;

    .overview {
        float: left;
        height: 100%;
        width: 50%;
        padding: 40px 20px;
    }

    .nian-du-tong-ji {
        float: right;
        height: 100%;
        width: 50%;
        border-left: 1px solid #2d426d;
        padding: 20px 30px;
    }
}
.second-row {
    height: calc(100% - 231px);
    display: flex;

    .fen-lei-tong-ji {
        flex: 1;
        height: 100%;
        padding: 16px 30px;
    }
    .middle {
        flex: 1;
        margin: 0px 20px;
        padding: 16px 25px;
        border-left: 1px solid #2d426d;
        border-right: 1px solid #2d426d;
    }
    .wei-jie-jue-tong-ji {
        flex: 1;
        height: 100%;
        padding: 16px 0px;
    }
}
</style>
