<template>
    <slope-card-right :opts="cardOpts">
        <shui-shou-bo-dong style="display: inline-block;"></shui-shou-bo-dong>
        <qian-ru-qian-chu style="display: inline-block;"></qian-ru-qian-chu>
    </slope-card-right>
</template>

<script>
import Vue from 'vue'
import SlopeCardRight from '@/components/SlopeCardRight.vue'
import ShuiShouBoDong from './ShuiShouBoDong.vue'
import QianRuQianChu from './QianRuQianChu.vue'

export default Vue.extend({
    components: { SlopeCardRight, ShuiShouBoDong, QianRuQianChu },
    computed: {
        cardOpts() {
            return {
                title: '信息预警板块',
                width: 200
            }
        }
    }
})
</script>

<style></style>
