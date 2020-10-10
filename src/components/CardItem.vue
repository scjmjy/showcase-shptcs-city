<template>
    <div class="u-col-center" style="display: inline-flex;">
        <div :style="{ 'margin-right': opts_.iconRightGap }">
            <svg-icon :icon-class="opts_.icon" :style="{ color: opts_.iconColor, width: opts_.iconWidth, height: opts_.iconHeight }" />
        </div>
        <div class="u-flex-1 u-flex-col" :style="{ padding: opts_.titlePadding }">
            <div :style="{ 'margin-bottom': opts_.valueGap }">
                <span :style="opts_.valueStyle">{{ opts_.value }}</span>
                <span :style="opts_.suffixStyle">{{ opts_.suffix }}</span>
            </div>
            <span :style="opts_.titleStyle">{{ opts_.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardItem',
    props: {
        opts: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        defaultOpts() {
            return {
                icon: 'dolar',
                iconWidth: '42px',
                iconHeight: '42px',
                iconRightGap: '10px',
                iconColor: 'rgb(0,218,213)',
                value: 0,
                valueStyle: {
                    'font-size': '26px',
                    color: 'white',
                    'margin-right': '2px'
                },
                suffix: '-',
                suffixStyle: {
                    'font-size': '20px',
                    color: 'white',
                    'margin-top': '-10px'
                },
                valueTitleGap: '10px',
                title: '我的标题',
                titlePadding: '0px',
                titleStyle: {
                    color: '#00F6FF',
                    'font-size': '13px'
                }
            }
        },
        opts_() {
            const opts = Object.assign({}, this.defaultOpts, this.opts)
            if (this.opts.iconStyle) {
                const iconStyle = Object.assign({}, this.defaultOpts.iconStyle, this.opts.iconStyle)
                opts.iconStyle = iconStyle
            }
            if (this.opts.valueStyle) {
                const valueStyle = Object.assign({}, this.defaultOpts.valueStyle, this.opts.valueStyle)
                opts.valueStyle = valueStyle
            }
            if (this.opts.suffixStyle) {
                const suffixStyle = Object.assign({}, this.defaultOpts.suffixStyle, this.opts.suffixStyle)
                opts.suffixStyle = suffixStyle
            }
            if (this.opts.titleStyle) {
                const titleStyle = Object.assign({}, this.defaultOpts.titleStyle, this.opts.titleStyle)
                opts.titleStyle = titleStyle
            }
            return opts
        }
    }
}
</script>

<style></style>
