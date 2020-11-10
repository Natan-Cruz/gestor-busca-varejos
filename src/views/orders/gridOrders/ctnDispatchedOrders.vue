<template>
    <div class="ctn-orders ctn_dispatched_orders">
        <div class="header">
            <p class="title-header">Pedidos despachados</p>
        </div>
        <div class="body">
            <ul class="content-body">
                <item-order v-for="order in orders" :key="order.id" 
                    :order=order 
                    :uid=uid
                    :currentStatus="[1,4]">
                </item-order>
            </ul>
            <p class="text-15" style="margin-top: 20px;text-align:center;" v-if="!orders.length && !isLoading && !errorMsg">Nenhum pedido</p>
            <spinner-loading :loading=isLoading top="20px"></spinner-loading>
            <error-component :msg="errorMsg" :retry="true" @event-retry="fetchOrders"></error-component>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import { mapGetters } from 'vuex';
import itemOrder from "./item-order";
export default {
    name: "ctn-dispatched-orders",
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
            orders: "orders/dispatchedOrders"
        })
    },
    data(){
        return{
            currentStatus: 3,
            errorMsg: "",
            isLoading: false
        }
    },
    created(){
        this.fetchOrders()
    },
    methods:{
        async fetchOrders(){
            this.isLoading = true;
            this.errorMsg = ""

            this.$store.dispatch("orders/setOrders", {
                key: "dispatchedOrders",
                orders:[]
            });

            try {
                const { data: orders } = await Axios.get(`https://api.buscavarejos.com/estabelecimentos/pedidos?status=${this.currentStatus}`,{
                    headers:{
                        "uid": this.uid
                    }
                })
                this.$store.dispatch("orders/setOrders", {
                    key: "dispatchedOrders",
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
				this.isLoading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>