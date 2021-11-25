<template>
    <popup :name="name" :value="value" icon="楼宇总数" iconColor="#00FFFB" label="企业名称" :title="qiYeName" @input="emitEvent('input', $event)">
        <div class="content">
            <div class="content-title">
                该企业存在以下风险
            </div>
            <item-list :items="detailItems" />
            <el-pagination
                class="el-pagination-custom"
                :current-page="currentPage"
                :page-size="1"
                layout="prev, pager, next, jumper"
                :total="top10.length"
                @current-change="gotoPage"
                :small="true"
            >
            </el-pagination>
        </div>
    </popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Popup from '@/components/popup/Popup.vue'
import { State } from '@/store/state'
import ItemList, { Item } from './CityMap/components/ItemList.vue'
import { mapState } from 'vuex'

export default Vue.extend({
    name: 'FengxianQiYePopup',
    components: { Popup, ItemList },
    props: {
        name: {
            type: String,
            default: '',
        },
        qiYeName: {
            type: String,
            default: '',
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            detail: {
                louYu: '',
                qiYe: '',
                louZhang: '',
                category: '',
                date: '',
                content: '',
            },
        }
    },
    computed: {
        ...mapState({
            top10: state => (state as State).zhongDianFengxianTop10,
        }),
        currentPage(): number {
            return this.top10.findIndex(item => item.name === this.qiYeName) + 1
        },
        detailItems(): Item[] {
            const found = this.top10.find(item => item.name === this.qiYeName)
            const separator = '；'
            const notes = found?.notes.split(separator) || []
            return notes.map((item, index) => ({
                icon: 'number-' + (index + 1),
                iconColor: '#00D98B',
                text: item + (index === notes.length - 1 ? '' : separator),
            }))
        },
    },
    methods: {
        emitEvent(evName: string, evArg: any) {
            this.$emit(evName, evArg)
        },
        gotoPage(page: number) {
            const qiye = this.top10[page - 1]
            this.$emit('update:qiYeName', qiye.name)
        },
    },
})
</script>

<style lang="scss" scoped>
.content {
    min-width: 520px;
    // height: 220px;
    margin: 15px 5px 5px 5px;
    padding: 15px 45px 35px 45px;
    border: 1px solid rgb(0, 99, 167);
    &-title {
        color: white;
        margin-left: 20px;
        margin-bottom: 5px;
    }
}
</style>
