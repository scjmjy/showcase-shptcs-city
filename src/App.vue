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

<style lang="scss">
* {
    box-sizing: border-box;
}
html,
body,
#app {
    width: 3840px;
    height: 1080px !important;
}

#app {
    background-color: rgb(21, 24, 30);
    /* background-color: black; */
}

/** Card title hoverable */
.hoverable {
    transition: all 0.1s ease-in;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(1.1) translate(2px, 2px);
    }
}

.linkable {
    transition: all 0.1s ease-in;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    &:active {
        text-decoration: underline;
        transform: translate(2px, 2px);
    }
}

.card-item {
    width: 185px;
}
.card-item + .card-item {
    margin-left: 30px;
}
</style>
