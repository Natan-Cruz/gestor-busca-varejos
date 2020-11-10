<template>
    <div class="container-spinner-loading" v-if="loading" :style="top ? `margin-top: ${top}` : '' ">
        <span class="spinner-loading"></span>
    </div>
</template>

<script>
export default {
    name:'spinner-loading',
    props: {
        loading: Boolean,
        top: {
            type: String,
            required: false,
            default: () => 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-spinner-loading{
        width:100%;
        height:50px;
        position: relative;
    }
    .spinner-loading {
        width: 40px;
        height: 40px;
        border: solid 4px transparent;
        border-bottom: solid 4px #ed1641;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        transform: rotate(0deg);
        animation: animation-reload 1250ms infinite;
        display: block;
    }

    @keyframes animation-reload {
        to {
            transform: rotate(0deg);
        }
        from {
            transform: rotate(1080deg);
        }
    }
</style>