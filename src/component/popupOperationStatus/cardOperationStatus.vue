<template>
    <div class="ctn-card-status">
        <span class="span-refresh" @click="$emit('event-refresh')"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
        </span>
        <div class="wrapper" @click="$emit('event-open-popup')">
            <p class="text-medium" v-if="isLoading">Carregando...</p>
            <p class="text-medium" v-else-if="error">{{ error }}</p>
            <div v-if="!error && !isLoading"> 
                <div class="ctn-status">
                    <span class="text-medium bold" style="color:#404040">Status:</span>
                    <span class="text-medium bold text-status" :class="{ 'open-establishment': statusOperation.isOpen, 'closed-establishment': !statusOperation.isOpen }"> {{ statusOperation.isOpen ? "Aberto" : "Fechado" }} </span>
                </div>
                <div class="container-text-status" v-if="statusOperation.hours && statusOperation.in_operation" >
                    <p class="bold text-status-explanation"> <span class="sub-text">&#9888;</span> Fechado devido ao horário</p>   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "card-operation-status",
    props:{
        statusOperation:{
            type: Object
        },
        isLoading:{
            type: Boolean
        },
        error:{
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
    .ctn-card-status{
        // width: 3px;
        position: relative;
        padding: 0 20px;
       
    }
    // refresh icon
    .span-refresh{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 6px;
        right: 10px;
        transition: 250ms ease-in-out;
        cursor: pointer;
        &:hover{
            transform: rotate(-30deg);
        }
    }
    .wrapper{
        width: auto;
        height: auto;
        min-height: 40px;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 5px 10px;
        border-radius: 5px;
        margin-right: 20px;
        cursor: pointer !important;
        &:hover{
            box-shadow: 1px 1px 4px -1px rgba($color: #000000, $alpha: 0.4);
            cursor: pointer;
        }
    }
    .ctn-status{
        text-align: right;
    }
    .open-establishment{
        color: #00a000;
        text-align: right;
    }
    .closed-establishment{
        width: 100%;
        color: #ed1641;
        text-align: right;
    }
    .container-text-status{
        height: auto;
        position: relative;
    }
    .text-status-explanation{
        background-color: #ed1641 ;
        color: #fff;
        font-size: 1.5em;
        line-height: 1em;
        padding: 5px 10px;
        border-radius: 5px;
    }
</style>