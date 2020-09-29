<template>
    <popup :value="value" :title="`${xinxi.category}：${xinxi.title}`" position="bottom" @input="emitEvent('input', $event)">
        <div class="content">
            <img class="xinxi-image" :src="xinxi.img" />
            <div class="xinxi-content">{{ xinxi.content }}</div>
        </div>
    </popup>
</template>

<script lang="ts">
import Vue from 'vue'
import Popup from '@/components/Popup.vue'
import api from '@/store/api'

export default Vue.extend({
    name: 'XinXiFaBuPopup',
    components: { Popup },
    props: {
        id: {
            type: Number,
            default: -1
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            xinxi: {
                category: '',
                title: '',
                img: '',
                content: ''
            }
        }
    },
    mounted() {
        console.log('LouZhangPopup mounted')
        api.getXinXiDetail(this.id)
            .then((res: any) => {
                this.xinxi = res
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        emitEvent(evName: string, evArg: any) {
            this.$emit(evName, evArg)
        }
    }
})
</script>

<style lang="scss" scoped>
.content {
    border: 1px solid rgb(0, 99, 167);
    display: flex;

    .xinxi-image {
        width: 300px;
        height: 200px;
        margin-right: 10px;
        overflow: hidden;
    }
    .xinxi-content {
        width: 820px;
        height: 200px;
        font-weight: bold;
        color: rgb(12, 182, 255);
    }
}
</style>
