<template>
    <div v-if="show" class="mask" :style="{ 'z-index': groupStartZIndex }">
        <slot />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type ActiveType = {
    topmost: string
    shows: string[]
}

let _groupStartZIndex = 200
function nextGroupStartZIndex() {
    return (_groupStartZIndex += 200)
}

export default Vue.extend({
    name: 'PopupGroup',
    props: {
        // mask: {
        //     type: Boolean,
        //     default: true
        // },
        // topmost 的 popup 的 name
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        const groupStartZIndex = nextGroupStartZIndex()
        return {
            groupStartZIndex,
            currentMaxZIndex: groupStartZIndex,
        }
    },
    computed: {
        show(): boolean {
            return !!this.value
        },
    },
    watch: {
        value(newVal, oldVal) {
            if (!oldVal) {
                // 如果 oldVal 是 ""，说明此 PopupGroup 组件此时是第一次加载，所以没有子组件，所以等下一个 tick 时才会有子组件
                this.groupStartZIndex = nextGroupStartZIndex() // 确保此 PopupGroup 在其他 PopupGroup 之上
                this.$nextTick(() => {
                    this.onValueChange(newVal)
                })
            } else {
                this.onValueChange(newVal)
            }
        },
    },
    methods: {
        nextZIndex() {
            return this.currentMaxZIndex++
        },
        findPopupChild(child: Vue) {
            let c = child
            while (c) {
                if (c.$options.name === 'Popup') {
                    return c
                }
                c = c.$children[0]
            }
            return undefined
        },
        onPopupStateChange(popup: any, show: boolean) {
            if (show) {
                if (this.value !== popup.name) {
                    this.$emit('input', popup.name) // v-model
                }
            } else {
                if (this.value === popup.name) {
                    let maxIndex = -1
                    let topmost = ''
                    this.$children.forEach((c: any) => {
                        const p = this.findPopupChild(c) as any
                        if (p && p.name !== popup.name && p.value === true) {
                            // 不是当前隐藏的popup，并且是出于显示的popup
                            if (p.zIndex > maxIndex) {
                                maxIndex = p.zIndex
                                topmost = p.name
                            }
                        }
                    })
                    this.$emit('input', topmost) // v-model
                }
            }
        },
        onValueChange(newVal) {
            if (!newVal) {
                return
            }
            for (const c of this.$children) {
                const popup = this.findPopupChild(c) as any
                if (popup && popup.name === newVal) {
                    popup.changeValue(true)
                    popup.zIndex = this.nextZIndex()
                    return
                }
            }
            throw new Error('没有找到 Popup 组件')
        },
    },
})
</script>

<style lang="scss" scoped>
.mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(7, 22, 53, 0.5);
}
</style>
