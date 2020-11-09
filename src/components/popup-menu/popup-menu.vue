<template>
    <div class="popup-menu-container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onClick">
        <span>{{ title }}<i class="el-icon-arrow-right menu-icon-animatable" :class="{ 'animate-rotate': showPopupMenu }"/></span>
        <transition name="fade">
            <div v-if="showPopupMenu" class="popup" @click.passive="onMenuClick">
                <slot name="popup" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'PopupMenu',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            animate: false,
            showPopupMenu: false
        }
    },
    methods: {
        onMouseEnter() {
            this.showPopupMenu = true
        },
        onMouseLeave() {
            this.showPopupMenu = false
        },
        onClick() {},
        onMenuClick() {
            this.showPopupMenu = false
        }
    }
})
</script>

<style lang="scss" scoped>
.popup {
    opacity: 0;
    transition: all 0.5s;
}
.menu-icon-animatable {
    transition: all 0.5s;
}
.animate-rotate {
    transform: rotateZ(90deg);
}
.fade-enter-active {
    opacity: 1;
}
.fade-leave-active {
    opacity: 0;
}
</style>