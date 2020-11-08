<template>
    <transition :name="aniamtionName">
        <div v-if="value" class="popup-container" :style="popupContainerStyle">
            <div class="popup-title">
                <img v-if="img" :src="imgUrl" class="icon" />
                <svg-icon v-if="icon" class="icon" :icon-class="icon" :style="iconStyle" />
                <span v-if="label" class="label" :style="labelStyle">{{ label + '：' }}</span>
                <span class="title" :style="titleStyle">{{ title }}</span>
            </div>
            <span class="popup-close" @click="changeValue(false)">×</span>
            <div class="popup-content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    name: 'Popup',
    props: {
        name: {
            type: String,
            default: 'default-popup-name'
        },
        img: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        iconColor: {
            type: String,
            default: 'red'
        },
        label: {
            type: String,
            default: ''
        },
        labelColor: {
            type: String,
            default: 'white'
        },
        title: {
            type: String,
            default: '我的标题'
        },
        titleColor: {
            type: String,
            default: 'white'
        },
        position: {
            type: String,
            default: 'bottom-right' // 目前支持三种：'bottom' 'bottom-right' 'center'
        },
        aniamtion: {
            type: String,
            default: 'bounce' // 目前支持量种：'bounce' 'fade'
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            zIndex: 100
        }
    },
    computed: {
        imgUrl(): string {
            if (this.img) {
                return require('../../assets/img/' + this.img)
            }
            return ''
        },
        aniamtionName(): string {
            if (this.aniamtion === 'fade') {
                return this.aniamtion
            } else {
                return this.aniamtion + '-' + this.position
            }
        },
        popupContainerStyle(): any {
            const { position, zIndex } = this
            let trbl = {}
            switch (position) {
                case 'bottom-right':
                    trbl = {
                        right: '25px',
                        bottom: '25px'
                    }
                    break
                case 'bottom':
                    trbl = {
                        left: '50%',
                        bottom: '25px',
                        transform: 'translate(-50%, 0)'
                    }
                    break
                case 'center':
                    trbl = {
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }
                    break
                default:
                    break
            }
            return {
                'z-index': zIndex,
                ...trbl
            }
        },
        iconStyle(): any {
            return {
                color: this.iconColor
            }
        },
        labelStyle(): any {
            return {
                color: this.labelColor,
                'font-weight': 'bold'
                // 'text-shadow': `0 0 5px ${this.labelColor}`
            }
        },
        titleStyle(): any {
            return {
                color: this.titleColor,
                'font-weight': 'bold'
                // 'text-shadow': `0 0 5px ${this.titleColor}`
            }
        }
    },
    mounted() {
        console.log('popup mounted')
    },
    beforeDestroy() {
        console.log('popup beforeDestroy')
    },
    methods: {
        changeValue(val) {
            if (val !== this.value) {
                this.$emit('input', val)
            }
        },
        findPopupGroupParent(parent: Vue) {
            let p = parent
            while (p) {
                if (p.$options.name === 'PopupGroup') {
                    return p
                }
                p = p.$parent
            }
            return undefined
        }
    },
    watch: {
        value(newVal, oldVal) {
            const popupGroup = this.findPopupGroupParent(this.$parent) as any
            popupGroup.onPopupStateChange(this, newVal)
        }
    }
})
</script>

<style lang="scss" scoped>
.popup-container {
    position: absolute;
    border: 1px solid rgb(0, 61, 105);
    padding: 20px 15px 15px 15px;
    background-color: rgb(7, 22, 53);
    box-shadow: inset 0px 0px 15px 0px rgb(0, 61, 105);

    .popup-title {
        font-size: 24px;
        .icon {
            margin-right: 5px;
            width: 34px;
            height: 40px;
        }
        .label {
            vertical-align: super;
            // margin-right: 5px;
            // text-shadow: 0 0 5px #88EEEE;
        }

        .title {
            vertical-align: super;
            // text-shadow: 0 0 5px #88EEEE;
        }
    }

    .popup-close {
        position: absolute;
        display: inline-flex;
        justify-content: center;
        align-items: flex-end;
        width: 20px;
        height: 20px;
        right: 12px;
        top: 12px;
        color: rgb(0, 234, 255);
        font-size: 20px;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
            transform: rotate(180deg);
        }
        &:active {
            transform: rotate(180deg) translate(-3px, -3px);
        }
    }

    .popup-content {
        overflow: hidden;
    }
}
</style>

<style lang="scss">
.bounce-center-enter-active {
    animation: bounce-in-center 0.5s;
}
.bounce-center-leave-active {
    // animation: bounce-in-center 0.5s reverse;
}
@keyframes bounce-in-center {
    0% {
        transform: translate(-50%, -50%) scale(0);
    }
    50% {
        transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}

.bounce-bottom-right-enter-active {
    animation: bounce-in-bottom-right 0.5s;
}
.bounce-bottom-right-leave-active {
    // animation: bounce-in-bottom-right 0.5s reverse;
}
@keyframes bounce-in-bottom-right {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

.bounce-bottom-enter-active {
    animation: bounce-in-bottom 0.5s;
}
.bounce-bottom-leave-active {
    // animation: bounce-in-bottom 0.5s reverse;
}
@keyframes bounce-in-bottom {
    0% {
        transform: translate(-50%, 0) scale(0);
    }
    50% {
        transform: translate(-50%, 0) scale(1.2);
    }
    100% {
        transform: translate(-50%, 0) scale(1);
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
