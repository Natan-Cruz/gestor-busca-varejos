<template>
    <div class="container-avatar"> 
        <img :src="`https://api.buscavarejos.com${(user.photoURL) ? user.photoURL : ''}`" :alt="user.name" :title="user.name">
    </div>
</template>

<script>

export default {
    name: 'icon-avatar',
    props:{
        user:{
            type:Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-avatar{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        overflow: hidden;
        user-select: none;
        margin: 20px auto 10px auto;
        img{
            width: 100%;
        }
    }
</style>