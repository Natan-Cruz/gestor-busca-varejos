<template>
    <div class="wrapper-detail-order">
        <!--  -->
        <error-component :msg="errorMsg" :retry="true" @event-retry="fetchOrder(orderId)"></error-component>
        <!--  -->
        <skeleton-details-order v-if="is_loading"></skeleton-details-order>
        <!--  -->
        <div v-else-if="order">
            <div class="group-span">
                <span class="text-medium">Codigo do pedido: <span class="sub-text bold"> #{{ order.order.id }} </span> </span>
            </div>
            <container-informations-user :user=order.user ></container-informations-user>
            <!--  -->
            <container-informations-product :products=order.products ></container-informations-product>
            <!--  -->
            <container-informations-order :order=order.order ></container-informations-order>
            <!--  -->
            <container-informations-status :status=order.status ></container-informations-status>
            <!--  -->
            <group-buttons 
                :order=order.order 
                :user=order.user 
                :status=order.status 
                :uid=uid 
                :status_code="order.status.current_status.status"
                @event-close-modal="$emit('event-close-modal')">
            </group-buttons>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';

import skeletonDetailsOrder from './skeleton-detail-order';
import containerInformationsUser from './ctnUser';
import containerInformationsProduct from './ctnProducts';
import containerInformationsOrder from './ctnOrder';
import containerInformationsStatus from './ctnStatus';
import groupButtons from './group-buttons';

export default {
    name: "wrapper-detail-order",
    components:{
        containerInformationsUser,
		containerInformationsProduct,
		containerInformationsOrder,
		containerInformationsStatus,
		groupButtons,
        skeletonDetailsOrder
    },
    props:{
        orderId:{
            type: Number
        },
        uid:{
            type:String
        }
    },
    data(){
        return{
            is_loading:false,
            errorMsg: "",
            order: undefined
        }
    },
    watch:{
        orderId(id){
            if(typeof id === 'number' || typeof id === 'string')
                this.fetchOrder(id)
            else
                this.resetData()
        }
    },
    methods:{
        resetData(){
            this.is_loading = false;
            this.errorMsg = "";
            this.order = undefined;
        },
        fetchOrder(orderId){
            this.is_loading = false;
            this.errorMsg = "";
            this.is_loading = true;

            const url = `https://api.buscavarejos.com/estabelecimentos/pedidos/${orderId}`,
                headers = {
                    uid: this.uid
                };

            Axios.get(url, { headers })
			.then( ({ data: order }) => {
                this.order = order
			})
			.catch(error => {
				let msg;
                if (error.response) {
                    msg = error.response.data.msg
                    
                } else if (error.request) {
                    if (error.message === "Network Error") {
                        msg = 'Ops, problema com a conexão com a internet, por favor tente novamente!'
                    }else{
                        msg = 'Ops, deu um problema, por favor tente novamente!'
                    }
                } 
                
                this.errorMsg = msg
			}) 
			.finally(() => {
				this.is_loading = false
			})
        }
    }
}
</script>

<style>

</style>