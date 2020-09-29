<template>
    <transition v-if="value" :name="aniamtionName">
        <div class="popup-container" :style="popupContainerStyle">
            <div class="popup-title">
                <div>
                    <svg-icon :icon-class="icon"></svg-icon>
                    <span style="margin-left: 5px;">{{ title }}</span>
                </div>
            </div>
            <span class="popup-close" @click="emitEvent('input', false)">X</span>
            <div class="popup-content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        icon: {
            type: String,
            default: 'dolar'
        },
        title: {
            type: String,
            default: '我的标题'
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
            animated: false
        }
    },
    computed: {
        aniamtionName() {
            if (this.aniamtion === 'fade') {
                return this.aniamtion
            } else {
                return this.aniamtion + '-' + this.position
            }
        },
        popupContainerStyle() {
            const { position } = this
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
                ...trbl
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
        emitEvent(evName: string, evArg: any) {
            this.$emit(evName, evArg)
        }
    }
})
</script>

<style lang="scss" scoped>
.popup-container {
    position: absolute;
    border: 1px solid rgb(0, 61, 105);
    background-color: rgb(7, 22, 53);
    box-shadow: inset 0px 0px 15px 0px rgb(0, 61, 105);
    .popup-title {
        color: white;
        font-size: 30px;
    }

    .popup-close {
        position: absolute;
        right: 10px;
        top: 10px;
        color: rgb(0, 234, 255);
        font-size: 24px;
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

.bounce-center-enter-active {
    animation: bounce-in-center 0.5s;
}
.bounce-center-leave-active {
    animation: bounce-in-center 0.5s reverse;
}
@keyframes bounce-in-center {
    0% {
        transform: translate(-50%, -50%) scale(0);
    }
    50% {
        transform: translate(-50%, -50%) scale(1.5);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}

.bounce-bottom-right-enter-active {
    animation: bounce-in-bottom-right 0.5s;
}
.bounce-bottom-right-leave-active {
    animation: bounce-in-bottom-right 0.5s reverse;
}
@keyframes bounce-in-bottom-right {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.bounce-bottom-enter-active {
    animation: bounce-in-bottom 0.5s;
}
.bounce-bottom-leave-active {
    animation: bounce-in-bottom 0.5s reverse;
}
@keyframes bounce-in-bottom {
    0% {
        transform: translate(-50%, 0) scale(0);
    }
    50% {
        transform: translate(-50%, 0) scale(1.5);
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
