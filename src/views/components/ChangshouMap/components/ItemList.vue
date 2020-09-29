<template>
    <div class="container">
        <div v-for="(item, index) of items" :key="index" class="item">
            <svg-icon :icon-class="item.icon" class="icon" />
            <span class="text">{{ item.text }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export type Item = {
    icon: string
    text: string
}

export default Vue.extend({
    components: { SvgIcon },
    props: {
        items: {
            type: Array as PropType<Item[]>,
            default: () => []
        }
    }
})
</script>

<style></style>
