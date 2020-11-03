<template>
    <div class="map-contianer">
        <!-- <button @click="toggle('ZhongDianQiYePopup')">toggleZhongDianQiYe</button>
        <button @click="toggle('LouYuPopup')">toggleLouYu</button> -->
        <iframe id="id-city-map" class="city-map-iframe" frameborder="no" scrolling="no" allowtransparency="true" />
        <popup-group v-model="topmostPopup">
            <zhong-dian-qi-ye-popup name="zhong-dian-qi-ye" v-model="isShowZhongDianQiYePopup" :id="louYuId" />
            <lou-yu-popup name="lou-yu" v-model="isShowLouYuPopup" :id="louYuId" />
        </popup-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { LouYu, State } from '@/store/state'
import PopupGroup from '@/components/popup/PopupGroup.vue'
import Popup from '@/components/popup/Popup.vue'
import ZhongDianQiYePopup from './ZhongDianQiYePopup.vue'
import LouYuPopup from './LouYuPopup.vue'
import Interval, { IntervalTask } from '@/components/Interval.vue'

const icon_louyu = 'http://localhost:9528' + require('../../../../assets/img/louyu.png')
// const icon_louyu = 'http://10.81.71.51/citygis/citymap/Assets/image/RealTimeLocation/Soldie/online.png'

const icon_yujing1 = 'http://localhost:9528' + require('../../../../assets/img/信息预警1.png')
const icon_yujing2 = 'http://localhost:9528' + require('../../../../assets/img/信息预警2.png')
const icon_yujing3 = 'http://localhost:9528' + require('../../../../assets/img/信息预警3.png')
const icon_yujing4 = 'http://localhost:9528' + require('../../../../assets/img/信息预警4.png')
const icon_yujing5 = 'http://localhost:9528' + require('../../../../assets/img/信息预警5.png')
const icon_yujing6 = 'http://localhost:9528' + require('../../../../assets/img/信息预警6.png')
const icon_yujing7 = 'http://localhost:9528' + require('../../../../assets/img/信息预警7.png')
const icon_yujing8 = 'http://localhost:9528' + require('../../../../assets/img/信息预警8.png')
const icon_yujing9 = 'http://localhost:9528' + require('../../../../assets/img/信息预警9.png')

const icon_zhongdian1 = 'http://localhost:9528' + require('../../../../assets/img/重点企业1.png')
const icon_zhongdian2 = 'http://localhost:9528' + require('../../../../assets/img/重点企业2.png')
const icon_zhongdian3 = 'http://localhost:9528' + require('../../../../assets/img/重点企业3.png')
const icon_zhongdian4 = 'http://localhost:9528' + require('../../../../assets/img/重点企业4.png')
const icon_zhongdian5 = 'http://localhost:9528' + require('../../../../assets/img/重点企业5.png')
const icon_zhongdian6 = 'http://localhost:9528' + require('../../../../assets/img/重点企业6.png')
const icon_zhongdian7 = 'http://localhost:9528' + require('../../../../assets/img/重点企业7.png')
const icon_zhongdian8 = 'http://localhost:9528' + require('../../../../assets/img/重点企业8.png')
const icon_zhongdian9 = 'http://localhost:9528' + require('../../../../assets/img/重点企业9.png')

/**
 * 从1-9个预警图片中获取一个，目前只支持9个
 */
function getYuJingPic(index: number) {
    return '预警' + ((index + 1) % 9)
}

/**
 * 从1-9个重点企业图片中获取一个，目前只支持9个
 */
function randomZhongDian(index: number) {
    return '重点' + ((index + 1) % 9)
}

/**
 * 长寿街道的城建地图组件，用来撒点显示楼宇相关地理信息
 */
