<template>
    <div class="container-msg-error" v-if="msg">
        <p class="text-error">
            {{ msg }}
        </p>
        <button class="button button-second text-medium " 
            @click.once="$emit('event-retry')" v-if=retry >
            Tentar novamente
        </button>
    </div>
</template>

<script>
export default {
    name:"message-error",
    props:{
        msg: String,
        retry: Boolean
    }
}
</script>

<style lang="scss" scoped>
    .container-msg-error{
        width: 80%;
        margin: 0 auto;
    }
    .text-error{
        margin: {
            top:30px;
            bottom:20px
        }
        text-align: center;
        font-size: 1.7em;
    }
    
</style>