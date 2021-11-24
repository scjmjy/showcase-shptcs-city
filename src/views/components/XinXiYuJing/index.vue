<template>
    <slope-card-right class="xinxiyujing" :opts="cardOpts" @click="onTitleClick">
        <zhao-shang-yin-zi class="xinxiyujing-item"></zhao-shang-yin-zi>
        <qian-ru-qian-chu-v2 class="xinxiyujing-item"></qian-ru-qian-chu-v2>
        <zhong-dian-feng-xian-top-10 class="xinxiyujing-item" />
    </slope-card-right>
</template>

<script>
import Vue from 'vue'
import SlopeCardRight from '@/components/SlopeCardRight.vue'
import ZhaoShangYinZi from './ZhaoShangYinZi.vue'
// import ShuiShouBoDong from './ShuiShouBoDong.vue'
import QianRuQianChuV2 from './QianRuQianChu-v2.vue'
import ZhongDianFengXianTop10 from './ZhongDianFengXianTop10.vue'

export default Vue.extend({
    components: { SlopeCardRight, ZhaoShangYinZi, QianRuQianChuV2, ZhongDianFengXianTop10 },
    computed: {
        cardOpts() {
            return {
                clickable: true,
                title: '信息预警板块',
                width: 170,
                titleStyle: {
                    right: '20px',
                },
            }
        },
    },
    methods: {
        onTitleClick() {
            this.$root.$emit('map-xinxiyujing')
        },
    },
})
</script>

<style lang="scss" scoped>
.xinxiyujing.slopeCardRight {
    ::v-deep .slopeCardRight-content {
        display: flex;
    }
}
</style>
