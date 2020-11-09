<template>
    <el-dropdown class="marker-menu-container" :class="{ active: isMenuShowing }" @visible-change="isMenuShowing = !isMenuShowing" v-on="$listeners">
        <span class="dropdown-link">快捷撒点<i class="el-icon-arrow-right u-m-l-10 menu-icon-animatable" :class="{ 'animate-rotate': isMenuShowing }"></i></span>
        <el-dropdown-menu slot="dropdown" style="margin-top: 15px;">
            <el-dropdown-item command="louyu">楼宇总览</el-dropdown-item>
            <el-dropdown-item command="zhongdianqiye">重点企业</el-dropdown-item>
            <el-dropdown-item command="shuishoutop5">企业税收Top5</el-dropdown-item>
            <el-dropdown-item command="yiyuanlouyu">亿元楼宇</el-dropdown-item>
            <el-dropdown-item command="shuishoubodong">税收波动</el-dropdown-item>
            <el-dropdown-item command="qianruqianchu">迁入迁出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'MapMarderMenu',
    data() {
        return {
            isMenuShowing: false
        }
    }
})
</script>

<style lang="scss" scoped>
.marker-menu-container {
    opacity: 0.3;
    transition: all 1s ease;
    cursor: pointer;
    &.active {
        opacity: 1;
    }
}
.dropdown-link {
    padding: 10px 15px;
    border: 1px solid rgb(47, 96, 154);
    border-radius: 4px;
    box-shadow: inset 5px -5px 10px rgb(47, 96, 154), inset -5px 5px 10px rgb(47, 96, 154);
    color: white;
    font-weight: bolder;
}
.menu-icon-animatable {
    transition: all 0.5s ease;
}
.animate-rotate {
    transform: rotateZ(90deg);
}
</style>