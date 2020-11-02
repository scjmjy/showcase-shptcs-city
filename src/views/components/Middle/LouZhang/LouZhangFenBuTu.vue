<template>
    <div class="lou-zhang-fen-bu-tu-contianer">
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[0]" @click.native="onLouZhangClick(louZhangData[0])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[1]" @click.native="onLouZhangClick(louZhangData[1])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[2]" @click.native="onLouZhangClick(louZhangData[2])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[3]" @click.native="onLouZhangClick(louZhangData[3])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[4]" @click.native="onLouZhangClick(louZhangData[4])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[5]" @click.native="onLouZhangClick(louZhangData[5])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[6]" @click.native="onLouZhangClick(louZhangData[6])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[7]" @click.native="onLouZhangClick(louZhangData[7])" />
        <lou-zhang-flash-pao-pao class="lou-zhang-paopao" v-bind="louZhangData[8]" @click.native="onLouZhangClick(louZhangData[8])" />
        <zong-lou-zhang-pao-pao class="lou-zhang-paopao" v-bind="zongLouZhangData[0]" />
        <zong-lou-zhang-pao-pao class="lou-zhang-paopao" v-bind="zongLouZhangData[1]" />
        <popup-group v-model="topmostPopup">
            <lou-zhang-popup :img="showLouZhang.avatar" :id="showLouZhang.data.id" v-model="showPopup" />
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
            zongLouZhangData: [
                { avatar: '总楼长1.png', style: { left: '360px', top: '455px' } },
                { avatar: '总楼长2.png', style: { left: '570px', top: '295px' } }
            ]
        }
    },
    computed: {
        ...mapState({
            louZhang: state => (state as State).louZhang
        }),
        louZhangData() {
            const data: any[] = []
            this.louZhangFixed.forEach((item, index) => {
                const info = this.louZhang[index]
                if (info) {
                    data.push({
                        ...item,
                        data: info
                    })
                } else {
                    data.push(item)
                }
            })
            return data
        }
    },
    created() {
        this.newInterval(() => {
            this.$store.dispatch('requestLouZhang')
        }, 1000*60, true)
    },
    methods: {
        onLouZhangClick(louZhang) {
            this.showLouZhang = louZhang
            if (!this.showLouZhang.data.id) {
                this.showLouZhang.data.id = 41
            }
            this.showPopup = true
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