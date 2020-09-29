<template>
    <rose-pie style="width: 400px; height: 235px;" title="未解决问题分类统计" :data="data"></rose-pie>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import State from '@/store/state'
import RosePie from '@/components/chart/RosePie.vue'

export default Vue.extend({
    components: { RosePie },
    computed: {
        ...mapState({
            weiJieJueFenLeiTongJi: state => (state as State).weiJieJueFenLeiTongJi
        }),
        data() {
            return this.weiJieJueFenLeiTongJi || []
        }
    }
})
</script>
