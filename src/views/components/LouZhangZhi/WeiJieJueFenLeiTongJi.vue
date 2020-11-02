<template>
    <rose-pie title="未解决问题分类统计" :data="data"></rose-pie>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { State } from '@/store/state'
import Interval from '@/components/Interval.vue'
import RosePie from '@/components/chart/RosePie.vue'

export default Vue.extend({
    name: 'WeiJieJueFenLeiTongJi',
    mixins: [Interval],
    components: { RosePie },
    computed: {
        ...mapState({
            weiJieJueFenLeiTongJi: state => (state as State).weiJieJueFenLeiTongJi
        }),
        data() {
            return this.weiJieJueFenLeiTongJi.map(item => {
                return {
                    name: item.category,
                    value: item.count
                }
            })
        }
    },
    created() {
        this.newInterval(
            () => {
                this.$store.dispatch('requestWeiJieJueFenLeiTongJi', undefined)
            },
            1000 * 60,
            true
        )
    },
})
</script>
