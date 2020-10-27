<template>
    <div>
        <div class="card-item-group">
            <card-item class="card-item" :opts="louYuZongShu"></card-item>
            <card-item class="card-item" :opts="zouFangCiShu"></card-item>
            <card-item class="card-item" :opts="zouFangQiYeShu"></card-item>
        </div>
        <br />
        <div class="card-item-group">
            <card-item class="card-item" :opts="wenTiZongShu"></card-item>
            <card-item class="card-item" :opts="weiJieJueShu"></card-item>
            <card-item class="card-item" :opts="wanChengLv"></card-item>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Interval from '@/components/Interval.vue'
import { mapState } from 'vuex'
import { State, LouZhangOverview } from '@/store/state'
import CardItem from '@/components/CardItem.vue'

@Component({
    components: { CardItem },
    computed: {
        ...mapState<State>({
            overview: (state: State) => state.louZhangOverview
        })
    },
    mixins: [Interval]
})
export default class LouZhangOverviewComponent extends Interval {
    overview!: LouZhangOverview
    get louYuZongShu() {
        return {
            icon: '楼宇总数',
            iconColor: '#39c160',
            value: this.overview.louYuZongShu,
            suffix: '栋',
            title: '楼宇总数'
        }
    }
    get zouFangCiShu() {
        return {
            icon: '走访次数',
            iconColor: '#41A6FF',
            value: this.overview.zouFangCiShu,
            suffix: '次',
            title: '走访次数'
        }
    }
    get zouFangQiYeShu() {
        return {
            icon: '走访企业数',
            iconColor: '#06DAD6',
            value: this.overview.zouFangQiYeShu,
            suffix: '次',
            title: '走访企业数'
        }
    }
    get wenTiZongShu() {
        return {
            icon: '问题总数',
            iconColor: '#EB6F49',
            value: this.overview.wenTiZongShu,
            suffix: '个',
            title: '问题总数'
        }
    }
    get weiJieJueShu() {
        return {
            icon: '未解决数',
            iconColor: '#00FFFB',
            value: this.overview.weiJieJueShu,
            suffix: '个',
            title: '未解决数'
        }
    }
    get wanChengLv() {
        return {
            icon: '完成率',
            iconColor: '#00D98B',
            value: this.overview.wanChengLv,
            // suffix: '%',
            title: '完成率'
        }
    }
    created() {
        this.newInterval(() => {
            this.$store.dispatch('requestLouZhangZhi')
        }, 1000*60, true)
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
</style>
