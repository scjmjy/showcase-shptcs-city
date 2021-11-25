<template>
    <div class="map-contianer">
        <iframe id="id-city-map" class="city-map-iframe" frameborder="no" scrolling="no" allowtransparency="true" />
        <div class="map-overlay">
            <div v-loading="loading" class="type-title">{{ typeTitle }}</div>
            <div v-if="type === 'yujing'" class="radio-group yujing-type">
                <div class="radio-item" :class="{ active: yujingType === 'year' }">
                    <input v-model="yujingType" id="radio-shuishoubodong" class="radio" type="radio" value="shuishou" />
                    <label for="radio-shuishoubodong" class="label" style="font-size: 20px;">税收波动</label>
                </div>
                <div class="radio-item" :class="{ active: yujingType === 'week' }">
                    <input v-model="yujingType" id="radio-qianruqianchu" class="radio" type="radio" value="inout" />
                    <label for="radio-qianruqianchu" class="label" style="font-size: 20px;">迁入迁出</label>
                </div>
            </div>
        </div>
        <!-- <div class="map-btn-group">
            <button class="map-btn" @click="mapShowMenu()">菜单</button>
            <button class="map-btn" @click="mapShowBaiMo()">白模</button>
            <button class="map-btn" @click="mapShowJingMo()">精模</button>
        </div> -->
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
import ZhongDianQiYePopup from './ZhongDianQiYePopup.vue'
import LouYuPopup from './LouYuPopup.vue'
import Interval from '@/components/Interval.vue'

// const STATIC_RESOURCE_HOST = 'http://localhost:80'
const STATIC_RESOURCE_HOST = process.env.VUE_APP_NGINX_IP

const icon_louyu = STATIC_RESOURCE_HOST + require('@/assets/img/louyu.png')

const icon_yujing1 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警1.png')
const icon_yujing2 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警2.png')
const icon_yujing3 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警3.png')
const icon_yujing4 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警4.png')
const icon_yujing5 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警5.png')
const icon_yujing6 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警6.png')
const icon_yujing7 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警7.png')
const icon_yujing8 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警8.png')
const icon_yujing9 = STATIC_RESOURCE_HOST + require('@/assets/img/信息预警9.png')

const icon_zhongdian1 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业1.png')
const icon_zhongdian2 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业2.png')
const icon_zhongdian3 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业3.png')
const icon_zhongdian4 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业4.png')
const icon_zhongdian5 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业5.png')
const icon_zhongdian6 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业6.png')
const icon_zhongdian7 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业7.png')
const icon_zhongdian8 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业8.png')
const icon_zhongdian9 = STATIC_RESOURCE_HOST + require('@/assets/img/重点企业9.png')

/**
 * 从1-9个预警图片中获取一个，目前只支持9个
 */
function getYuJingPic(index: number) {
    return '预警' + ((index + 1) % 9)
}

/**
 * 从1-9个重点企业图片中获取一个，目前只支持9个
 */
function getZhongDian(index: number) {
    return '重点' + ((index + 1) % 9)
}

/**
 * 长寿街道的城建地图组件，用来撒点显示楼宇相关地理信息
 */
