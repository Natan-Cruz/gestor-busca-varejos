<template>
    <li class="card-order" style="margin-bottom: 10px;" 
        :class="{ 'new-order-push': newOrder }">
        <!--  -->
        <div class="background-block-in-selection">
            <div class="ctn_view_detail_order" @click="selectOrder" v-show="show(1)" >
                <img src="../../../assets/view-detail-order.png" alt="" title="Ver detalhes do pedido">
            </div>
            <div class="ctn_group_order" @click="groupOrder" v-show="show(2)">
                <img src="../../../assets/group-orders.png" title="Agrupar para despache">
            </div>
            <div class="ctn_dispatch_order" @click="dispatchOrder" v-show="show(3)">
                <img src="../../../assets/dispatch-order.png" title="Despachar pedido">
            </div>
            <div class="ctn_done_order" @click="concludeOrder" v-show="show(4)">
                <img src="../../../assets/done-icon.png" title="Despachar pedido">
            </div>
        </div>
        <!--  -->
        <div class="background-block-canceled">
            <p class="text-medium bold" style="margin:22px;color:#fff;">Pedido cancelado</p>
            <span class="span-icon-close-order-canceled">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
                    width="24">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </span>
        </div>
        <!--  -->
        <div class="wrapper-item-order">
            <div class="content-span">
                <!-- Numero do pedido -->
                <span class="text-15 bold"> #{{ order.id }} </span>
                <!-- Nome do cliente que requisitou o pedido -->
                <span class="text-15"> {{ order.username }} </span>
            </div>
            <!-- Quando foi pedido -->
            <span class="text-15"> {{ orderCreatedAt }} </span>
        </div>
    </li>
</template>

<script>
import dayjs from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from 'dayjs/plugin/relativeTime';
import { alterStatus, STATUS } from "../../statusActions";
import messagePopup from '@/components/message-popup/message-popup';


dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        future: "%s",
        past: "%s",
        s: 'Agora',
        m: "Há 1 min",
        mm: "Há %d min",
        h: "Um hora atrás",
        hh: "Há %d horas",
        d: "Há um dia",
        dd: "Há %d dias",
        M: "Há um mês",
        MM: "Há %d meses",
        y: "Há um ano",
        yy: "Há %d anos"
    }
})


export default {
    name:"item-order",
    props:{
        order:{
            type: Object
        },
        uid: {
            type: String,
            required: false
        },
        currentStatus:{
            type: Array
        },
        newOrder:{
            type: Boolean
        }
    },
    data(){
        return{
            orderCreatedAt: undefined
        }
    },
    mounted(){
        const time = 1000 * 10 ; //2 minutos 
        this.orderCreatedAt = dayjs(this.order.createdAt).fromNow()
        setInterval(() => {
            this.orderCreatedAt = dayjs(this.order.createdAt).fromNow()
        }, time);
    },
    methods:{
        show(index){
            let isShow = false
            this.currentStatus.forEach( i => {
                if(index === i)
                    isShow = true
            })
            return isShow
        },
        selectOrder(){        
            this.$bus.$emit("event-open-modal-detail-order", this.order.id );
        },
        groupOrder(){
           this.$store.dispatch("orders/removeOrder", {
				key: "ordersAccepted",
				orderId: this.order.id
			})
			this.$store.dispatch("orders/pushOrder", {
				key: "groupedOrders",
				order: this.order
			})
        },
        dispatchOrder(){
            const uid =  this.uid,
                orderId = this.order.id,
                statusCode = STATUS.DESPACHADO;
                
            alterStatus(uid, orderId, statusCode)
			.then(() => {
				this.$store.dispatch("orders/removeOrder", {
					key: "ordersAccepted",
					orderId: orderId
                });
                this.$store.dispatch("orders/removeOrder", {
					key: "groupedOrders",
					orderId: orderId
				});
				this.$store.dispatch("orders/pushOrder", {
					key: "dispatchedOrders",
					order: this.order
				});

				messagePopup("Pedido despachado com sucesso!", 3500);
			})
			.catch( (error) => {
                console.error(error)
				const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
				messagePopup(msg, 4000);
			})
        },
        concludeOrder(){
            const uid =  this.uid, 
                orderId = this.order.id,
                statusCode = STATUS.ENTREGUE;
                
            alterStatus(uid, orderId, statusCode)
			.then(() => {
				this.$store.dispatch("orders/removeOrder", {
					key: "dispatchedOrders",
					orderId: orderId
                });
				messagePopup("Pedido finalizado!", 3500);
                
            })
			.catch( () => {
				const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
				messagePopup(msg, 4000);
			})
        }
    }
}
</script>

<style lang="scss" scoped>
    .text-15{
        font-size:1.5em;
        line-height:1em;
		cursor: default;
    }
    .card-order {
        width: 100%;
        height: 60px;
        margin-top: 20px;
        border-radius: 5px;
        cursor: pointer;
        background: #fff;
        box-shadow: 1px 1px 7px -4px rgba($color: #000000, $alpha: 0.6);
        padding: 0 10px;
        position: relative;
        &:hover > .wrapper-item-order{
            filter:blur(1px)
        }
        &:hover > .background-block-in-selection{
            opacity: 1;
        }
    }

    .wrapper-item-order{
        width: 100%;
        height: 100%;
        display:flex;
        align-items: center;
        justify-content: space-between;
        transition: 150ms;
    }
    
    .background-block-in-selection {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.8);
        opacity: 0;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 'ctn_view_detail_order ctn_group_order ctn_dispatch_order ctn_done_order';
        grid-template-columns: repeat( auto-fit, minmax(25%, 1fr) );
        transition: 150ms ease-in;
        z-index: 1;
        img{
            cursor: pointer;
        }
        img:active{
            transform: scale(.9)
        }
    }
    .ctn_view_detail_order{
        grid-area: ctn_view_detail_order;
    }
    .ctn_group_order{
        grid-area: ctn_group_order;        
    }
    .ctn_dispatch_order{
        grid-area: ctn_dispatch_order;
    }
    .ctn_done_order{
        grid-area: ctn_done_order;
    }

    .ctn_view_detail_order,
    .ctn_group_order,
    .ctn_dispatch_order,
    .ctn_done_order{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .background-block-canceled {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.8);
        opacity: 0;
        transition: opacity 500ms cubic-bezier(.75, .19, .67, .43);
    }


    .span-icon-close-order-canceled {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: block;
        padding: 3px;
        transition: 150ms;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        svg {
            width: 100%;
            height: 100%;
            pointer-events: none;
            fill: #f00;
        }
    }
    // 
    .new-order-push::before{
        content:"Novo";
        display: block;
        width: auto;
        height: auto;
        background-color: #f00;
        font-size: 1.7em;
        line-height: 1em;
        font-weight: bold;
        color: #fff;
        padding: 3px 5px;
        border-radius: 5px;
        position: absolute;
        top: -7px;
        z-index: 10;
    }
</style>