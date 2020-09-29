<template>
    <div id="amap-container"></div>
</template>

<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace window {
    function initAMap(): void
}
// eslint-disable-next-line @typescript-eslint/no-namespace
// declare namespace AMap {
//     class Map {
//         constructor(id: string, config: any)
//     }
// }
declare const AMap: any

export default Vue.extend({
    name: 'StAMap',
    data() {
        return {
            amap: undefined
        }
    },
    mounted() {
        window.initAMap = () => {
            const map = new AMap.Map('amap-container', {
                zoom: 11, //级别
                center: [116.397428, 39.90923] //中心点坐标
            })
            this.amap = map as any
            AMap.plugin(['AMap.ToolBar', 'AMap.DistrictLayer'], function() {
                //异步加载插件
                const toolbar = new AMap.ToolBar()
                map.addControl(toolbar)
            })
            this.$emit('loaded')
        }
        const url = 'https://webapi.amap.com/maps?v=2.0&key=748c684c2bb1a67cec8a873a4b6d07e4&callback=initAMap'
        const script = document.createElement('script')
        script.charset = 'utf-8'
        script.src = url
        document.head.appendChild(script)
    }
})
</script>

<style>
.amap-container {
    width: 100%;
    height: 100%;
}
</style>