export default Vue.extend({
    name: 'ChangShouMap',
    components: { PopupGroup, ZhongDianQiYePopup, LouYuPopup },
    mixins: [Interval],
    props: {
        type: {
            type: String, // louyu  shuishoutop10 yujing yiyuanlouyu zhongdianqiye
            default: 'louyu',
        },
        yujingType: {
            type: String,
            default: 'inout',
        },
    },
    data() {
        return {
            loading: false,
            markerCache: {},
            topmostPopup: '',
            isShowZhongDianQiYePopup: false,
            isShowLouYuPopup: false,
            louYuId: -1,
            bridge: (undefined as unknown) as CityGis.Bridge,
            mapReady: false,
            // yujingType: 'inout' // shuisou inout
        }
    },
    computed: {
        ...mapState({
            louYuList: state => {
                const list = (state as State).louYuList
                // if (list.length === 0) {
                //     list = LouYu.fromServer(require('@/store/api/louyu.json'))
                // }
                return list
            },
            qiYe2LouYu: state => (state as State).qiYe2Louyu,
            yuJingList: state => {
                const list = (state as State).yuJingList
                // if (list.inAndOutList.length === 0) {
                //     list = YuJingList.fromServer(require('@/store/api/yujing.json'))
                // }
                return list
            },
            ZhongDianShuiShouTop10: state => (state as State).ZhongDianShuiShouTop10,
            yiYuanLouYu: state => (state as State).yiYuanLouYu,
            zhongDianQiYeList: state => (state as State).zhongDianQiYeList,
        }),
        typeTitle(): string {
            switch (this.type) {
                case 'louyu':
                    return '企业总览'
                case 'yujing':
                    return '信息预警'
                case 'zhongdianqiye':
                    return '重点企业'
                case 'shuishoutop10':
                    return '重点企业税收Top10'
                case 'yiyuanlouyu':
                    return '亿元楼宇'
                default:
                    return ''
            }
        },
        markerData(): any {
            let marker
            switch (this.type) {
                case 'louyu':
                    marker = this.markerCache['louyu']
                    break
                case 'yujing':
                    marker = this.markerCache['yujing' + this.yujingType]
                    break
                case 'shuishoutop10':
                    marker = this.markerCache['shuishoutop10']
                    break
                case 'yiyuanlouyu':
                    marker = this.markerCache['yiyuanlouyu']
                    break
                case 'zhongdianqiye':
                    marker = this.markerCache['zhongdianqiye']
                    break
            }
            return marker || { markers: [], texts: [] }
        },
    },
    created() {
        // this.
    },
    mounted() {
        // 楼宇列表数据不需要轮询，只获取一个就可以
        this.$store.dispatch('requestBuildings')
        // this.newInterval(
        //     () => {
        //         this.$store.dispatch('requestBuildings')
        //     },
        //     1000 * 60,
        //     true
        // )
        const vue = this
        this.bridge = new CityGis.Bridge({
            id: 'id-city-map',
            url: process.env.VUE_APP_CITY_MAP_IP + '/citygis/areamap/WidgetPages/WidgetGIS.html?debug=false&maptype=3d&code=0715&themeid=Gis&devicetype=null',
            onReady(bridge) {
                vue.onMapReady()
            },
        })
        //回发消息处理
        this.bridge.addEventListener(arg => {
            switch (arg.action) {
                case 'mapclick':
                    //地图点选消息
                    this.showDetail(arg.data)
                    break
                case 'ResetMap':
                    //地图重置完成消息
                    this.onMapReady()
                    break
                case 'changeTheme':
                    //地图主题切换消息
                    break
                case 'Clear':
                    //地图清空消息
                    break
            }
        }, this)
    },
    watch: {
        type: {
            handler(type) {
                if (type === 'yujing') {
                    if (this.yuJingList.shuiShouList.length === 0 || this.yuJingList.inAndOutList.length === 0) {
                        this.$store.dispatch('requestYuJingList')
                    }
                }
                if (type === 'zhongdianqiye') {
                    if (this.zhongDianQiYeList.length === 0) {
                        this.$store.dispatch('requestZhongDianQiYeList')
                    }
                }
                this.calcMarderDataIfNeed()
            },
            immediate: true,
        },
        markerData(data) {
            this.mapShowMarkers()
        },
        louYuList() {
            this.calcMarderDataIfNeed()
        },
        yuJingList() {
            this.calcMarderDataIfNeed()
        },
        ZhongDianShuiShouTop10() {
            this.calcMarderDataIfNeed()
        },
        yiYuanLouYu() {
            this.calcMarderDataIfNeed()
        },
        zhongDianQiYeList() {
            this.calcMarderDataIfNeed()
        },
        yujingType() {
            this.calcMarderDataIfNeed()
        },
    },
    methods: {
        onMapReady() {
            this.mapReady = true
            console.log('city map ready')

            this.mapShowMenu()
            this.mapShowJingMo()
            this.mapShowMarkers()
        },
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
            if (!louyu) {
                return
            }
            this.louYuId = louyu.id
            switch (this.type) {
                case 'louyu':
                    this.topmostPopup = 'zhong-dian-qi-ye'
                    break
                case 'zhongdianqiye':
                case 'yujing':
                case 'shuishoutop10':
                case 'yiyuanlouyu':
                    this.topmostPopup = 'lou-yu'
                    break
                default:
                    return ''
            }
        },
        mapShowMenu() {
            if (this.mapReady) {
                this.bridge.Invoke({
                    ActionName: 'userMenu',
                    Parameters: {
                        url: '../MapUI/mapmeun/mapmeun.html?code=0715',
                        visible: true,
                        position: 'bottom-right',
                    },
                })
            }
        },
        mapShowJingMo() {
            if (this.mapReady) {
                this.bridge.Invoke({
                    ActionName: 'themeLayer',
                    Parameters: {
                        name: '建筑精模',
                        visible: true,
                    },
                })
            }
        },
        mapShowBaiMo() {
            if (this.mapReady) {
                this.bridge.Invoke({
                    ActionName: 'themeLayer',
                    Parameters: {
                        name: '建筑白模',
                        visible: true, //为true则显示反之则隐藏
                    },
                })
            }
        },
        mapShowMarkers() {
            if (!this.mapReady) {
                return
            }
            const { markers, texts } = this.markerData

            const uniqueInfos = texts.map(text => {
                return {
                    value: text.louyuName,
                    symbol: {
                        type: 'text',
                        color: 'red',
                        text: text.content,
                        font: text.font,
                    },
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
                        parsegeometry: 'function(item){return {x:item.coordx, y:item.coordy, z:item.coordz}}',
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
                                    height: '28px',
                                },
                            },
                            {
                                value: '预警1',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing1,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警2',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing2,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警3',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing3,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警4',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing4,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警5',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing5,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警6',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing6,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警7',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing7,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警8',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing8,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '预警9',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_yujing9,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点1',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian1,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点2',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian2,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点3',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian3,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点4',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian4,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点5',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian5,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点6',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian6,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点7',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian7,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点8',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian8,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                            {
                                value: '重点9',
                                symbol: {
                                    type: 'picture-marker',
                                    url: icon_zhongdian9,
                                    width: '51px',
                                    height: '84px',
                                },
                            },
                        ],
                    },
                },
            })
        },
        calcMarderDataIfNeed() {
            switch (this.type) {
                case 'louyu':
                    this.calcLouYuMarkers()
                    break
                case 'yujing':
                    this.calcYuJingMarkers()
                    break
                case 'shuishoutop10':
                    this.calcShuiShouTop10Markers()
                    break
                case 'yiyuanlouyu':
                    this.calcYiYuanLouYuMarkers()
                    break
                case 'zhongdianqiye':
                    this.calcZhongDianQiYeMarkers()
                    break
            }
        },
        calcLouYuMarkers() {
            if (this.louYuList.length === 0) {
                return
            }
            const key = 'louyu'
            if (!this.markerCache[key]) {
                this.loading = true
                new Promise((resovle, reject) => {
                    const markers = this.louYuList.map(louyu => {
                        return {
                            coordx: louyu.coordx,
                            coordy: louyu.coordy,
                            coordz: 100,
                            iconType: '楼宇',
                            id: louyu.id,
                            name: louyu.name,
                        }
                    })
                    resovle({
                        markers,
                        texts: [],
                    })
                })
                    .then(res => {
                        Vue.set(this.markerCache, key, res)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        calcYuJingMarkers() {
            if (this.louYuList.length === 0) {
                return
            }
            if (this.yuJingList.shuiShouList.length === 0 || this.yuJingList.inAndOutList.length === 0) {
                return
            }
            const key = 'yujing' + this.yujingType
            if (!this.markerCache[key]) {
                this.loading = true
                new Promise((resovle, reject) => {
                    const markers = [] as any[]
                    const texts = [] as any[]
                    console.time('TEST-' + key)
                    // 楼宇名字<——>预警参数，用来计算楼宇中有几个预警的企业
                    const louyu2yujing = new Map()
                    const yujinglist = this.yujingType === 'shuishou' ? this.yuJingList.shuiShouList : this.yuJingList.inAndOutList
                    yujinglist.forEach((qiye, index) => {
                        // const louyu = this.louYuList.find(l => {
                        //     return l.qiYeList.find(q => q.name === qiye.name)
                        // })
                        const louyu = this.qiYe2LouYu.get(qiye.name)
                        if (louyu) {
                            const yujing = louyu2yujing.get(louyu.name)
                            const sign = {
                                plus: qiye.status === 1 ? 1 : 0,
                                minus: qiye.status === 2 ? 1 : 0,
                            }
                            if (yujing) {
                                yujing.plus += sign.plus
                                yujing.minus += sign.minus
                            } else {
                                louyu2yujing.set(louyu.name, {
                                    id: louyu.id,
                                    name: louyu.name,
                                    coordx: louyu.coordx,
                                    coordy: louyu.coordy,
                                    ...sign,
                                })
                                markers.push({
                                    coordx: louyu.coordx,
                                    coordy: louyu.coordy,
                                    coordz: 100,
                                    iconType: getYuJingPic(index),
                                    id: louyu.id,
                                    name: louyu.name,
                                })
                            }
                        }
                    })
                    louyu2yujing.forEach((yujing, louyuName) => {
                        texts.push({
                            content: `+${yujing.plus}` + `\n-${yujing.minus}`,
                            louyuName,
                            font: {
                                size: 10,
                            },
                        })
                        markers.push({
                            coordx: yujing.coordx,
                            coordy: yujing.coordy,
                            coordz: 120,
                            iconType: louyuName,
                            id: yujing.id,
                            name: yujing.name,
                        })
                    })
                    console.timeEnd('TEST-' + key)
                    resovle({
                        markers,
                        texts,
                    })
                })
                    .then(res => {
                        Vue.set(this.markerCache, key, res)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        calcYiYuanLouYuMarkers() {
            if (this.louYuList.length === 0) {
                return
            }
            if (this.yiYuanLouYu.length === 0) {
                return
            }
            const key = 'yiyuanlouyu'
            if (!this.markerCache[key]) {
                this.loading = true
                new Promise((resovle, reject) => {
                    const markers = this.yiYuanLouYu.map((yiyuanLouyu, index) => {
                        const louyu = this.louYuList.find(l => l.name === yiyuanLouyu.name)
                        if (louyu) {
                            return {
                                coordx: louyu.coordx,
                                coordy: louyu.coordy,
                                coordz: 100,
                                iconType: getZhongDian(index),
                                id: louyu.id,
                                name: louyu.name,
                            }
                        }
                    })
                    resovle({
                        markers,
                        texts: [],
                    })
                })
                    .then(res => {
                        Vue.set(this.markerCache, key, res)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        calcShuiShouTop10Markers() {
            if (this.louYuList.length === 0) {
                return
            }
            if (this.ZhongDianShuiShouTop10.length === 0) {
                return
            }
            const key = 'shuishoutop10'
            if (!this.markerCache[key]) {
                this.loading = true
                new Promise((resovle, reject) => {
                    const markers = [] as any[]
                    const texts = [] as any[]
                    // 楼宇名字<——>税收参数，用来计算楼宇中有几个top5的企业
                    const louyu2shuishou = new Map()
                    this.ZhongDianShuiShouTop10.forEach((qiye, index) => {
                        // const louyu = this.louYuList.find(l => {
                        //     return l.qiYeList.find(q => q.name === qiye.name)
                        // })
                        const louyu = this.qiYe2LouYu.get(qiye.name)

                        if (louyu) {
                            const zhongdian = louyu2shuishou.get(louyu.name)
                            if (zhongdian) {
                                zhongdian.count++
                            } else {
                                louyu2shuishou.set(louyu.name, {
                                    id: louyu.id,
                                    name: louyu.name,
                                    coordx: louyu.coordx,
                                    coordy: louyu.coordy,
                                    count: 1,
                                })
                                markers.push({
                                    coordx: louyu.coordx,
                                    coordy: louyu.coordy,
                                    coordz: 100,
                                    iconType: getZhongDian(index),
                                    id: louyu.id,
                                    name: louyu.name,
                                })
                            }
                        }
                    })
                    louyu2shuishou.forEach((zhongdian, louyuName) => {
                        texts.push({
                            content: zhongdian.count + '',
                            louyuName,
                            font: {
                                size: 30,
                                weight: 'bold',
                            },
                        })
                        markers.push({
                            coordx: zhongdian.coordx,
                            coordy: zhongdian.coordy,
                            coordz: 200,
                            iconType: louyuName,
                            id: zhongdian.id,
                            name: zhongdian.name,
                        })
                    })
                    resovle({
                        markers,
                        texts,
                    })
                })
                    .then(res => {
                        Vue.set(this.markerCache, key, res)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        calcZhongDianQiYeMarkers() {
            if (this.louYuList.length === 0) {
                return
            }
            if (this.zhongDianQiYeList.length === 0) {
                return
            }
            const key = 'zhongdianqiye'
            if (!this.markerCache[key]) {
                this.loading = true
                new Promise((resovle, reject) => {
                    const markers = [] as any[]
                    const texts = [] as any[]
                    // 楼宇名字<——>重点企业参数，用来计算楼宇中有几个重点的企业
                    const louyu2zhongdian = new Map()
                    this.zhongDianQiYeList.forEach((qiye, index) => {
                        // const louyu = this.louYuList.find(l => {
                        //     return l.qiYeList.find(q => q.name === qiye.name)
                        // })
                        const louyu = this.qiYe2LouYu.get(qiye.name)

                        if (louyu) {
                            const zhongdian = louyu2zhongdian.get(louyu.name)
                            if (zhongdian) {
                                zhongdian.count++
                            } else {
                                louyu2zhongdian.set(louyu.name, {
                                    id: louyu.id,
                                    name: louyu.name,
                                    coordx: louyu.coordx,
                                    coordy: louyu.coordy,
                                    count: 1,
                                })
                                markers.push({
                                    coordx: louyu.coordx,
                                    coordy: louyu.coordy,
                                    coordz: 100,
                                    iconType: getZhongDian(index),
                                    id: louyu.id,
                                    name: louyu.name,
                                })
                            }
                        }
                    })
                    louyu2zhongdian.forEach((zhongdian, louyuName) => {
                        texts.push({
                            content: zhongdian.count + '',
                            louyuName,
                            font: {
                                size: 30,
                                weight: 'bold',
                            },
                        })
                        markers.push({
                            coordx: zhongdian.coordx,
                            coordy: zhongdian.coordy,
                            coordz: 250,
                            iconType: louyuName,
                            id: zhongdian.id,
                            name: zhongdian.name,
                        })
                    })
                    resovle({
                        markers,
                        texts,
                    })
                })
                    .then(res => {
                        Vue.set(this.markerCache, key, res)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
    },
})
</script>

<style lang="scss" scoped>
.map-contianer {
    width: 100%;
    height: 100%;
    position: relative;
    .city-map-iframe {
        width: 100%;
        height: 100%;
    }
    .map-btn-group {
        position: absolute;
        left: 50%;
        top: 10px;
        .map-btn + .map-btn {
            margin-left: 20px;
        }
    }
    .map-overlay {
        position: absolute;
        left: 20px;
        top: 15px;
        display: flex;
        align-items: center;
        .type-title {
            font-size: 25px;
            font-weight: bold;
            color: rgb(0, 255, 251);
        }
        .yujing-type {
            position: static;
        }
    }
}
</style>
