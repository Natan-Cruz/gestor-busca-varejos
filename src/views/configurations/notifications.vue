<template>
    <div class="wrapper wrapper-notification">
        <p class="sub-title">Notificações</p>
        <!--  -->
        <p class="text-medium" style="margin-top:10px">Ative as notificações para receber nosso alerta quando um pedido por realizado por um cliente. Isso é de extrema importância</p>
        <!--  -->
        <div class="container-checkbox">
            <div class="background-loading" :style="is_loading ? 'display:block': 'display:none' "></div>
            <label for="switch-flat_01" class="label-text-switch text-medium bold" style="padding:7px 5px"> {{ label }} </label>
            <div class="switch__container">
                <input id="switch-flat_01" class="switch switch--flat" type="checkbox" v-model="is_checked_notification" @change="toggleCheckbox">
                <label for="switch-flat_01"></label>
            </div>
        </div>
    </div>
</template>

<script>
import { requestPermission, deleteToken, isTokenSentToServer } from "../../firebase/messaging";
import messagePopup from '@/components/message-popup/message-popup';

export default {
    name: "wrapper-notifications",
    computed:{
        label(){
            if(this.is_loading)
                return "Carregando...";
            else    
                if(this.is_checked_notification)
                    return "Habilitadas";
                else    
                    return "Desabilidados";
        }
    },
    data(){
        return{ 
            is_checked_notification:false,
            is_loading: false
        }
    },
    created(){
        const sentToServer = isTokenSentToServer();
        this.is_checked_notification = sentToServer;
        if(sentToServer === true && sentToServer === false)
            return
            
    },
    methods:{
        clickBackgroundModal(evt){
            if( evt.target.classList.contains('modal-orders-settings') )
                this.$emit('event-close-modal')
        },
        toggleCheckbox(e){
            const is_cheked = e.target.checked
            if(is_cheked){
                this.is_loading = true;
                  requestPermission()
                    .then( () => {
                        this.is_checked_notification = true
                        messagePopup("Preferência de notificação salva com sucesso!", 3500);
                    })
                    .catch( error => {
                        console.error(error)
                        messagePopup("Não foi possivel salvar a preferencia de notificação!", 3500);
                        this.is_checked_notification = false
                    })
                    .finally( () => {
                        this.is_loading = false;
                    })
            }else{
                this.is_loading = true;
                deleteToken()
                    .then(  () => {
                        this.is_checked_notification = false
                        messagePopup("Preferência salva! Notificação desabilitada", 3500);
                    })
                    .catch( () => {
                        messagePopup("Não foi possivel desabilitar as notificaçôes! Por favor tente novamente", 3500);
                        this.is_checked_notification = true
                    })
                    .finally( () => {
                        this.is_loading = false;
                    })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-checkbox{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        margin-top: 10px;
    }
    .background-loading{
        width:100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        background-color: rgba(204, 204, 204, 0.25);
        z-index: 1000;
    }
</style>