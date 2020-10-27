<template>
    <div class="container" :style="containerStyle">
        <div class="u-flex u-rela">
            <div class="slope" :style="slopeStyle"></div>
            <div class="placeholder u-flex-1" :style="placeholderStyle"></div>
            <span v-if="!$slots.title" class="title u-abso" :style="titleStyle" ref="refTitle" @click="emit('click', $event)">
                {{ opts_.title }}
            </span>
            <div v-else class="title u-abso" :style="titleStyle">
                <slot name="title"></slot>
            </div>
        </div>
        <div class="left-border" :style="placeholderLeftBorder"></div>
        <div class="content" :style="contentStyle">
            <slot></slot>
        </div>
        <div class="corner-lt" :style="cornerLtStyle"></div>
        <div class="corner-rt" :style="cornerRtStyle"></div>
        <div class="corner-rb" :style="cornerRbStyle"></div>
        <div class="corner-lb" :style="cornerLbStyle"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toggleClass } from '@/utils/css.ts'

export default Vue.extend({
    name: 'SlopeCard',
    props: {
        opts: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        defaultOpts(): any {
            return {
                clickable: false,
                angle: 45,
                width: 120,
                height: 41,
                justify: 'center',
                align: 'center',
                title: '我的标题',
                titleColor: '#0BB7FFFF',
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
            const { shadowColor } = this.opts_
            return {
                'box-shadow': `inset 15px -15px 20px -15px ${shadowColor}`
            }
        },
        placeholderLeftBorder(): any {
            return {
                'border-left': this.borderStyle
            }
        },
        slopeStyle(): any {
            const { width, height, angle, shadowColor, justify, align } = this.opts_
            return {
                'border-right': this.borderStyle,
                'border-top': this.borderStyle,
                width: width + 'px',
                height: height + 'px',
                transform: `skewX(${angle}deg)`,
                'box-shadow': `inset -15px 15px 20px -20px ${shadowColor}`,
                'justify-content': justify,
                'align-items': align
            }
        },
        titleStyle(): any {
            const { titleColor, titleSize, angle, titleStyle, height } = this.opts_
            const top = (height - titleSize) / 2
            return {
                color: titleColor,
                'font-size': titleSize + 'px',
                top,
                ...titleStyle
            }
        },
        placeholderStyle(): any {
            const { height, angle, shadowColor } = this.opts_
            const ang = 90 - angle
            const tan = Math.tan((ang * Math.PI) / 180)
            return {
                'margin-left': height / tan / 2 - 1 + 'px',
                height: height + 'px',
                'border-bottom': this.borderStyle,
                'box-shadow': `0px 15px 20px -15px ${shadowColor}`
            }
        },
        contentStyle(): any {
            const { height, shadowColor } = this.opts_
            return {
                'border-right': this.borderStyle,
                'border-bottom': this.borderStyle,
                'box-shadow': `inset -15px 0px 20px -20px ${shadowColor}`,
                height: `calc(100% - ${height}px)`
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
        cornerLtStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-left': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle
            }
        },
        cornerRtStyle(): any {
            const { height } = this.opts_
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-right': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle,
                top: height - 1 + 'px'
            }
        },
        cornerRbStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-right': this.cornerBorderStyle,
                'border-bottom': this.cornerBorderStyle
            }
        },
        cornerLbStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-left': this.cornerBorderStyle,
                'border-bottom': this.cornerBorderStyle
            }
        }
    },
    mounted() {
        if (this.$refs.refTitle && this.opts_.clickable) {
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
    overflow: hidden;
    position: relative;
}
.left-border {
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    width: 0px;
}
.slope {
    display: flex;
}
.title {
}

.placeholder {
}
.content {
}
.corner-lt {
    position: absolute;
    left: 0px;
    top: 0px;
}
.corner-rt {
    position: absolute;
    right: 0px;
}
.corner-lb {
    position: absolute;
    left: 0px;
    bottom: 0px;
}
.corner-rb {
    position: absolute;
    right: 0px;
    bottom: 0px;
}
</style>
