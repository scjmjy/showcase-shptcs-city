<template>
    <card :opts="{ hasTitle: false }" style="width: 100%; height: 100%;">
        <!-- <keep-alive> -->
        <component :is="currentComponent.name" v-bind="currentComponent.data" />
        <!-- </keep-alive> -->
        <map-marder-menu class="map-marker-menu" @command="onMenuCommand" />
        <popup-group v-model="topmostPopup">
            <xinxi-detail-popup name="popup-xinxi" v-model="isShowXinxiPopup" :id="xinXiId" :xinXi="xinXi" :labelColor="xinXiLabelColor" />
            <problem-detail-popup name="popup-problem-detail" v-model="isShowProblemDetailPopup" :id="wentiId" :wenti="wenti" :labelColor="wentiLabelColor" />
            <zhong-dian-qi-ye-shui-shou-popup name="popup-zhongdian-qiye" v-model="isShowZhongDianQiYePopup" :qiYeName.sync="zhongDianQiYeName" />
            <fengxian-qi-ye-popup name="popup-fengxian-qiye" v-model="isShowFengxianPopup" :qiYeName.sync="fengXianQiYeName" />
        </popup-group>
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import XinxiDetailPopup from './XinxiDetailPopup.vue'
import ProblemDetailPopup from './ProblemDetailPopup.vue'
import LouZhangFenBuTu from './LouZhang/LouZhangFenBuTu.vue'
import ChangShouMap from './CityMap/ChangShouMap.vue'
import PopupGroup from '@/components/popup/PopupGroup.vue'
import { WenTi, XinXi } from '@/store/state'
import MapMarderMenu from './components/MapMarkerMenu.vue'
import ZhongDianQiYeShuiShouPopup from './ZhongDianQiYeShuiShouPopup.vue'
import FengxianQiYePopup from './FengxianQiYePopup.vue'

/**
 * 中间地图部分区域的组件，包括长寿街道的城建地图、楼长制分布图，以及一些 popup 弹窗
 */
export default Vue.extend({
    name: 'Middle',
    components: {
        Card,
        MapMarderMenu,
        PopupGroup,
        XinxiDetailPopup,
        ProblemDetailPopup,
        LouZhangFenBuTu,
        ChangShouMap,
        ZhongDianQiYeShuiShouPopup,
        FengxianQiYePopup,
    },
    data() {
        // const pm = new PopupManager()
        return {
            xinXiId: -1,
            xinXiLabelColor: '',
            xinXi: new XinXi(),
            isShowXinxiPopup: false,
            isShowProblemDetailPopup: false,
            isShowZhongDianQiYePopup: false,
            isShowFengxianPopup: false,
            wentiId: -1,
            wenti: new WenTi(),
            wentiLabelColor: '',
            zhongDianQiYeName: '',
            fengXianQiYeName: '',
            showMask: false,
            currentComponent: {
                name: 'ChangShouMap', // LouZhangFenBuTu, ChangShouMap
                data: {},
            },
            topmostPopup: '',
        }
    },
    mounted() {
        this.$root.$on('popup-xinxi', ({ labelColor, id, xinXi }) => {
            this.topmostPopup = 'popup-xinxi'
            this.xinXiId = id
            this.xinXi = xinXi
            this.xinXiLabelColor = labelColor
        })
        this.$root.$on('popup-problem-detail', ({ id, wenti, color }) => {
            this.topmostPopup = 'popup-problem-detail'
            this.wentiId = id
            this.wenti = wenti
            this.wentiLabelColor = color
        })
        this.$root.$on('popup-zhongdian-qiye', ({ name }) => {
            this.topmostPopup = 'popup-zhongdian-qiye'
            this.zhongDianQiYeName = name
        })
        this.$root.$on('popup-fengxian-qiye', ({ name }) => {
            this.topmostPopup = 'popup-fengxian-qiye'
            this.fengXianQiYeName = name
        })
        // 显示城建地图，并且在地图上显示信息预警撒点
        this.$root.$on('map-xinxiyujing', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'yujing',
                },
            }
        })
        // 显示城建地图，并且在地图上显示信息预警撒点中的税收波动
        this.$root.$on('map-shuishoubodong', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'yujing',
                    yujingType: 'shuishou',
                },
            }
        })
        // 显示城建地图，并且在地图上显示信息预警撒点中的迁入迁出
        this.$root.$on('map-qianruqianchu', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'yujing',
                    yujingType: 'inout',
                },
            }
        })
        // 显示城建地图，并且在地图上显示重点企业撒点
        this.$root.$on('map-louyu', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'louyu',
                },
            }
        })
        // 显示城建地图，并且在地图上显示重点企业撒点
        this.$root.$on('map-zhongdianqiye', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'zhongdianqiye',
                },
            }
        })
        // 显示城建地图，并且在地图上显示重点企业所对应的楼宇撒点
        this.$root.$on('map-shuishoutop10', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'shuishoutop10',
                },
            }
        })
        // 显示城建地图，并且在地图上显示风险企业所对应的楼宇撒点
        this.$root.$on('map-fengxiantop10', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'fengxiantop10',
                },
            }
        })
        // 显示城建地图，并且在地图上显示亿元楼宇撒点
        this.$root.$on('map-yiyuanlouyu', () => {
            this.currentComponent = {
                name: 'ChangShouMap',
                data: {
                    type: 'yiyuanlouyu',
                },
            }
        })
        // 显示楼长之分布图
        this.$root.$on('map-louzhangzhi', () => {
            this.currentComponent = {
                name: 'LouZhangFenBuTu',
                data: {},
            }
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
        onMenuCommand(command) {
            this.$root.$emit('map-' + command)
        },
    },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.map-marker-menu {
    position: absolute;
    top: 80px;
    left: 20px;
}
</style>
