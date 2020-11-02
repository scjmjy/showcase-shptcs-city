<template>
    <popup :value="value" :name="name" :label="xinXi.category" :labelColor="labelColor" :title="xinXi.title" position="bottom" @input="emitEvent('input', $event)">
        <div class="content">
            <img class="xinxi-image" :src="xinXi.img" />
            <div class="xinxi-content">{{ xinXi.content }}</div>
        </div>
    </popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapState } from 'vuex'
import { State, XinXi } from '@/store/state'
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
        labelColor: {
            type: String,
            default: 'white'
        },
        xinXi: {
            type: Object as PropType<XinXi>,
            default: () => new XinXi()
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            xinXiOrigin: state => {
                return (state as State).xinXi
            }
        })
    },
    mounted() {
        console.log('LouZhangPopup mounted')
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
