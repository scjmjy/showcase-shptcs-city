<template>
    <div class="container">
        <div v-for="(item, index) of items" :key="index" class="item">
            <svg-icon :icon-class="item.icon" class="icon" :style="iconStyle(item)" />
            <span class="text">{{ item.text }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export type Item = {
    icon: string
    iconColor?: string
    text: string
    textColor?: string
}

export default Vue.extend({
    components: { SvgIcon },
    props: {
        items: {
            type: Array as PropType<Item[]>,
            default: () => []
        }
    },
    methods: {
        iconStyle(item) {
            return {
                color: item.iconColor ? item.iconColor : 'white'
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.container {
    .item {
        margin-bottom: 2px;
    }
    .icon {
        margin-right: 5px;
    }
    .text {
        color: #00F6FF;
        font-size: 16px;
    }
}
</style>
