<template>
	<div>
		<p class="title">Ações</p>
		<div class="group-buttons" style="margin-bottom: 15px;">
			<!-- Botão de aceitar pedido -->
			<button class="button button-primary text-medium btn_50 btn-conclude" 
				:disabled=isLoading 
				@click="confirmOrder"
				v-if="preset.confirmOrder">
				Confirmar pedido
			</button>
			<!-- Botão de despachar pedido -->
			<button class="button button-primary text-medium btn_50 btn-dispatch-order" 
				:disabled=isLoading 
				@click="dispachOrder"
				v-if="preset.dispachOrder">
				Despachar pedido
			</button>
			
			<button class="button button-primary text-medium btn_50 btn-conclude"
				:disabled=isLoading 
				@click="concludeOrder"
				v-if="preset.concludeOrder">
				Concluir pedido
			</button>
			
			<button class="button btn-cancel-order text-medium btn_50" 
				:disabled=isLoading
				@click="cancelOrder" 
				v-if="preset.cancelOrder_50">
				Cancelar pedido
			</button>
			<!-- Botão de agrupar pedido -->
			<button class="button button-primary text-medium btn_50 btn-return-order" 
				:disabled=isLoading 
				@click="agroupOrder"
				v-if="preset.agroupOrder">
				Agrupar pedido para despache
			</button>
		</div>
		<!-- Botão para cancelar pedido -->
		<button class="button btn-cancel-order text-medium" 
			:disabled=isLoading
			@click="cancelOrder" 
			v-if="preset.cancelOrder_100">
			Cancelar pedido
		</button>
		<!-- Botão para descancelar pedido -->
		<!-- <button class="button btn-cancel-order text-medium" 
			@click="agroupOrder" v-if="preset.undoOrder">
			Descancelar pedido
		</button> -->
	</div>
</template>

<script>
// import { animationDispatchOrder } from './animations.js';
import messagePopup from '@/components/message-popup/message-popup';
import Axios from 'axios';
import presets from "./presetsButtons";
import { alterStatus, STATUS } from "../../statusActions"

export default {
	name:"group-buttons",
	props: {
		order:{
			type: Object
		},
		user:{
			type: Object
		},
		status:{
			type: Object
		},
		uid:{
			type: String
		},
		status_code: {
			type: Number
		}
	},
	data(){
		return{
			isLoading: false,
			preset: presets.get(this.status_code)
		}
	},
	methods:{
		confirmOrder(){
			this.isLoading = true;
			const uid = this.uid, 
				orderId = this.order.id,
				statusCode = STATUS.ACEITO;

			alterStatus(uid, orderId, statusCode)
			.then(() => {
				this.$store.dispatch("orders/removeOrder", {
					key: "newOrders",
					orderId: orderId
				});
				this.$store.dispatch("orders/pushOrder", {
					key: "ordersAccepted",
					order: {
						id: orderId,
						username: this.user.name,
						status: statusCode,
						createdAt: this.status.current_status.createdAt
					}
				});

				this.$emit("event-close-modal");
				messagePopup("Pedido aceito com sucesso!")
			})
			.catch( () => {
				const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
				messagePopup(msg, 4000);
			})
			.finally(() => {
				this.isLoading = false;
			})
		},
		concludeOrder(){
			this.isLoading = true;
			const uid = this.uid, 
				orderId = this.order.id,
				statusCode = STATUS.ENTREGUE;

			alterStatus(uid, orderId, statusCode)
			.then(() => {
				this.$store.dispatch("orders/removeOrder", {
					key: "dispatchedOrders",
					orderId: orderId
				});
                this.$emit("event-close-modal");
				messagePopup("Pedido finalizado!", 3500);
			})
			.catch( () => {
				const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
				messagePopup(msg, 4000);
			})
			.finally(() => {
				this.isLoading = false;
			})
		},
		dispachOrder(){
			this.isLoading = true;
			const uid = this.uid, 
				orderId = this.order.id,
				statusCode = STATUS.DESPACHADO;

			alterStatus(uid, orderId, statusCode)
			.then(() => {
				this.$store.dispatch("orders/removeOrder", {
					key: "ordersAccepted",
					orderId: orderId
				});
				this.$store.dispatch("orders/pushOrder", {
					key: "dispatchedOrders",
					order: this.order
				});

				this.$emit("event-close-modal");
				
				messagePopup("Pedido despachado com sucesso!", 3500);
			})
			.catch( () => {
				const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
				messagePopup(msg, 4000);
			})
			.finally(() => {
				this.isLoading = false;
			})
		},
		agroupOrder(){
			this.$store.dispatch("orders/removeOrder", {
				key: "ordersAccepted",
				orderId: this.order.id
			})
			this.$store.dispatch("orders/pushOrder", {
				key: "groupedOrders",
				order: {
					id: this.order.id,
					username: this.user.name,
					createdAt: this.status.current_status.createdAt
				}
			})

			this.$emit("event-close-modal")
		},
		async cancelOrder(){
			const aswer = confirm("Voce têm certeza que deseja cancelar o pedido?")
			if(!aswer) return;

			try{	
				this.isLoading = true
				const url = "https://api.buscavarejos.com/estabelecimentos/pedidos/status",
					body = {
						order_id: this.order.id,
						status: 6,
						message: "Pedido cancelado pelo estabelecimento"
					}
					
				await Axios.post(url,body, {
					headers:{
						"uid": this.uid
					}
				})
			
				messagePopup("Pedido cancelado!!")

                this.$emit("event-close-modal");
			}catch(error){
				if(error.response){
					const msg = error.response.data.msg
					messagePopup(msg, 4000)
				}else{
					const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
					messagePopup(msg, 4000)
				}
			}finally{
				this.isLoading = false
			}
		},
		async returnOrder(){
			try {
				this.isLoading = true
				const url = "https://api.buscavarejos.com/estabelecimentos/pedidos/status",
					body = {
						order_id: this.order.id,
						status: 5
					}
					
				await Axios.post(url,body, {
					headers:{
						"uid": this.uid
					}
				})
				messagePopup("Status alterado com sucesso!!")

                this.$emit("event-close-modal");				
			} catch (error) {
				if(error.response){
					const msg = error.response.data.msg
					messagePopup(msg, 4000)
				}else{
					const msg = 'Ops, ocorreu um problema, por favor tente novamente!';
					messagePopup(msg, 4000)
				}
			}finally{
				this.isLoading = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 2.2em;
		font-weight: bold;
		margin-top: 10px;
	}
	.group-buttons{
		display: flex; 
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		// margin: 20px 0 50px 0;
	}


	.button {
		height: 46px;
		font-weight: bold;
		cursor: pointer;
		text-align: center;
		background: #fd842b;
		border: none;
		color: #fff;
	}

	.button-pattern:active {
		transform: scale(.95, .95);
		transition: 200ms;
	}

	.button-pattern:disabled {
		/* background: #fd842b; */
		opacity: .7;
	}
	.btn_50{
		width: 49%;
		height: 56px;
		margin: 0;
	}
	.btn-conclude{
		background-color: #27b852;
	}
	@keyframes animation-reload{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(1080deg);
		}
	}
	.btn-cancel-order{
		height: 56px;
		background-color:  #E32227;;
	}
</style>