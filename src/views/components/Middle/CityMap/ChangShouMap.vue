<template>
    <div class="map-contianer">
        <button @click="toggle('ZhongDianQiYePopup')">toggleZhongDianQiYe</button>
        <button @click="toggle('LouYuPopup')">toggleLouYu</button>
        <popup-group v-model="topmostPopup">
            <zhong-dian-qi-ye-popup name="zhong-dian-qi-ye" v-model="isShowZhongDianQiYePopup" :id="1" />
            <lou-yu-popup name="lou-yu" v-model="isShowLouYuPopup" :id="1" />
        </popup-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PopupGroup from '@/components/popup/PopupGroup.vue'
import Popup from '@/components/popup/Popup.vue'
import ZhongDianQiYePopup from './ZhongDianQiYePopup.vue'
import LouYuPopup from './LouYuPopup.vue'

/**
 * 长寿街道的城建地图组件，用来撒点显示楼宇相关地理信息
 */
export default Vue.extend({
    name: 'ChangShouMap',
    components: { PopupGroup, Popup , ZhongDianQiYePopup, LouYuPopup },
    data() {
        return {
            topmostPopup: '',
            isShowZhongDianQiYePopup: false,
            isShowLouYuPopup: false
        }
    },
    methods: {
        toggle(which) {
            switch (which) {
                case 'ZhongDianQiYePopup':
                    this.isShowZhongDianQiYePopup = true
                    break;
                case 'LouYuPopup':
                    this.isShowLouYuPopup = true
                    break;
            
                default:
                    break;
            }
        }
    }

})
</script>

<style lang="scss" scoped>
.map-contianer {
    width: 100%;
    height: 100%;
}
</style>