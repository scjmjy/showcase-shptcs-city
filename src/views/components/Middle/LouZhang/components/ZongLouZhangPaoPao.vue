<template>
    <div class="pao-pao-container">
        <div class="left-side">
            <div class="louzhang-name">{{ '总楼长：' + data.name }}</div>
            <div class="louzhang-data"></div>
            <img class="pao-pao-avatar" :src="avatarUrl" />
        </div>
        <div class="right-side">
            <span>无数据</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import FlashPoint from '@/components/FlashPoint.vue'

type PaoPaoPropType = {
    name: string
}
/**
 * 楼长泡泡对话框组件
 */
export default Vue.extend({
    name: 'ZongLouZhangPaoPao',
    props: {
        avatar: {
            type: String,
            default: '总楼长1.png'
        },
        data: {
            type: Object as PropType<PaoPaoPropType>,
            default: () => ({
                name: '总楼长姓名'
            })
        }
    },
    computed: {
        avatarUrl() {
            return require('../../../../../assets/img/' + this.avatar)
        }
    }
})
</script>

<style lang="scss" scoped>
.pao-pao-container {
    background-image: url('../../../../../assets/img/paopao.png');
    width: 280px;
    height: 143px;
    cursor: pointer;
    transition: all 0.3s;
    padding: 14px;

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
            // text-shadow: 0 0 5px white;
        }

        .louzhang-data {
            margin-top: 20px;
        }
    }
    .right-side {
        width: 40%;
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        color: #00f6ff;
    }

    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(1.1) translate(2px, 2px);
    }
}
</style>