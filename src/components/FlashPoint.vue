<template>
    <div class="flash-point-container" :style="containerStyle">
        <div class="outer-point"></div>
        <div class="inner-point"></div>
    </div>
</template>

<script>
export default {
    name: 'FalshPoint',
    props: {
        width: {
            type: Number,
            default: 60
        },
        height: {
            type: Number,
            default: 60
        },
        rotate: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        containerStyle() {
            const { width, height } = this
            return {
                width: width + 'px',
                height: height + 'px',
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes ani-scale {
  from { transform: scale(0); }
  to   { transform: scale(1);  }
}
.flash-point-container {
    position: relative;
    transform: rotateX(45deg);
    .outer-point {
        width: 100%;
        height: 100%;
        background-image: radial-gradient(transparent 0%, #00BCF8AA 100%);
        border-radius: 50%;
        animation: 3s cubic-bezier(0, 0.65, 0.57, 0.88) 2s ani-scale infinite;
    }

    .inner-point {
        position: absolute;
        // left: 25%;
        // top: 25%;
        // width: 50%;
        // height: 50%;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-image: radial-gradient(transparent 0%, #00BCF8AA 100%);
        animation: 3s cubic-bezier(0, 0.65, 0.57, 0.88) 0s ani-scale infinite;
    }
}
</style>