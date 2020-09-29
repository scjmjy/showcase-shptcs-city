<template>
    <card :opts="{ hasTitle: false }" style="width: 100%; height: 100%;">
        <div id="citygis-container"></div>
        <button @click="toggle('LouZhangPopup')">toggleLouZhang</button>
        <button @click="toggle('LouYuPopup')">toggleLouYu</button>
        <!-- <button @click="toggle('LouYuPopup')">toggle</button> -->
        <!-- <button @click="toggle('XinXiPopup')">toggle</button> -->
        <lou-zhang-popup v-model="showLouZhang" />
        <xin-xi-fa-bu-popup v-model="showXinXi" :id="xinXiId" />
        <lou-yu-popup v-model="showLouYu" :id="1" />
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import LouZhangPopup from './LouZhang/LouZhangPopup.vue'
import LouYuPopup from './LouYu/LouYuPopup.vue'
import XinXiFaBuPopup from './XinXiFaBuPopup.vue'
export default Vue.extend({
    name: 'ChangshouMap',
    components: { Card, LouZhangPopup, XinXiFaBuPopup, LouYuPopup },
    data() {
        return {
            show: false,
            showLouZhang: false,
            showXinXi: false,
            showLouYu: false,
            xinXiId: -1
        }
    },
    mounted() {
        this.$root.$on('popup-xinxi', (id: number) => {
            this.xinXiId = id
            this.showXinXi = true
            console.log('on-xinxi-popup')
        })
        // eslint-disable-next-line no-undef
        // this.bridge = new CityGis.Bridge({
        //     id: 'citygis-container',
        //     url: 'http://[HOSTNAME_OR_SERVERIP]/citygis/areamap/WidgetPages/WidgetGIS.html?code=city&themeid=Gis&devicetype=lg',
        //     onReady: function() {
        //         //定位闪烁
        //         this.bridge.Invoke({
        //             ActionName: 'goToPosition',
        //             Parameters: {
        //                 positon: {
        //                     x: 0,
        //                     y: 0,
        //                     z: 10
        //                 }
        //             }
        //         })
        //     }
        // })
        // //回发消息处理
        // this.bridge.addEventListener(function(arg) {
        //     switch (arg.action) {
        //         case 'mapclick':
        //             console.log(JSON.stringify(arg.data))
        //             //地图点选消息
        //             break
        //         case 'ResetMap':
        //             //地图重置完成消息
        //             break
        //         case 'changeTheme':
        //             //地图主题切换消息
        //             break
        //         case 'Clear':
        //             //地图清空消息
        //             break
        //     }
        //     // eval(arg.action).apply(window, [arg.data]);
        // }, this)
    },
    methods: {
        toggle(name: string) {
            switch (name) {
                case 'LouZhangPopup':
                    this.showLouZhang = !this.showLouZhang
                    break
                case 'LouYuPopup':
                    this.showLouYu = !this.showLouYu
                    break

                default:
                    break
            }
        }
    }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
