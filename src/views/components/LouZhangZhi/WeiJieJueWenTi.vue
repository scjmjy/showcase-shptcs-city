<template>
    <scroll-list class="scroll-list" :data="list" title="未解决问题" />
</template>

<script lang="ts">
import Vue from 'vue'
import ScrollList from '@/components/ScrollList.vue'

export default Vue.extend({
    components: { ScrollList },
    data() {
        return {
            list: [
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败',
                '问题：经济纠纷类',
                '问题：企业科技平台连接失败'
            ]
        }
    }
})
</script>
