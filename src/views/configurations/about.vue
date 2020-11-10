<template>
    <div class="wrapper-about">
        <p class="sub-title">Sobre</p>
        <div class="row">
            <div class="ctn-image">
                <img src="../../assets/logo-draw.png" alt="">
            </div>
            <span class="text-medium" style="color:#404040;">Gestor Busca Varejos</span>
        </div>

        <ul class="row">
            <li>
                <span class="text-medium bold key">Versão:</span>
                <span class="text-medium val"> {{ version }} </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
    name:"wrapper-about",
    data(){
        return{
            version: ""
        }
    },
    mounted(){
        ipcRenderer.send('app_version');
        ipcRenderer.on('app_version', (event, arg) => {
            this.version = arg.version;
        });
    },
    methods:{
        restartApp() {
           ipcRenderer.send('restart_app');
        }
    }
}
</script>

<style lang="scss" scoped>
    
    .row{
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 15px ;    
    }
    .ctn-image{
        width: 36px;
        height: 36px;
        overflow: hidden;
        margin-right: 10px;
        img{
            width: 100%;
        }
    }
</style>