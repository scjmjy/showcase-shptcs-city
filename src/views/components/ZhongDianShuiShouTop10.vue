<template>
    <card :opts="cardOpts" @click="onTitleClick">
        <scroll-list class="list" level :data="top10" @click="openDetailPopup" />
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import { State } from '@/store/state'
import Card from '@/components/Card.vue'
import ScrollList from '@/components/ScrollList.vue'

export default Vue.extend({
    components: { Card, ScrollList },
    props: {},
    computed: {
        top10(): string[] {
            const top10 = (this.$store.state as State).ZhongDianShuiShouTop10
            return top10.sort((a, b) => b.value - a.value).map(item => item.name)
        },
        cardOpts(): any {
            return {
                title: '重点企业税收Top10',
                clickable: true,
            }
        },
    },
    methods: {
        onTitleClick() {
            this.$root.$emit('map-shuishoutop10')
        },
        openDetailPopup({ item }) {
            this.$root.$emit('popup-zhongdian-qiye', { name: item })
        },
    },
})
</script>

<style></style>
