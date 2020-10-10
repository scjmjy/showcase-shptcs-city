<template>
    <card :opts="slopeOpts" @click="onTitleClick">
        <iframe
            class="fr-frame"
            src="http://localhost:8075/webroot/decision/view/form?viewlet=rotary_gear.frm"
            width="628px"
            height="238px"
            frameborder="0"
        ></iframe>
    </card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
export default Vue.extend({
    components: { Card },
    computed: {
        slopeOpts() {
            return {
                hoverable: true,
                title: '重点企业分析'
            }
        }
    },
    methods: {
        onTitleClick() {
            alert('重点企业分析 click')
        }
    }
})
</script>

<style>
.fr-frame {
}
</style>
