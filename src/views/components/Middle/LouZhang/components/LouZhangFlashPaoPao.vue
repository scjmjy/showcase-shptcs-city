<template>
    <div class="louzhang-pao-pao-container">
        <div :class="'type-' + type">
            <lou-zhang-pao-pao class="pao-pao" :type="type" :data="data" />
            <div class="flash-container">
                <flash-point class="pao-pao-flash-point" />
                <img class="pao-pao-avatar" :src="avatarUrl" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FlashPoint from '@/components/FlashPoint.vue'
import LouZhangPaoPao from './LouZhangPaoPao.vue'
/**
 * 楼长泡泡对话框组件
 */
export default Vue.extend({
    name: 'LouZhangFlashPaoPao',
    components: { FlashPoint, LouZhangPaoPao },
    props: {
        avatar: {
            type: String,
            default: '楼长1.png'
        },
        type: {
            type: String,
            default: 'bl'
        },
        data: {
            type: Object,
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
        avatarUrl() {
            return require('../../../../../assets/img/' + this.avatar)
        }
    }
})
</script>

<style lang="scss" scoped>
.louzhang-pao-pao-container {
    // width: 280px;
    // height: 240px;
    position: relative;

    .flash-container {
        position: absolute;
        .pao-pao-avatar {
            position: absolute;
            width: 46px;
            height: 56px;
        }
        .pao-pao-flash-point {
            position: absolute;
            left: -7px;
            top: 26px;
        }
    }
    .type-bl {
        .pao-pao {
        }

        .flash-container {
            margin-left: 43px;
            margin-top: 3px;
        }
    }
    .type-br {
        .pao-pao {
        }
        .flash-container {
            margin-left: 193px;
            margin-top: 3px;
        }
    }

    .type-lt {
        .pao-pao {
            position: absolute;
            left: 55px;
        }
        .flash-container {
            margin-top: 20px;
        }
    }
    .type-tl {
        .pao-pao {
            position: absolute;
            top: 80px;
        }
        .flash-container {
            margin-left: 43px;
        }
    }
    .type-tr {
        .pao-pao {
            position: absolute;
            top: 80px;
        }
        .flash-container {
            margin-left: 193px;
        }
    }
}
</style>