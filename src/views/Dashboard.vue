<template>
    <div class="page-container">
        <slope-header class="header" :opts="headerOpts"></slope-header>
        <div class="content">
            <div class="left-side">
                <div class="ls-top">
                    <lou-yu-zong-lan class="lou-yu-zong-lan"></lou-yu-zong-lan>
                    <zhong-dian-qi-ye class="zhong-dian-qi-ye"></zhong-dian-qi-ye>
                </div>
                <div class="ls-middle">
                    <div class="ls-m-left">
                        <chang-shou-shang-hui class="chang-shou-shang-hui"></chang-shou-shang-hui>
                        <qi-ta-lou-yu class="qi-ta-lou-yu"></qi-ta-lou-yu>
                    </div>
                    <div class="ls-m-right">
                        <yi-yuan-lou-yu class="yi-yuan-lou-yu" :width="300" :height="260"></yi-yuan-lou-yu>
                        <zhong-dian-shui-shou-top5 class="zhong-dian-shui-shou-top5" :width="300" :height="260"></zhong-dian-shui-shou-top5>
                    </div>
                </div>
                <div class="ls-bottom">
                    <xin-xi-fa-bu class="u-w-100"></xin-xi-fa-bu>
                </div>
            </div>
            <div class="middle">
                <changshou-map class="u-wh-100" />
            </div>
            <div class="right-side">
                <xin-xi-yu-jing class="rs-top" />
                <dang-jian class="rs-middle" />
                <lou-zhang-zhi class="rs-bottom" />
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
import QiTaLouYu from './components/QiTaLouYu.vue'
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
        QiTaLouYu,
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
            width: 1020,
            fontSize: 36
        }
    }
}
</script>

<style lang="scss" scoped>
.page-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 72px 30px 20px 30px;
    background-image: url('../assets/img/bg-cover.png');

    .header {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .left-side {
        height: calc(1080px - 72px - 20px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .ls-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .lou-yu-zong-lan {
                width: 600px;
                height: 320px;
            }
            .zhong-dian-qi-ye {
                width: 630px;
                height: 280px;
            }
        }

        .ls-middle {
            display: flex;
            justify-content: space-between;

            .ls-m-left {
                width: 600px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .chang-shou-shang-hui {
                    width: 600px;
                    height: 154px;
                }
                .qi-ta-lou-yu {
                    width: 600px;
                    height: 154px;
                }
            }

            .ls-m-right {
                width: 630px;
                display: flex;
                justify-content: space-between;
                .yi-yuan-lou-yu,
                .zhong-dian-shui-shou-top5 {
                    width: 308px;
                    height: 318px;
                }
            }
        }

        .ls-bottom {
            width: 1246px;
            height: 325px;
        }
    }

    .middle {
        width: 1248px;
        height: 948px;
    }

    .right-side {
        width: 1246px;
        height: calc(1080px - 72px - 20px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .rs-top {
            width: 100%;
            height: 273px;
        }
        .rs-middle {
            width: 100%;
            height: 158px;
        }
        .rs-bottom {
            width: 100%;
            height: 529px;
        }
    }
}
</style>
