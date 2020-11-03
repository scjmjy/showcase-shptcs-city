<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    created() {
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
    width: 100%;
    height: 100%;
    margin: 0px;
    overflow: auto;
    // overflow: hidden;
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

.bg-earth-left {
    position: absolute;
    left: 21px;
    top: 95px;
    width: 90px;
    height: 97px;
    background-image: url(./assets/img/earth_small.png);
    background-repeat: no-repeat;
    background-size: contain;
}
.bg-earth-right {
    position: absolute;
    left: 137px;
    top: 95px;
    width: 90px;
    height: 97px;
    background-image: url(./assets/img/earth_small.png);
    background-repeat: no-repeat;
    background-size: contain;
}

.el-pagination-custom.el-pagination {
    margin-top: 15px;
    margin-left: -6px;
    padding: 2px 0px;
    * {
        background-color: transparent!important;
    }
    .el-input__inner {
        border-color: #006C70;
        color: #006C70;
        height: 18px;
    }
    button {
        color: #07c7ce;
    }
    button:disabled {
        color: #006C70;
    }
    .btn-prev {
        padding: 0px;
    }
    .btn-next {
        padding: 0px;
    }
    .el-pagination__jump {
        margin-left: 5px;
        color: #006C70;
    }
    .el-pager li {
        min-width: 15px!important;
        padding: 0px;
        color: #006C70;
    }
    .el-pager li.active {
        color: #07c7ce;
    }
    .el-icon-arrow-left:before {
        content: "\25B2";
        transform: rotateZ(-90deg);
        display: inline-block;
    }
    .el-icon-arrow-right:before {
        content: "\25B2";
        transform: rotateZ(90deg);
        display: inline-block;
    }
}
</style>
