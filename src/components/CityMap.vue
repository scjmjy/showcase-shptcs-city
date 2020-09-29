<template>
    <div>
        <iframe id="citygis-container" frameborder="no"></iframe>
    </div>
</template>

<script>
//// <reference path="../citygis.d.ts"/>
/* eslint-disable no-undef */
export default {
    name: 'CityMap',
    mounted() {
        this.bridge = new CityGis.Bridge({
            id: 'map',
            url: 'http://[HOSTNAME_OR_SERVERIP]/citygis/areamap/WidgetPages/WidgetGIS.html?code=city&themeid=Gis&devicetype=lg',
            onReady: function() {
                //定位闪烁
                this.bridge.Invoke({
                    ActionName: 'goToPosition',
                    Parameters: {
                        positon: {
                            x: 0,
                            y: 0,
                            z: 10
                        }
                    }
                })
            }
        })
        //回发消息处理
        this.bridge.addEventListener(function(arg) {
            switch (arg.action) {
                case 'mapclick':
                    console.log(JSON.stringify(arg.data))
                    //地图点选消息
                    break
                case 'ResetMap':
                    //地图重置完成消息
                    break
                case 'changeTheme':
                    //地图主题切换消息
                    break
                case 'Clear':
                    //地图清空消息
                    break
            }
            // eval(arg.action).apply(window, [arg.data]);
        }, this)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
