<template>
    <div class="container">
        <div class="header">
            <slot name="header"></slot>
            <div v-if="!$slots.header" style="height: 50px;"></div>
        </div>
        <div class="title">
            <slot name="title"></slot>
            <span v-if="!$slots.title" :style="titleStyle">{{ opts_.title }}</span>
        </div>
        <div class="u-flex u-row-center" :style="slopeContainerStyle">
            <div class="u-flex-1" :style="placeholderLeftStyle"></div>
            <div style="position: relative; height: 100%;">
                <div class="slope-left" :style="slopeLeftStyle"></div>
                <div class="slope-right" :style="slopeRightStyle"></div>
                <div :style="borderBottomStyle"></div>
            </div>
            <div class="u-flex-1" :style="placeholderRightStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlopeHeader',
    props: {
        opts: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        defaultOpts() {
            return {
                angle: 45,
                width: 500,
                height: 40,
                title: '我的标题',
                titleColor: '#02d7d5',
                titleSize: 42,
                titleStyle: {},
                borderWidth: 1,
                borderColor: '#2d426d',
                shadowColor: '#2d426d',
                borderBottomColor: '#58c2c5',
                cornerWidth: 2,
                cornerLength: 15,
                cornerColor: '#1356ee'
            }
        },
        opts_() {
            const opts = Object.assign({}, this.defaultOpts, this.opts)
            return opts
        },
        slopeOrginWidth() {
            const { width, height, angle } = this.opts_
            const tan = Math.tan((angle * Math.PI) / 180)
            return (width - height / tan) / 2
        },
        slopeContainerStyle() {
            const { height } = this.opts_
            return {
                height: height + 'px'
            }
        },
        slopeLeftStyle() {
            const { height, angle, shadowColor } = this.opts_
            return {
                display: 'inline-block',
                width: this.slopeOrginWidth + 'px',
                height: height + 'px',
                transform: `skewX(${angle}deg)`,
                'border-left': this.borderStyle,
                'border-bottom': this.borderStyle,
                'box-shadow': `inset 15px 0px 20px -20px ${shadowColor}`
            }
        },
        slopeRightStyle() {
            const { height, angle, shadowColor } = this.opts_
            return {
                display: 'inline-block',
                width: this.slopeOrginWidth + 'px',
                height: height + 'px',
                transform: `skewX(-${angle}deg)`,
                'border-right': this.borderStyle,
                'border-bottom': this.borderStyle,
                'box-shadow': `inset -15px 0px 20px -20px ${shadowColor}`
            }
        },
        borderBottomStyle() {
            const { borderWidth, borderColor, borderBottomColor, shadowColor, height, angle } = this.opts_
            const tan = Math.tan((angle * Math.PI) / 180)
            const offset = height / tan / 2 + 'px'
            return {
                position: 'absolute',
                bottom: '0px',
                height: borderWidth + 'px',
                left: offset,
                right: offset,
                'background-image': `radial-gradient(40% 4px at 50% 50%, ${borderBottomColor} 0%, ${borderBottomColor} 40%, ${borderColor} 100%)`,
                'box-shadow': `0px 0px 20px 3px ${shadowColor}`
            }
        },
        borderStyle() {
            const { borderWidth, borderColor } = this.opts_
            return `${borderWidth}px solid ${borderColor}`
        },
        titleStyle() {
            const { titleColor, titleSize, titleStyle } = this.opts_
            return {
                color: titleColor,
                'font-size': titleSize + 'px',
                ...titleStyle
            }
        },
        placeholderLeftStyle() {
            const { height, angle, shadowColor } = this.opts_
            const ang = 90 - angle
            return {
                'margin-right': height / Math.tan((ang * Math.PI) / 180) / 2 - 1 + 'px',
                height: height + 'px',
                'border-top': this.borderStyle,
                'box-shadow': `0px -15px 20px -15px ${shadowColor}`
            }
        },
        placeholderRightStyle() {
            const { height, angle, shadowColor } = this.opts_
            const ang = 90 - angle
            return {
                'margin-left': height / Math.tan((ang * Math.PI) / 180) / 2 - 1 + 'px',
                height: height + 'px',
                'border-top': this.borderStyle,
                'box-shadow': `0px -15px 20px -15px ${shadowColor}`
            }
        }
    }
}
</script>

<style scoped>
.container {
    overflow: hidden;
    position: relative;
}
.title {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
