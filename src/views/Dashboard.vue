<template>
    <div class="page-container">
        <slope-header class="header" :opts="headerOpts"></slope-header>
        <div class="content">
            <div class="left-side">
                <div>
                    <lou-yu-zong-lan class="lou-yu-zong-lan"></lou-yu-zong-lan>
                    <zhong-dian-qi-ye class="zhong-dian-qi-ye"></zhong-dian-qi-ye>
                </div>
                <div style="margin-top: 10px; height: 318px;">
                    <div style="width: 600px; height: 318px; display: inline-block;">
                        <chang-shou-shang-hui class="chang-shou-shang-hui" style="margin-bottom: 10px;"></chang-shou-shang-hui>
                        <ji-tuan-zi-guan-lou-yu class="ji-tuan-zi-guan-lou-yu"></ji-tuan-zi-guan-lou-yu>
                    </div>
                    <div style="width: 630px; height: 318px; display: inline-block; margin-left: 10px; vertical-align: top;">
                        <yi-yuan-lou-yu class="yi-yuan-lou-yu" style="margin-right: 10px;" :width="300" :height="260"></yi-yuan-lou-yu>
                        <zhong-dian-shui-shou-top5 class="yi-yuan-lou-yu" :width="300" :height="260"></zhong-dian-shui-shou-top5>
                    </div>
                </div>
                <div style="margin-top: 10px; width: 1245px; height: 320px;">
                    <xin-xi-fa-bu></xin-xi-fa-bu>
                </div>
            </div>
            <div class="middle">
                <changshou-map style="width: 1250px; height: 950px;" />
            </div>
            <div class="right-side" style="width:1240px; height:990px;">
                <xin-xi-yu-jing style="width: 1245px; height: 270px;" />
                <dang-jian style="width: 1245px; height: 155px;" />
                <lou-zhang-zhi style="width: 1245px; height: 530px; margin-top: 10px;" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SlopeHeader from '@/components/SlopeHeader.vue'
import LouYuZongLan from './components/LouYuZongLan.vue'
import ZhongDianQiYe from './components/ZhongDianQiYe.vue'
import ChangShouShangHui from './components/ChangShouShangHui.vue'
import JiTuanZiGuanLouYu from './components/JiTuanZiGuanLouYu.vue'
import YiYuanLouYu from './components/YiYuanLouYu.vue'
import ZhongDianShuiShouTop5 from './components/ZhongDianShuiShouTop5.vue'
import XinXiFaBu from './components/XinXiFaBu.vue'
import ChangshouMap from './components/ChangshouMap/index.vue'
import XinXiYuJing from './components/XinXiYuJing/index.vue'
import DangJian from './components/DangJian.vue'
import LouZhangZhi from './components/LouZhangZhi/index.vue'

@Component({
    components: {
        SlopeHeader,
        LouYuZongLan,
        ZhongDianQiYe,
        ChangShouShangHui,
        JiTuanZiGuanLouYu,
        YiYuanLouYu,
        ZhongDianShuiShouTop5,
        XinXiFaBu,
        ChangshouMap,
        XinXiYuJing,
        DangJian,
        LouZhangZhi
    }
})
export default class Home extends Vue {
    get headerOpts() {
        return {
            title: '长寿街楼宇服务经济管理系统',
            width: 1020
        }
    }
}
</script>

<style lang="scss" scoped>
.page-container {
    width: 100%;
    height: 100%;

    .header {
        width: 100%;
    }
    .content {
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        margin-top: -10px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .lou-yu-zong-lan {
        margin-top: -10px;
        width: 600px;
        height: 320px;
        margin-right: 10px;
    }
    .zhong-dian-qi-ye {
        margin-top: 29px;
        width: 630px;
        height: 280px;
        vertical-align: top;
    }
    .chang-shou-shang-hui {
        width: 600px;
        height: 154px;
    }
    .ji-tuan-zi-guan-lou-yu {
        width: 600px;
        height: 154px;
    }
    .yi-yuan-lou-yu {
        width: 307px;
        height: 318px;
    }
}
</style>
