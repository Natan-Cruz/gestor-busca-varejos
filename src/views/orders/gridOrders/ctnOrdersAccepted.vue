<template>
    <div class="ctn-orders ctn_order_accepted">
        <div class="header">
            <p class="title-header">Pedidos aceitos</p>
        </div>
        <div class="body">
            <ul class="content-body">
                <item-order v-for="order in orders" :key="order.id" 
                    :order=order 
                    :uid=uid
                    :currentStatus="[1,2,3]" >
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
            orders: "orders/ordersAccepted"
        })
    },
    data(){
        return{
            currentStatus: 2,
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
                key: "ordersAccepted",
                orders:[]
            });

            try {
                const { data: orders } = await Axios.get(`https://api.buscavarejos.com/estabelecimentos/pedidos?status=${this.currentStatus}`,{
                    headers:{
                        "uid": this.uid
                    }
                })
                this.$store.dispatch("orders/setOrders", {
                    key: "ordersAccepted",
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