export default Vue.extend({
    name: 'ChangShouMap',
    components: { PopupGroup, Popup, ZhongDianQiYePopup, LouYuPopup },
    mixins: [Interval],
    props: {
        type: {
            type: String, // louyu  qiyeTop5 yujing yiyuanlouyu qiyeshuishouTop5
            default: 'louyu'
        }
    },
    data() {
        return {
            topmostPopup: '',
            isShowZhongDianQiYePopup: false,
            isShowLouYuPopup: false,
            louYuId: -1,
            bridge: undefined as CityGis.Bridge | undefined
        }
    },
    computed: {
        ...mapState({
            louYuList: state => (state as State).louYuList
        }),
        markerData(): any {
            switch (this.type) {
                case 'louyu':
                    const markers = this.louYuList.map(louyu => {
                        return {
                            coordx: louyu.coordx,
                            coordy: louyu.coordy,
                            coordz: 100,
                            iconType: '楼宇',
                            id: louyu.id,
                            name: louyu.name
                        }
                    })
                    return {
                        markers,
                        texts: []
                    }
                    break

                default:
                    break
            }
        }
    },
    created() {
        // this.
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
            url: 'http://158.10.0.222/citygis/areamap/WidgetPages/WidgetGIS.html?debug=false&maptype=3d&code=0715&themeid=Gis&devicetype=null',
            onReady(bridge) {
                vue.mapShowMenu()
                // vue.mapShowJingMo()
                vue.mapShowMarkers()
            }
        })
        //回发消息处理
        this.bridge.addEventListener(arg => {
            console.log(JSON.stringify(arg, null, 4))
            if (arg.action === 'mapclick') {
                this.showDetail(arg.data)
            }
        }, this)
    },
    watch: {
        type(type) {
            this.mapShowMarkers()
        },
        markerData(data) {
            this.mapShowMarkers()
        }
    },
    methods: {
        // toggle(which) {
        //     switch (which) {
        //         case 'ZhongDianQiYePopup':
        //             this.isShowZhongDianQiYePopup = true
        //             break
        //         case 'LouYuPopup':
        //             this.isShowLouYuPopup = true
        //             break

        //         default:
        //             break
        //     }
        // },
        showDetail(data) {
            if (!data.eventLayerFilter || data.eventLayerFilter.length === 0) {
                return
            }
            const louyu = data.eventLayerFilter[0] as LouYu
            if (louyu) {
                this.louYuId = louyu.id
                this.isShowZhongDianQiYePopup = true
            }
        },
        mapShowMenu() {
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
        mapShowJingMo() {
            if (this.bridge) {
                this.bridge.Invoke({
                    ActionName: 'themeLayer',
                    Parameters: {
                        name: '建筑精模',
                        visible: true
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
        mapShowMarkers() {
            if (!this.bridge) {
                return
            }
            const { markers, texts } = this.markerData

            const uniqueInfos = texts.map(text => {
                return {
                    value: 'text-marker',
                    symbol: {
                        type: 'text',
                        color: '#ffffff',
                        text,
                        xoffset: 0,
                        yoffset: -25,
                        font: {
                            size: 10
                        }
                    }
                }
            })
            this.bridge.Invoke({
                ActionName: 'ShowData',
                Parameters: {
                    name: 'eventLayerFilter',
                    type: 'point',
                    mode: 'replace',
                    data: {
                        content: markers,
                        parsegeometry: 'function(item){return {x:item.coordx, y:item.coordy, z:item.coordz}}'
                    },
                    legendVisible: false,
                    popupEnabled: false,
                    isFiltered: false,
                    isLocate: false,
                    renderer: {
                        type: 'unique-value',
                        field: 'iconType',
                        uniqueValueInfos: [
                            ...uniqueInfos,
                            {
                                value: '楼宇',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_louyu,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警1',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing1,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警2',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing2,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警3',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing3,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警4',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing4,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警5',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing5,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警6',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing6,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警7',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing7,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警8',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing8,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '预警9',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing9,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点1',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian1,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点2',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian2,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点3',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian3,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点4',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian4,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点5',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian5,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点6',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian6,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点7',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian7,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点8',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian8,
                                    width: '17px',
                                    height: '28px'
                                }
                            },
                            {
                                value: '重点9',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian9,
                                    width: '17px',
                                    height: '28px'
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