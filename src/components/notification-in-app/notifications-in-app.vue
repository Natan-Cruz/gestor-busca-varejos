<template>
    <div class="notification-in-app">
        <div class="content-notification-in-app">
            <p class="text-title">Você tem um novo pedido <span class="sub-text bold code-order">#20</span></p>
            <router-link v-bind:to="'/pedidos'" class="button button-primary text-medium btn-acompanhar" style="margin:20px 0;">Acompanhar</router-link>
            <button class="button button-second text-medium button-exit-modal">Ok, fechar</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'notification-in-app'
}
</script>

<style lang="scss" scoped>
    .notification-in-app {
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .4);
        display: none;
        opacity: 0;
        transition: 50ms;
        z-index: 3000;
    }

    .display-modal_flex {
        display: flex;
    }

    .show-modal {
        opacity: 1;
    }

    .content-notification-in-app{
        width: 100%;
        height: auto;
        background: #fff;
        border-radius: 5px;
        transition: 200ms;
        transform: scale(.8);
        position: relative;
        margin:0 20px;
        padding:20px;
    }

    .show-content-modal {
        transform: scale(1)
    }
    // 
    .text-title{
        font-size:2em;
        text-align: center;
    }
</style>