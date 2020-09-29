<template>
    <card :opts="slopeOpts">
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
                title: '重点企业分析'
            }
        }
    }
})
</script>

<style>
.fr-frame {
}
</style>
