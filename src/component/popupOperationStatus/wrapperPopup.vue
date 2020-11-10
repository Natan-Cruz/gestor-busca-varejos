<template>
    <transition name="fade">
        <div class="wrapper-popup" v-show="open">
            <div class="background" @click="$emit('event-close-popup')" ></div>
            <div class="content">
                <span class="span-refresh" @click="$emit('event-refresh')"> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                    </svg>
                </span>
                <div>
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
                <button class="button button-primary text-medium" style="margin: 20px 0 10px 0" @click="toggleStatusEstablishment" >
                    <span class="sub-text" v-if="statusOperation.in_operation" >Fechar estabelecimento</span>
                    <span class="sub-text" v-else>Abrir estabelecimento</span>
                </button>
                <button class="button button-second text-medium" @click="openEditHoursInBrowser">Editar horários</button>
            </div>
        </div>
    </transition>
</template>

<script>
import { shell } from 'electron'
import Axios from "axios";
import messagePopup from "@/components/message-popup/message-popup";

export default {
    name: "wrapper-popup",
    props:{
        open:{
            type: Boolean
        },
        uid: {
            type: String
        },
        statusOperation:{
            type: Object
        },
        isLoading:{
            type: Boolean
        },
        error:{
            type: String
        }
    },
    data(){
        return{
            is_closed: false
        }
    },
    methods:{
        async toggleStatusEstablishment(){
            const is_checked = this.statusOperation.in_operation;
            try {        
                const url = "https://api.buscavarejos.com/estabelecimentos/configuracoes/operations"
                
                await Axios.post(url,{
                    in_operation: is_checked ? 0 : 1
                }, 
                {
                    headers:{
                        "uid": this.uid
                    }
                })
                if(!is_checked)
                    messagePopup("Estabelecimento aberto!")
                else
                    messagePopup("Estabelecimento fechado!")

                this.$emit('event-refresh')
            } catch (error) {
                this.isCheckedComputed = is_checked ? false : true;
                messagePopup("Ops, ocorreu um problema! Tente novamente")
            }            
        },
        openEditHoursInBrowser(){
            shell.openExternal("https://loja.buscavarejos.com/horarios")
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper-popup{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 200;
    }
    .background{
        width: 100%;
        height: 100vh;
        background-color: rgba($color: #000000, $alpha: 0.4);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2000;
    }
    .content{
        width: auto;
        height: auto;
        background-color: #fff;
        border-radius: 5px;
        padding: 20px;
        position: absolute;
        top: 14px;
        right: 16px;
        z-index: 3000;
    }

    
    // refresh icon
    .span-refresh{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 14px;
        right: 20px;
        transition: 250ms ease-in-out;
        cursor: pointer;
        &:hover{
            transform: rotate(-30deg);
        }
    }
    .button{
        width: 100%;
        min-width: 210px;
        height: 46px;
        cursor: pointer;
    }

    .ctn-status{
        text-align: left;
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
        margin-top: 5px;
        height: 33px;
        position: relative;
    }
    .text-status-explanation{
        background-color: #ed1641 ;
        color: #fff;
        font-size: 1.5em;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .fade-enter-active, .fade-leave-active {
       transition: opacity 200ms;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
        opacity: 0;
    }
</style>