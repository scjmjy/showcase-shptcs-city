<template>
    <div class="container">
        <div class="card" style="left: 0px; top: 0px;" @click="move($event.target)"></div>
        <div class="card" style="right: 0px; bottom: 0px;" @click="move($event.target)"></div>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        move(el: HTMLElement) {
            el.className = 'card center'
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
}

.card {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: red;
}

.center {
    left: 50% !important;
    top: 50% !important;
    width: 80px;
    height: 80px;
    transition: all 3s;
}
</style>
