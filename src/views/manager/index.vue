<template>
    <div class="wrapper-grid">
        <menu-left></menu-left>
        <div class="view">
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import menuLeft from "./menuLeft/menuLeft";

export default {
    name: "manager",
    components:{
        menuLeft
    }
}
</script>

<style lang="scss" scoped>
    .wrapper-grid{
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-areas: "menu_left view";
        grid-template-columns: 64px calc(100% - 64px);
    }
    .menu-left{
        grid-area: menu_left;
    }
    .view{
        grid-area: view;
        border-top-left-radius: 30px;
        background-color: #fff;
        overflow: hidden;
    }

    .page-enter-active, .page-leave-active {
        transition: opacity 400ms, transform 300ms;
    }
    .page-enter, .page-leave-to {
        opacity: 0;
        transform: translateX(-16%);
    }

</style>