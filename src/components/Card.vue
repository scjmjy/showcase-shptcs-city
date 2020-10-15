<template>
    <div class="container" :style="containerStyle">
        <div v-if="$slots.title || opts_.hasTitle" class="u-flex" :style="titleContainerStyle">
            <span v-if="!$slots.title && opts_.hasTitle" class="title" :style="titleStyle" ref="refTitle" @click="emit('click', $event)">
                {{ opts_.title }}
            </span>
            <div v-else-if="$slots.title" :style="titleStyle">
                <slot name="title"></slot>
            </div>
        </div>
        <div class="content" :style="contentStyle">
            <slot></slot>
        </div>
        <div class="corner" :style="cornerLtStyle"></div>
        <div class="corner" :style="cornerRtStyle"></div>
        <div class="corner" :style="cornerRbStyle"></div>
        <div class="corner" :style="cornerLbStyle"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toggleClass } from '@/utils/css.ts'

export default Vue.extend({
    name: 'Card',
    props: {
        opts: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        defaultOpts(): any {
            return {
                hoverable: false,
                bgColor: '#061c4a1a',
                justify: 'center',
                align: 'center',
                hasTitle: true,
                title: '我的标题',
                titleHeight: 40,
                titleColor: '#0BB7FFFF',
                titleBgColor: '#0050EF1A',
                titleSize: 20,
                titleStyle: { fontWeight: 'bold' },
                borderWidth: 1,
                borderColor: '#32548F',
                shadowColor: '#034D81',
                cornerWidth: 2,
                cornerLength: 15,
                cornerColor: '#1356ee'
            }
        },
        opts_(): any {
            const opts = Object.assign({}, this.defaultOpts, this.opts)
            if (this.opts.titleStyle) {
                const titleStyle = Object.assign({}, this.defaultOpts.titleStyle, this.opts.titleStyle)
                opts.titleStyle = titleStyle
            }
            return opts
        },
        borderStyle(): string {
            const { borderWidth, borderColor } = this.opts_
            return `${borderWidth}px solid ${borderColor}`
        },
        containerStyle(): any {
            const { shadowColor, hasTitle, bgColor } = this.opts_
            let shadow = ''
            if (hasTitle || this.$slots.title) {
                shadow = `inset 15px -15px 20px -20px ${shadowColor},
                          inset -15px 0px 20px -20px ${shadowColor}`
            } else {
                shadow = `inset 15px -15px 20px -20px ${shadowColor},
                          inset -15px 15px 20px -20px ${shadowColor}`
            }
            return {
                border: this.borderStyle,
                'box-shadow': shadow,
                'background-color': bgColor
            }
        },
        titleContainerStyle(): any {
            const { titleHeight, titleBgColor, justify, align } = this.opts_
            return {
                'justify-content': justify,
                'align-items': align,
                'background-color': titleBgColor,
                height: titleHeight + 'px'
            }
        },
        titleStyle(): any {
            const { titleColor, titleSize, titleStyle } = this.opts_
            return {
                color: titleColor,
                'font-size': titleSize + 'px',
                ...titleStyle
            }
        },
        contentStyle(): any {
            const { hasTitle, titleHeight } = this.opts_
            let height = ''
            if (hasTitle || this.$slots.title) {
                height = `calc(100% - ${titleHeight}px)`
            } else {
                height = '100%'
            }
            return {
                height
            }
        },
        cornerBorderStyle(): string {
            const { cornerWidth, cornerColor } = this.opts_
            return `${cornerWidth}px solid ${cornerColor}`
        },
        cornerLength(): string {
            const { cornerLength } = this.opts_
            return cornerLength + 'px'
        },
        cornerOffset(): string {
            const { borderWidth } = this.opts_
            return -borderWidth + 'px'
        },
        cornerLtStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                left: this.cornerOffset,
                top: this.cornerOffset,
                'border-left': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle
            }
        },
        cornerRtStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                right: this.cornerOffset,
                top: this.cornerOffset,
                'border-right': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle
            }
        },
        cornerRbStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                right: this.cornerOffset,
                bottom: this.cornerOffset,
                'border-right': this.cornerBorderStyle,
                'border-bottom': this.cornerBorderStyle
            }
        },
        cornerLbStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                left: this.cornerOffset,
                bottom: this.cornerOffset,
                'border-left': this.cornerBorderStyle,
                'border-bottom': this.cornerBorderStyle
            }
        }
    },
    mounted() {
        if (this.$refs.refTitle && this.opts_.hoverable) {
            toggleClass(this.$refs.refTitle as HTMLElement, 'hoverable')
        }
    },
    methods: {
        emit(evName: string, ev: Event) {
            this.$emit(evName, ev.target)
        }
    }
})
</script>

<style scoped>
.container {
    display: inline-block;
    overflow: visible;
    position: relative;
}

.slope {
    display: flex;
}
.title {
}

.placeholder {
}
.content {
    overflow: hidden;
}
.corner {
    position: absolute;
}
</style>
