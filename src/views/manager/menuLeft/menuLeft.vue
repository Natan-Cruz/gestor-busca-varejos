<template>
    <div class="menu-left">
        <div class="background-menu-left"></div>
        <div class="content-menu-left">
            <icon-avatar :user=user.data ></icon-avatar>
            <hr>
            <nav-bar></nav-bar>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import iconAvatar from "./iconAvatar";
import navBar from "./navBar";

export default {
    name: "menu-left",
    components:{        
        iconAvatar,
        navBar
    },
    computed:{
        ...mapGetters({
            user: "user/user"
        })
    }
}
</script>

<style lang="scss" scoped>
    .menu-left{
        width: 100%;
        height: 100vh;
        position: relative;
    }
    .background-menu-left{
        width: 100px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index:-10;
        background-color: rgba(237, 22, 65, 0.3);
        background: linear-gradient(200deg, rgba(253,132,43,0.7) 0%, rgba(237,22,65,0.7) 100%);
        filter:  grayscale(5%) contrast(180%) brightness(110%)
    }
    .content-menu-left{
        height: 100%;
        overflow: hidden;
    }

    hr{
        border: dashed 1px #fff;
        opacity: 0.4;
    }
</style>