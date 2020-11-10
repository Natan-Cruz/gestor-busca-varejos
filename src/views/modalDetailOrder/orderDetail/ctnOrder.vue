<template>
    <div>
        <p class="title">Detalhes do pedido</p>

        <ul class="list-informations-order">
            <li>
                <span class="text-medium bold ">Pagamento:</span>
                <span class="text-medium"> {{ type_payment }} </span>
            </li>
            <li v-show="isMoney">
                <span class="text-medium bold ">Troco para:</span>
                <span class="text-medium"> {{ formatPrice(order.change_money) }} </span>
            </li>
            <li>
                <span class="text-medium bold ">Total dos produtos:</span>
                <span class="text-medium"> {{ formatPrice(order.subtotal) }} </span>
            </li>
            <li>
                <span class="text-medium bold ">Total da entrega:</span>
                <span class="text-medium"> {{ formatPrice(order.delivery) }} </span>
            </li>
            <li>
                <span class="text-medium bold ">Total do pedido:</span>
                <span class="text-medium"> {{ formatPrice(order.amount) }} </span>
            </li>
        </ul>
    </div>
</template>

<script>
import Format from "@/components/Format"
export default {
    name:"container-informations-order",
    props:{
        order:{
            type:Object
        },
    },
    computed:{
        type_payment(){
            let type = ''
            if(this.order.type_payment === 'money') {
                return 'Dinheiro'
            }else
            if(this.order.type_payment === 'card-machine'){
                return "Cartão de credito na hora da entrega"
            }
            return type
        },
        isMoney(){
            return this.order.type_payment === 'money'
        }
    },
    methods:{
        ...Format("formatPrice")
    }
}
</script>

<style lang="scss" scoped>
    .list-informations-order{
        margin-top: 10px;
		li{
			padding: 10px 5px;
			border-bottom: solid 1px #ccc;
		}
    }
    .skeleton-li-informations-order{
        width:250px;
        height: 26px;
		margin: 7px 0;
		color: #ccc;
    }
</style>