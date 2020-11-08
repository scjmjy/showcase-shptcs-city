<template>
    <div class="lou-zhang-fen-bu-tu-contianer">
        <lou-zhang-flash-pao-pao
            v-for="louZhang of louZhangData"
            :key="louZhang.name"
            class="lou-zhang-paopao"
            v-bind="louZhang"
            @click.native="onLouZhangClick(louZhang)"
        />
        <zong-lou-zhang-pao-pao
            v-for="zongLouZhang of zongLouZhangData"
            :key="zongLouZhang.name"
            class="lou-zhang-paopao"
            v-bind="zongLouZhang"
            @click.native="onZongLouZhangClick(zongLouZhang)"
        />
        <popup-group v-model="topmostPopup">
            <lou-zhang-popup
                name="popup-louzhang"
                :img="showLouZhang.avatar"
                :id="showLouZhang.data.id"
                :louzhangName="showLouZhang.data.name"
                v-model="showPopup"
            />
        </popup-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { State } from '@/store/state'
import Interval from '@/components/Interval.vue'

import LouZhangFlashPaoPao from './components/LouZhangFlashPaoPao.vue'
import ZongLouZhangPaoPao from './components/ZongLouZhangPaoPao.vue'
import LouZhangPopup from './LouZhangPopup.vue'
import PopupGroup from '@/components/popup/PopupGroup.vue'

/**
 * 楼长分布图
 */
export default Vue.extend({
    name: 'LouZhangFenBuTu',
    components: { PopupGroup, LouZhangFlashPaoPao, ZongLouZhangPaoPao, LouZhangPopup },
    mixins: [Interval],
    data() {
        return {
            showPopup: false,
            topmostPopup: '',
            showLouZhang: {
                data: {}
            } as any,
            louZhangFixed: [
                { avatar: '楼长1.png', type: 'bl', style: { left: '25px', top: '310px' } },
                { avatar: '楼长2.png', type: 'br', style: { left: '185px', top: '130px' } },
                { avatar: '楼长3.png', type: 'bl', style: { left: '490px', top: '35px' } },
                { avatar: '楼长4.png', type: 'bl', style: { left: '800px', top: '35px' } },
                { avatar: '楼长5.png', type: 'bl', style: { left: '940px', top: '200px' } },
                { avatar: '楼长6.png', type: 'lt', style: { left: '805px', top: '465px' } },
                { avatar: '楼长7.png', type: 'tl', style: { left: '650px', top: '545px' } },
                { avatar: '楼长8.png', type: 'tl', style: { left: '340px', top: '655px' } },
                { avatar: '楼长9.png', type: 'tr', style: { left: '35px', top: '565px' } }
            ],
            zongLouZhangFixed: [
                { avatar: '总楼长1.png', style: { left: '570px', top: '295px' } },
                { avatar: '总楼长2.png', style: { left: '360px', top: '455px' } }
            ]
        }
    },
    computed: {
        ...mapState({
            louZhang: state => (state as State).louZhang
        }),
        louZhangData() {
            const data: any[] = []
            const louZhangList = this.louZhang.filter(louzhang => !louzhang.isZongLouZhang)
            this.louZhangFixed.forEach((item, index) => {
                const louzhanag = louZhangList[index]
                data.push({
                    ...item,
                    data: louzhanag
                })
            })
            return data
        },
        zongLouZhangData() {
            const data: any[] = []
            const zongLouZhangList = this.louZhang.filter(louzhang => louzhang.isZongLouZhang)
            this.zongLouZhangFixed.forEach((item, index) => {
                const louzhanag = zongLouZhangList[index]
                data.push({
                    ...item,
                    data: louzhanag
                })
            })
            return data
        }
    },
    created() {
        this.newInterval(
            () => {
                this.$store.dispatch('requestLouZhang')
            },
            1000 * 60,
            true
        )
    },
    methods: {
        onLouZhangClick(louZhang) {
            this.showLouZhang = louZhang
            if (!this.showLouZhang.data.id) {
                this.showLouZhang.data.id = 41
            }
            this.topmostPopup = 'popup-louzhang'
        },
        onZongLouZhangClick(zongLouZhang) {
            this.$message.warning('暂无数据')
        }
    }
})
</script>

<style lang="scss" scoped>
.lou-zhang-fen-bu-tu-contianer {
    background-image: url('../../../../assets/img/earth_changshou.png');
    width: 100%;
    height: 100%;
    position: relative;

    .lou-zhang-paopao {
        position: absolute;
    }
}
</style>