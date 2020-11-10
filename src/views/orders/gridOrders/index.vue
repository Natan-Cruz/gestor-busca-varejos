<template>
    <div class="grid-orders">
        <!-- Novos pedidos -->
        <ctn-new-orders :uid=user.data.uid ></ctn-new-orders>
        <!-- Pedidos aceitos -->
        <ctn-orders-accepted :uid=user.data.uid ></ctn-orders-accepted>
        <!-- Pedidos agrupados para despache -->
        <ctn-grouped-orders></ctn-grouped-orders>
        <!-- Pedidos despachados -->
        <ctn-dispatched-orders :uid=user.data.uid ></ctn-dispatched-orders>
    </div>
</template>

<script>
import ctnNewOrders from "./ctnNewOrders";
import ctnOrdersAccepted from "./ctnOrdersAccepted";
import ctnGroupedOrders from "./ctnGroupedOrders";
import ctnDispatchedOrders from "./ctnDispatchedOrders";
import { mapGetters } from 'vuex';


export default {
    name: "grid-orders",
    components:{
        ctnNewOrders,
        ctnOrdersAccepted,
        ctnGroupedOrders,
        ctnDispatchedOrders
    },
    computed:{
        ...mapGetters({
            user: "user/user"
        })
    }
}
</script>

<style lang="scss" scoped>
    .grid-orders{
        width: 100%;
        height: calc(100% - 105px);
        display: grid;
        grid-template-areas: 'ctn_01 ctn_02 ctn_03 ctn_04';
        grid-template-columns: repeat(4, minmax(260px, 25%));
        column-gap: 20px;
        grid-template-rows: 100%;
        position: relative;
        margin-top: 20px;
        padding-bottom: 10px;
        overflow: {
            x:auto;
            y: hidden;
        };
    }
    .ctn_new_orders{
        grid-area: ctn_01;
    }
    .ctn_order_accepted{
        grid-area: ctn_02
    }
    .ctn_grouped_orders{
        grid-area: ctn_03;
    }
    .ctn_dispatched_orders{
        grid-area: ctn_04;
    }
    // 
    ::v-deep .ctn-orders{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 1px 1px 5px -2px rgb(232, 232, 232);
        border: solid 1px rgb(232, 232, 232);
    }
    ::v-deep .header{
        width: 100%;
        height: 60px;
        background-color: #f7f7f7;
        box-shadow: 0 2px 6px -4px  rgba($color: #000000, $alpha: 0.4);
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0 20px;
    }
    ::v-deep .title-header{
        font-size: 1.8em;
        line-height: 1em;
        color: #222;
        font-weight: bold;
    }
    // 
    ::v-deep .body{
        width: 100%;
        height: calc(100% - 60px);
        overflow: {
            x: hidden;
            y: auto;
        };
    }
    ::v-deep .content-body{
        width: 90%;
        margin: 0 auto;
    }


    // /* Para navegadores webkit (Chrome, Safari, Opera 15+): */

    // scroll bar em geral
    ::-webkit-scrollbar {
        height: 8px;
    }

    // fundo da scroll bar
    ::-webkit-scrollbar-track {
        background: rgb(235, 235, 235);
        border-radius: 10px;
    }

    // botao da scroll bar
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius:10px;
    }

    // O resto das propriedades disabilita por segunraça
    ::-webkit-scrollbar-button,
    ::-webkit-scrollbar-corner,
    ::-webkit-scrollbar-track-piece,
    ::-webkit-resizer {
        display: none;
    }
</style>