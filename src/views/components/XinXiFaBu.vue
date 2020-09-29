<template>
    <card :opts="cardOpts">
        <dv-scroll-board :config="scrollConfig" @click="onClick" style="width:620px; height:280px; display: inline-block; border-right: 1px solid #2d426d;" />
        <dv-scroll-board :config="scrollConfig" @click="onClick" style="width:620px; height:280px; display: inline-block;" />
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
                justify: 'start'
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
                index: true,
                rowNum: 6,
                align: ['center'],
                columnWidth: [50, 120],
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
                    color = 'rgb(0,255,251)'
                    break
                case '党建活动':
                    color = 'rgb(255,55,55)'
                    break
                case '招商信息':
                    color = 'rgb(255,241,10)'
                    break
            }
            return `<span style="color:${color};">【${category}】</span>`
        },
        buildTitle(title: string) {
            return `<a href="javascript:void(0)" style="color:rgb(7,184,254);">${title}</a>`
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        onClick({ row, ceil, rowIndex, columnIndex }) {
            console.log(row, ceil, rowIndex, columnIndex)
            this.$root.$emit('popup-xinxi', rowIndex)
        }
    }
})
</script>

<style></style>
