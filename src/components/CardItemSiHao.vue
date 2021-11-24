<template>
    <div class="u-col-center" style="display: inline-flex;">
        <div :style="{ 'margin-right': opts_.iconRightGap }">
            <svg-icon :icon-class="opts_.icon" :style="{ color: opts_.iconColor, width: opts_.iconWidth, height: opts_.iconHeight }" />
        </div>
        <div class="u-flex-1 u-flex-col description" :style="{ padding: opts_.titlePadding }">
            <div>{{ description }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardItemSiHao',
    props: {
        opts: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            description: '全国“四好”商会\n全国商会党建示范单位\n全国工商联抗击新冠肺炎疫情先进商会组织',
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
            }
        },
        opts_() {
            const opts = Object.assign({}, this.defaultOpts, this.opts)
            if (this.opts.iconStyle) {
                const iconStyle = Object.assign({}, this.defaultOpts.iconStyle, this.opts.iconStyle)
                opts.iconStyle = iconStyle
            }
            return opts
        },
    },
}
</script>

<style scoped lang="scss">
.description {
    white-space: pre-line;
    color: white;
    font-size: 13px;
}
</style>
