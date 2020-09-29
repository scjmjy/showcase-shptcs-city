<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('requestAll')
    }
}
</script>

<style>
html,
body,
#app {
    width: 3840px;
    height: 1080px !important;
}

#app {
    /* background-image: url('./assets/img/bg.png'); */
    background-color: rgb(21, 24, 30);
}
</style>
