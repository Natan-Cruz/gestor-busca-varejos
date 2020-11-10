<template>
    <div class="ctn-orders ctn_grouped_orders">
        <div class="header">
            <p class="title-header">Esperando despache</p>
        </div>
        <div class="body">
            <ul class="content-body">
                <item-order v-for="order in orders" :key="order.id" 
                    :order=order
                    :currentStatus="[1,3]">
                </item-order>
            </ul>
            <p class="text-15" style="margin-top: 20px;text-align:center;" v-if="!orders.length">Nenhum pedido</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import itemOrder from "./item-order";
export default {
    name: "ctn-grouped-order",
    components:{
        itemOrder
    },
    computed:{
        ...mapGetters({
            orders: "orders/groupedOrders"
        })
    }
}
</script>

<style lang="scss" scoped>

</style>