<template>
    <card :opts="cardOpts">
        <dv-scroll-board :config="scrollConfig" @click="onClick" style="width:610px; height:280px; display: inline-block; border-right: 1px solid #2d426d;" />
        <dv-scroll-board :config="scrollConfig" @click="onClick" style="margin-left: 20px; width:610px; height:280px; display: inline-block;" />
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'

export default Vue.extend({
    components: { Card },
    computed: {
        cardOpts(): any {
            return {
                title: '信息发布',
                justify: 'start',
                titleStyle: { 'margin-left': '20px' }
            }
        },
        xinXiFaBu(): any {
            const xinXiFaBu: any[] = []
            const origin = this.$store.state.xinXiFaBu
            origin.forEach((info: any) => {
                const row = []
                row.push(this.buildCategory(info.category))
                row.push(this.buildTitle(info.title))
                xinXiFaBu.push(row)
            })
            return xinXiFaBu
        },
        scrollConfig(): any {
            return {
                data: this.xinXiFaBu,
                // index: true,
                rowNum: 6,
                align: ['center'],
                // columnWidth: [40, 140],
                columnWidth: [130],
                evenRowBGC: 'transparent',
                oddRowBGC: 'transparent'
            }
        }
    },
    methods: {
        buildCategory(category: string) {
            let color = 'white'
            switch (category) {
                case '政策信息':
                    color = '#00FFFB'
                    break
                case '党建活动':
                    color = '#FF3838'
                    break
                case '招商信息':
                    color = '#FFF10B'
                    break
                default :
                    color = 'white'
                    break
            }
            return `<span style="color:${color}; font-size: 18px;">【${category}】</span>`
        },
        buildTitle(title: string) {
            return `<div class="linkable" style="color: #0BB7FF; font-size: 18px;">${title}</div>`
        },
        onClick({ row, ceil, rowIndex, columnIndex }: any) {
            console.log(row, ceil, rowIndex, columnIndex)
            this.$root.$emit('popup-xinxi', rowIndex)
        }
    }
})
</script>

<style lang="scss">

</style>
