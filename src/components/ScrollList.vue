<template>
    <div class="container">
        <div class="title">{{ title }}</div>
        <ul class="list-group">
            <li v-for="(item, i) of data" :key="i" class="list-item" :style="itemStyle(item, i)" @click="emitClick(item, i)">{{ item }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        title: {
            type: String,
            default: '我的标题'
        },
        data: {
            type: Array,
            default: () => []
        },
        markerColor: {
            type: String,
            default: 'red'
        },
        textColor: {
            type: String,
            default: 'rgb(0, 247, 255)'
        }
    },
    mounted() {
        console.log('scroll list mounted')
    },
    beforeDestroy() {
        console.log('scroll list beforeDestroy')
    },
    methods: {
        itemStyle(item: any, index: number) {
            if (index % 2 === 0) {
                return { 'background-color': 'rgb(255, 255, 255, 0.05)' }
            } else {
                return {}
            }
        },
        emitClick(item: any, index: number) {
            this.$emit('click', { item, index })
        }
    }
})
</script>

<style scoped>
.container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.title {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
    text-shadow: 0 0 5px white;
}
.list-group {
    overflow-x: hidden;
    overflow-y: auto;
    list-style-type: none;
    padding-inline-start: 0px;
    margin-block-start: 0px;
    margin-block-end: 0px;
    border: 1px solid rgb(46, 69, 101);
}
.list-item {
    color: rgb(0, 247, 255);
    padding: 0px 15px;
    line-height: 35px;
    vertical-align: middle;
}
.list-item::before {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 10px;
    background: radial-gradient(rgb(254, 209, 4), rgba(254, 209, 4, 0.6));
    transform: rotate(45deg);
    box-shadow: 0 0 10px 1px rgb(254, 209, 4);
    content: '';
}
.list-item:hover {
    text-decoration: underline;
    cursor: pointer;
}
.list-item:active {
    transform: translate(2px, 2px);
}
</style>
