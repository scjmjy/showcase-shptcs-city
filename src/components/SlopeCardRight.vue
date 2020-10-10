<template>
    <div class="container" :style="containerStyle">
        <div class="u-flex u-rela">
            <div class="placeholder u-flex-1" :style="placeholderStyle"></div>
            <div class="slope" :style="slopeStyle">
            </div>
            <span v-if="!$slots.title" class="title u-abso" :style="titleStyle" ref="refTitle" @click="emit('click', $event)">
                {{ opts_.title }}
            </span>
            <div v-else class="title u-abso" :style="titleStyle">
                <slot name="title"></slot>
            </div>
        </div>
        <div class="right-border" :style="placeholderRightBorder"></div>
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
    name: 'SlopeCardRight',
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
                angle: 45,
                width: 100,
                height: 41,
                justify: 'center',
                align: 'center',
                title: '我的标题',
                titleColor: '#0BB7FFFF',
                titleSize: 20,
                titleStyle: { fontWeight: 'bold', right: '0px' },
                borderWidth: 1,
                borderColor: '#2d426d',
                shadowColor: '#2d426d',
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
                'box-shadow': `inset -15px -15px 20px -15px ${shadowColor}`
            }
        },
        placeholderRightBorder(): any {
            return {
                'border-right': this.borderStyle
            }
        },
        slopeStyle(): any {
            const { width, height, angle, shadowColor, justify, align } = this.opts_
            return {
                'border-left': this.borderStyle,
                'border-top': this.borderStyle,
                width: width + 'px',
                height: height + 'px',
                transform: `skewX(-${angle}deg)`,
                'box-shadow': `inset 15px 15px 20px -20px ${shadowColor}`,
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
                'margin-right': height / tan / 2 - 1 + 'px',
                height: height + 'px',
                'border-bottom': this.borderStyle,
                'box-shadow': `0px 15px 20px -15px ${shadowColor}`
            }
        },
        contentStyle(): any {
            const { shadowColor, height } = this.opts_
            return {
                'border-left': this.borderStyle,
                'border-bottom': this.borderStyle,
                'box-shadow': `inset 15px 0px 20px -20px ${shadowColor}`,
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
            const { height } = this.opts_
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-left': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle,
                top: height - 1 + 'px'
            }
        },
        cornerRtStyle(): any {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-right': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle
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
    overflow: hidden;
    position: relative;
    /* border-left: 1px solid #2d426d; */
    /* box-shadow: inset 15px -15px 20px -20px #94c0ef63; */
}
.right-border {
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 0px;
}
.slope {
    /* border-right: 1px solid rgb(45, 66, 109); */
    /* border-top: 1px solid rgb(45, 66, 109); */
    /* width: 100px; */
    /* height: 50px; */
    /* transform: skewX(45deg); */
    /* box-shadow: inset -15px 15px 20px -20px rgba(148, 192, 239, 0.39); */
    display: flex;
}
.title {
    /* transform: skewX(-45deg); */
    /* color: #4fb5f6; */
}
/* .slope::after {
    display: inline-block;
    position: absolute;
    top: -25px;
    width: 50px;
    height: 50px;
    content: ' ';
    border-left: 1px solid rgb(45,66,109);
    transform: rotate(-45deg);
} */
.placeholder {
    /* margin-left: 24px; */
    /* height: 50px; */
    /* border-bottom: 1px solid rgb(45, 66, 109); */
    /* box-shadow: 0px 15px 20px -20px rgba(148, 192, 239, 0.39); */
}
.content {
    /* border-right: 1px solid rgb(45, 66, 109); */
    /* border-bottom: 1px solid rgb(45, 66, 109); */
    /* box-shadow: inset -15px 0px 20px -20px rgba(148, 192, 239, 0.39); */
}
.corner-lt {
    position: absolute;
    left: 0px;
}
.corner-rt {
    position: absolute;
    right: 0px;
    top: 0px;
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
