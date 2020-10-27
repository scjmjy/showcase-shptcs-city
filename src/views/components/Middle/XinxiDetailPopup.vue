<template>
    <popup :value="value" :name="name" :title="xinxi.title" position="bottom" @input="emitEvent('input', $event)">
        <div class="content">
            <img class="xinxi-image" :src="xinxi.img" />
            <div class="xinxi-content">{{ xinxi.content }}</div>
        </div>
    </popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Popup from '@/components/popup/Popup.vue'
import api from '@/store/api'

export default Vue.extend({
    name: 'XinxiDetailPopup',
    components: { Popup },
    props: {
        name: {
            type: String,
            default: ''
        },
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
    padding-top: 25px;
    display: flex;

    .xinxi-image {
        width: 300px;
        height: 200px;
        overflow: hidden;
        vertical-align: top;
    }
    .xinxi-content {
        margin-left: 24px;
        width: 820px;
        // height: 200px;
        font-size: 18px;
        font-weight: bold;
        color: rgb(12, 182, 255);
        vertical-align: top;
    }
}
</style>
