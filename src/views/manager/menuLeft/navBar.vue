<template>
    <nav>
        <router-link to="/gestor/pedidos" class="item-link" :class="{ 'item-link-selected': setSelected('pedidos') }" style="padding: 9px 0 9px 6px" title="Seus pedidos">
            <svg height="512pt" viewBox="0 -35 512 511" width="512pt" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" d="M0 442.148h328.95V.5H0zM169.879 91.832h104.664v30H169.879zm0 77.848h104.664v30H169.879zm0 77.847h104.664v30H169.879zm0 77.848h104.664v30H169.879zM75.172 81.945L85.648 94.47l26.938-24.14 20.023 22.343-50.058 44.855-30.39-36.336zm0 77.848l10.476 12.523 26.938-24.14 20.023 22.344-50.058 44.859-30.39-36.34zm0 77.848l10.476 12.523 26.938-24.14 20.023 22.34-50.054 44.859-30.395-36.336zm0 0M359 396.914l22.61 45.234h54.234l22.605-45.234v-41.539H359zm0 0M359 154.52h99.45v170.855H359zm0 0M458.45 40.727V23.176h-34.723V.5h-30v22.676H359V124.52h99.45V70.727H482v76.75h30V40.727zm0 0"/>
            </svg>
        </router-link>
        <router-link to="/gestor/configuracoes" class="item-link" :class="{ 'item-link-selected': setSelected('configuracoes') }" style="padding: 9px 0 9px 0px" title="Configuraçoes do gestor">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
                <g>
                    <path d="M0,0h24v24H0V0z" fill="none"/>
                    <path fill="#fff" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </g>
            </svg>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "nav-bar",
    methods:{
        setSelected(path){
            const pathname = this.$route.path;
            if(pathname.indexOf(path) > 0)
                return true;
            else
                return false
        }
    }
}
</script>

<style lang="scss" scoped>
    nav{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .item-link{
        width: 100%;
        height: 50px;
        display: block;
        position: relative;
        svg{
            width: 100%;
            height: 100%;
            transition: 250ms;
        }
        svg:hover{
            transform: scale(0.96);
        }
        svg:active{
            transform: scale(0.86);
        }
    }
    .item-link-selected{
        background: rgba(255, 255, 255, 0.1);
        font-weight: bold;
        &::before {
            content: '';
            width: 3px;
            height: 100%;
            display: block;
            position: absolute;
            left: 1px;
            top: 0;
            background: #fff;
        }
    }
</style>