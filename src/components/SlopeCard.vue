<template>
    <div class="container" :style="containerStyle">
        <div class="u-flex">
            <div class="slope" :style="slopeStyle">
                <span v-if="!$slots.title" class="title" :style="titleStyle">
                    {{ opts_.title }}
                </span>
                <div v-else :style="titleStyle">
                    <slot name="title"></slot>
                </div>
            </div>
            <div class="placeholder u-flex-1" :style="placeholderStyle"></div>
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

<script>
export default {
    name: 'SlopeCard',
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
                width: 100,
                height: 40,
                justify: 'center',
                align: 'center',
                title: '我的标题',
                titleColor: '#4fb5f6',
                titleSize: 18,
                titleStyle: {},
                borderWidth: 1,
                borderColor: '#2d426d',
                shadowColor: '#2d426d',
                cornerWidth: 2,
                cornerLength: 15,
                cornerColor: '#1356ee'
            }
        },
        opts_() {
            const opts = Object.assign({}, this.defaultOpts, this.opts)
            return opts
        },
        borderStyle() {
            const { borderWidth, borderColor } = this.opts_
            return `${borderWidth}px solid ${borderColor}`
        },
        containerStyle() {
            const { shadowColor } = this.opts_
            return {
                'box-shadow': `inset 15px -15px 20px -15px ${shadowColor}`
            }
        },
        placeholderLeftBorder() {
            return {
                'border-left': this.borderStyle
            }
        },
        slopeStyle() {
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
        titleStyle() {
            const { titleColor, titleSize, angle, titleStyle } = this.opts_
            return {
                color: titleColor,
                'font-size': titleSize + 'px',
                transform: `skewX(-${angle}deg)`,
                ...titleStyle
            }
        },
        placeholderStyle() {
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
        contentStyle() {
            const { height, shadowColor } = this.opts_
            return {
                'border-right': this.borderStyle,
                'border-bottom': this.borderStyle,
                'box-shadow': `inset -15px 0px 20px -20px ${shadowColor}`,
                height: `calc(100% - ${height}px)`
            }
        },
        cornerBorderStyle() {
            const { cornerWidth, cornerColor } = this.opts_
            return `${cornerWidth}px solid ${cornerColor}`
        },
        cornerLength() {
            const { cornerLength } = this.opts_
            return cornerLength + 'px'
        },
        cornerLtStyle() {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-left': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle
            }
        },
        cornerRtStyle() {
            const { height } = this.opts_
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-right': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle,
                top: height - 1 + 'px'
            }
        },
        cornerRbStyle() {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-right': this.cornerBorderStyle,
                'border-bottom': this.cornerBorderStyle
            }
        },
        cornerLbStyle() {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                'border-left': this.cornerBorderStyle,
                'border-bottom': this.cornerBorderStyle
            }
        }
    }
}
</script>

<style scoped>
.container {
    display: inline-block;
    overflow: hidden;
    position: relative;
    /* border-left: 1px solid #2d426d; */
    /* box-shadow: inset 15px -15px 20px -20px #94c0ef63; */
}
.left-border {
    position: absolute;
    left: 0px;
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
