<template>
    <div class="fengxianTop10">
        <div class="fengxianTop10-left">
            <div class="fengxianTop10-title hoverable" @click="onTitleClick">重点风险企业Top10</div>
            <img class="fengxianTop10-logo" src="@/assets/img/fengxiantop10.png" alt="" />
        </div>
        <scroll-list class="fengxianTop10-list" :colors="top10.colors" :data="top10.list" @click="openDetailPopup" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { State } from '@/store/state'
import ScrollList from '@/components/ScrollList.vue'
import { mapState } from 'vuex'

export default Vue.extend({
    components: { ScrollList },
    props: {},
    computed: {
        ...mapState({
            // zhongDianFengxianTop10: state => (state as State).zhongDianFengxianTop10,
            zhongDianFengxianTop10: (state) => (state as State).zhongDianFengxianTop10,
        }),
        top10(): { list: string[]; colors: string[] } {
            return {
                list: this.zhongDianFengxianTop10.map((item) => item.name),
                colors: this.zhongDianFengxianTop10.map((item) => (item.color === '红' ? 'red' : 'yellow')),
            }
        },
    },
    methods: {
        openDetailPopup({ item }) {
            this.$root.$emit('popup-fengxian-qiye', { name: item })
        },
        onTitleClick() {
            this.$root.$emit('map-fengxiantop10')
        },
    },
})
</script>

<style lang="scss" scoped>
.fengxianTop10 {
    vertical-align: top;
    display: inline-flex !important;
    align-items: flex-start;
    height: 225px;
    padding: 20px 0 10px;
    &-left {
        flex: 1;
    }
    &-title {
        color: white;
        font-size: 18px;
        text-align: center;
    }
    &-logo {
        width: 100%;
        padding: 20px 30px 30px;
    }
    &-list {
        flex: 2;
    }
}
</style>
