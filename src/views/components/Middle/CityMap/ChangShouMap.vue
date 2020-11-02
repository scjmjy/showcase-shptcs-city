<template>
    <div class="map-contianer">
        <!-- <button @click="toggle('ZhongDianQiYePopup')">toggleZhongDianQiYe</button>
        <button @click="toggle('LouYuPopup')">toggleLouYu</button> -->
        <iframe id="id-city-map" class="city-map-iframe" frameborder="no" scrolling="no" allowtransparency="true" />
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
import Interval, { IntervalTask } from '@/components/Interval.vue'

const icon_louyu = require('../../../../assets/img/louyu.png')

/**
 * 长寿街道的城建地图组件，用来撒点显示楼宇相关地理信息
 */
export default Vue.extend({
    name: 'ChangShouMap',
    components: { PopupGroup, Popup, ZhongDianQiYePopup, LouYuPopup },
    mixins: [Interval],
    data() {
        return {
            topmostPopup: '',
            isShowZhongDianQiYePopup: false,
            isShowLouYuPopup: false,
            bridge: undefined as CityGis.Bridge | undefined
        }
    },
    mounted() {
        this.newInterval(
            () => {
                this.$store.dispatch('requestBuildings')
            },
            1000 * 60,
            true
        )
        const vue = this
        this.bridge = new CityGis.Bridge({
            id: 'id-city-map',
            url: 'http://158.10.0.222/citygis/areamap/WidgetPages/WidgetGIS.html?code=0715&themeid=Gis&devicetype=lg',
            onReady() {
                vue.mapToggleMenu()
                vue.mapToggleJingMo()
                vue.mapTogglePoints()
            }
        })
    },
    methods: {
        toggle(which) {
            switch (which) {
                case 'ZhongDianQiYePopup':
                    this.isShowZhongDianQiYePopup = true
                    break
                case 'LouYuPopup':
                    this.isShowLouYuPopup = true
                    break

                default:
                    break
            }
        },
        mapToggleMenu() {
            if (this.bridge) {
                this.bridge.Invoke({
                    ActionName: 'userMenu',
                    Parameters: {
                        url: '../MapUI/mapmeun/mapmeun.html?code=0715',
                        visible: true,
                        position: 'bottom-right'
                    }
                })
            }
        },
        mapToggleJingMo() {
            if (this.bridge) {
                this.bridge.Invoke({
                    ActionName: 'themeLayer',
                    Parameters: {
                        name: '建筑精模',
                        visible: true //为true则显示反之则隐藏
                    }
                })
            }
        },
        mapToggleBaiMo() {
            if (this.bridge) {
                this.bridge.Invoke({
                    ActionName: 'themeLayer',
                    Parameters: {
                        name: '建筑白模',
                        visible: true //为true则显示反之则隐藏
                    }
                })
            }
        },
        mapTogglePoints() {
            if (!this.bridge) {
                return
            }
            this.bridge.Invoke({
                ActionName: 'ShowData',
                Parameters: {
                    name: 'eventLayerFilter',
                    type: 'point',
                    mode: 'replace',
                    data: {
                        content: [
                            {
                                coordx: '-2039.7808672166966',
                                coordy: '1370.848078007506',
                                iconType: '楼宇'
                            },
                            {
                                coordx: '-2239.7808672166966',
                                coordy: '1370.848078007506',
                                iconType: '小区管理网格'
                            },
                            {
                                coordx: '-1839.7808672166966',
                                coordy: '1370.848078007506',
                                iconType: 'text-marker'
                            }
                        ],
                        parsegeometry: 'function(item){return {x:item.coordx, y:item.coordy}}'
                    },
                    legendVisible: false,
                    popupEnabled: false,
                    isFiltered: false,
                    isLocate: false,
                    renderer: {
                        type: 'unique-value',
                        field: 'iconType',
                        uniqueValueInfos: [
                            {
                                value: 'text-marker',
                                symbol: {
                                    type: 'text',
                                    color: '#ffffff',
                                    text: 'This is my location!',
                                    xoffset: 0,
                                    yoffset: -25,
                                    font: {
                                        size: 24
                                    }
                                }
                            },
                            {
                                value: '楼宇',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://localhost:9528' + icon_louyu,
                                    width: '52px',
                                    height: '86px'
                                }
                            },
                            {
                                value: '小区管理110非警情',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/communityAndPolice.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '小区管理市场监管',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/communityAndMarket.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '小区管理综治',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/communityAndAdmin.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '综合管理网格',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/allAndGrid.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '综合管理110非警情',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/allAndPolice.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '综合管理市场监管',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/allAndMarket.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '综合管理综治',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/allAndAdmin.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '街面管理网格',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/streetAndGrid.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '街面管理110非警情',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/streetAndPolice.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '街面管理市场监管',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/streetAndMarket.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            },
                            {
                                value: '街面管理综治',
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'http://10.81.71.38/chengyun/chengyun_town/mapIcon/streetAndAdmin.png',
                                    width: '52px',
                                    height: '72px'
                                }
                            }
                        ]
                    }
                }
            })
        }
    }
})
</script>

<style lang="scss" scoped>
.map-contianer {
    width: 100%;
    height: 100%;

    .city-map-iframe {
        width: 100%;
        height: 100%;
    }
}
</style>