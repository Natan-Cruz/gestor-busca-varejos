<template>
    <div class="ctn-orders ctn_new_orders">
        <div class="header">
            <p class="title-header">Novos pedidos</p>
        </div>
        <div class="body">
            <ul class="content-body">
                <item-order v-for="order in orders" :key="order.id" 
                    :order=order
                    :currentStatus="[1]"
                    :newOrder="true"
                ></item-order>
            </ul>
            <p class="text-15" style="margin-top: 20px;text-align:center;" v-if="!orders.length && !isLoading && !errorMsg">Nenhum pedido</p>
            <spinner-loading :loading="isLoading" top="20px"></spinner-loading>
            <error-component :msg="errorMsg" :retry="true" @event-retry="fetchOrders"></error-component>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import itemOrder from "./item-order";
import { mapGetters } from 'vuex';

export default {
    name: "ctn-new-order",
    components:{
        itemOrder
    },
    props:{
        uid:{
            type: String
        }
    },
    computed:{
        ...mapGetters({
            orders: "orders/newOrders"
        })
    },
    data(){
        return{
            currentStatus: 1,
            errorMsg: "",
            isLoading: false
        }
    },
    created(){
        this.fetchOrders();
        const duration = 1000 * 90  // Um minute e meio
        setInterval(() => {
            this.fetchOrders()
            console.log("[FETCH ORDERS]")
        }, duration);
    },
    methods:{
        async fetchOrders(){
            this.isLoading = true;
            this.errorMsg = ""

            const lastOrders = JSON.parse(JSON.stringify(this.orders))
            
            this.$store.dispatch("orders/setOrders", {
                key: "newOrders",
                orders:[]
            });


            try {
                const { data: orders } = await Axios.get(`https://api.buscavarejos.com/estabelecimentos/pedidos?status=${this.currentStatus}`,{
                    headers:{
                        "uid": this.uid
                    }
                })
                
                if(lastOrders.length > 0 ){
                    if(orders.length > lastOrders.length){
                        this.$audioNotification.playAudioNotification();
                    }
                }

                this.$store.dispatch("orders/setOrders", {
                    key: "newOrders",
                    orders: orders
                });             

            } catch (error) {   
                let msg;
                if (error.response)
                    msg = error.response.data.msg;
                else
                    msg = 'Ops, ocorreu algum problema!';

                this.errorMsg = msg;
            }finally{
                this.isLoading = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>