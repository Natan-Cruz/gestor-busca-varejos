<template>
    <div class="wrapper-profile">
        <p class="sub-title">Conta</p>
        <div class="ctn_grid">
            <div class="ctn-image">
                <img :src="`https://api.buscavarejos.com${(user.photoURL) ? user.photoURL : ''}`" :alt="user.displayName" :title="user.displayName">
            </div>
            <div class="ctn-informations">
                <p class="text-name">{{ user.displayName }}</p>
                <p class="text-medium">{{ user.email }}</p>
            </div>
            <div class="ctn-actions">
                <button class="button button-primary text-medium" @click="openLink" >Gerenciar conta</button>
                <button class="button button-tertiary text-medium" @click="logout" >Sair</button>
            </div>
        </div>
    </div>
</template>

<script>
import { shell } from 'electron'
import auth from "@/firebase/auth";

export default {
    name: "wrapper-profile",
    props:{
        user:{
            type: Object
        }
    },
    methods:{
        openLink(){
            shell.openExternal("https://loja.buscavarejos.com/configuracoes")
        },
       
        logout(){
            auth.singOut();
            this.$store.dispatch("user/fetchUser", null);
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
    .ctn_grid{
        width: 100%;
        display: grid;
        grid-template-areas: "ctn_image ctn_informations ctn_actions";
        grid-template-columns: 80px  1fr 146px;
        column-gap: 20px;
        margin-top: 20px;
    }
    .ctn-image{
        grid-area: ctn_image;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: solid 3px #fff;
        overflow: hidden;
        user-select: none;
        box-shadow: 1px 1px 4px #ccc;
        img{
            width: 100%;
        }
    }
    // 
    .ctn-informations{
        grid-area: ctn_informations;
    }
    .text-name{
        font-size: 2.2em;
        line-height: 1em;
        margin-bottom: 4px;
    }

    // 
    .ctn-actions{
        grid-area: ctn_actions;
    }
    .button{
        width: 146px;
        height: 36px;
        padding: 0 10px;
        margin: 0;
        cursor: pointer;
        &:first-child{
            margin-bottom: 5px;
        }
    }
</style>