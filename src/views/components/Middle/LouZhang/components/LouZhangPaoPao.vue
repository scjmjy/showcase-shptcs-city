<template>
    <div class="pao-pao-container" :style="containerStyle">
        <div class="left-side">
            <div class="louzhang-name">{{ '楼长：' + data.name }}</div>
            <div class="louzhang-data">
                <div>{{ '负责企业数：' + data.qiYeShu }}</div>
                <div>{{ '负责楼宇数：' + data.louYuShu }}</div>
                <div>{{ '税收60万以上企业数：' + data.qiYeShu60 }}</div>
                <div>{{ '走访次数：' + data.zouFang }}</div>
                <div>{{ '未解决问题数：' + data.weiJieJue }}</div>
            </div>
        </div>
        <div class="right-side"></div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import FlashPoint from '@/components/FlashPoint.vue'

type PaoPaoPropType = {
    name: string
    qiYeShu: number
    louYuShu: number
    qiYeShu60: number
    zouFang: number
    weiJieJue: number
}
/**
 * 楼长泡泡对话框组件
 */
export default Vue.extend({
    name: 'LouZhangPaoPao',
    props: {
        type: {
            type: String,
            default: '' // br / bl ...
        },
        data: {
            type: Object as PropType<PaoPaoPropType>,
            default: () => ({
                name: '楼长姓名',
                qiYeShu: 0,
                louYuShu: 0,
                qiYeShu60: 0,
                zouFang: 0,
                weiJieJue: 0
            })
        }
    },
    computed: {
        containerStyle() {
            const { type } = this
            let padding, background, width, height
            switch (type) {
                case 'bl':
                    width = '280px'
                    height = '155px'
                    padding = '15px 14px 25px 14px'
                    background = 'paopao-bl.png'
                    break
                case 'br':
                    width = '280px'
                    height = '155px'
                    padding = '15px 14px 25px 14px'
                    background = 'paopao-br.png'
                    break
                case 'tl':
                    width = '280px'
                    height = '155px'
                    padding = '25px 14px 15px 14px'
                    background = 'paopao-tl.png'
                    break
                case 'tr':
                    width = '280px'
                    height = '155px'
                    padding = '25px 14px 15px 14px'
                    background = 'paopao-tr.png'
                    break
                case 'lt':
                    width = '296px'
                    height = '147px'
                    padding = '15px 14px 15px 24px'
                    background = 'paopao-lt.png'
                    break
                case 'lb':
                    width = '296px'
                    height = '147px'
                    padding = '15px 14px 15px 24px'
                    background = 'paopao-lb.png'
                    break
                case 'rt':
                    width = '296px'
                    height = '147px'
                    padding = '15px 24px 15px 14px'
                    background = 'paopao-rt.png'
                    break
                case 'rb':
                    width = '296px'
                    height = '147px'
                    padding = '15px 24px 15px 14px'
                    background = 'paopao-rb.png'
                    break
                default:
                    throw new Error('无效的 type：' + type)
            }
            const url = require('../../../../../assets/img/' + background)
            return {
                width,
                height,
                padding,
                background: `url(${url})`
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.pao-pao-container {
    cursor: pointer;
    transition: all 0.3s;

    .left-side,
    .right-side {
        display: inline-block;
        height: 100%;
        vertical-align: top;
    }
    .left-side {
        width: 60%;

        .louzhang-name {
            font-size: 16px;
            font-weight: bold;
            color: white;
            text-shadow: 0 0 5px white;
        }

        .louzhang-data {
            font-size: 11px;
            color: #00f6ff;

            & > div {
                margin-top: 2px;
            }
        }
    }
    .right-side {
        width: 40%;
    }

    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(1.1) translate(2px, 2px);
    }
}
</style>