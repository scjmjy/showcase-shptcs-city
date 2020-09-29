<template>
    <div class="container" :style="containerStyle">
        <div v-if="$slots.title || opts_.hasTitle" class="u-flex" :style="titleContainerStyle">
            <span v-if="!$slots.title && opts_.hasTitle" class="title" :style="titleStyle">
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

<script>
export default {
    name: 'Card',
    props: {
        opts: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        defaultOpts() {
            return {
                justify: 'center',
                align: 'center',
                hasTitle: true,
                title: '我的标题',
                titleHeight: 40,
                titleColor: '#4fb5f6',
                titleBgColor: '#10143855',
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
            const { shadowColor, hasTitle } = this.opts_
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
                'box-shadow': shadow
            }
        },
        titleContainerStyle() {
            const { titleHeight, titleBgColor, justify, align } = this.opts_
            return {
                'justify-content': justify,
                'align-items': align,
                'background-color': titleBgColor,
                height: titleHeight + 'px'
            }
        },
        titleStyle() {
            const { titleColor, titleSize, titleStyle } = this.opts_
            return {
                color: titleColor,
                'font-size': titleSize + 'px',
                ...titleStyle
            }
        },
        contentStyle() {
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
        cornerBorderStyle() {
            const { cornerWidth, cornerColor } = this.opts_
            return `${cornerWidth}px solid ${cornerColor}`
        },
        cornerLength() {
            const { cornerLength } = this.opts_
            return cornerLength + 'px'
        },
        cornerOffset() {
            const { borderWidth } = this.opts_
            return -borderWidth + 'px'
        },
        cornerLtStyle() {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                left: this.cornerOffset,
                top: this.cornerOffset,
                'border-left': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle
            }
        },
        cornerRtStyle() {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                right: this.cornerOffset,
                top: this.cornerOffset,
                'border-right': this.cornerBorderStyle,
                'border-top': this.cornerBorderStyle
            }
        },
        cornerRbStyle() {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                right: this.cornerOffset,
                bottom: this.cornerOffset,
                'border-right': this.cornerBorderStyle,
                'border-bottom': this.cornerBorderStyle
            }
        },
        cornerLbStyle() {
            return {
                width: this.cornerLength,
                height: this.cornerLength,
                left: this.cornerOffset,
                bottom: this.cornerOffset,
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
    overflow: visible;
    position: relative;
    /* border-left: 1px solid #2d426d; */
    /* box-shadow: inset 15px -15px 20px -20px #94c0ef63; */
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
    overflow: hidden;
    /* border-right: 1px solid rgb(45, 66, 109); */
    /* border-bottom: 1px solid rgb(45, 66, 109); */
    /* box-shadow: inset -15px 0px 20px -20px rgba(148, 192, 239, 0.39); */
}
.corner {
    position: absolute;
}
</style>
