<template>
    <popup
        icon="楼宇总数"
        iconColor="#00FFFB"
        :name="name"
        :value="value"
        label="楼宇名称"
        :title="louYu.name"
        position="bottom-right"
        @input="emitEvent('input', $event)"
    >
        <div class="content">
            <qi-ye-pages :id="id" />
        </div>
    </popup>
</template>

<script lang="ts">
import Vue from 'vue'
import Popup from '@/components/popup/Popup.vue'
import QiYePages from './components/QiYePages.vue'
import { mapState } from 'vuex'
import { LouYu, State } from '@/store/state'

export default Vue.extend({
    name: 'LouYuPopup',
    components: { Popup, QiYePages },
    props: {
        name: {
            type: String,
            default: '',
        },
        // 楼宇 id
        id: {
            type: Number,
            default: -1,
        },
        value: {
            type: Boolean,
            default: false,
        },
        louYuName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            louYuList: state => (state as State).louYuList,
        }),
        louYu(): LouYu {
            if (this.id === -1) {
                return new LouYu()
            } else {
                return this.louYuList.find(l => l.id === this.id) || new LouYu()
            }
        },
    },
    methods: {
        emitEvent(evName: string, evArg: any) {
            this.$emit(evName, evArg)
        },
    },
})
</script>

<style lang="scss" scoped>
.content {
    margin-top: 20px;
    border: 1px solid rgb(0, 99, 167);
    padding: 20px 25px;
    width: 450px;
}
</style>
