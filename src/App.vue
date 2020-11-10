<template>
	<div id="app">
		<router-view></router-view>
        <!-- <audio src="https://api.buscavarejos.com/statics/and_bell_ringing_1.mp3" id="alert-sound" style="display: none;" ref="audio_alert" loop="true"></audio> -->
		<div class="t" v-show="!isOnline" >
			<p class="text-medium bold">Você está Offline!</p>
		</div>
	</div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
	name: 'App',
	data(){
		return{
			isOnline: true
		}
	},
	created(){
		this.monitoringPushNotifications();
		this.addListenersNetworkMonitoring()	
	},
	methods:{
		monitoringPushNotifications(){
			ipcRenderer.on("messsage", (event, payload) => {
				console.log("upload", payload)
			})
			ipcRenderer.on("messaging", (event, payload) => {
				if (!payload.order)
					return

				const order = JSON.parse(payload.order);
				const { id, username, createdAt } = order;
				
				this.$audioNotification.playAudioNotification();

				this.$store.dispatch("orders/pushOrder", {
					key: "newOrders",
					order: {
						id,
						username,
						createdAt
					}
				})
			})
		},
		addListenersNetworkMonitoring(){
			window.addEventListener('online', () => {
				this.isOnline = true
			})
			window.addEventListener('offline', () => {
				this.isOnline = false
			})
		}
	}
}
</script>

<style lang="scss">
	@import "@/components/Button.scss";
	@import "@/components/ButtonWithLoading.scss";
	@import "@/components/ModalStyle.scss";
	@import "@/components/Skeleton.scss";
	@import "@/components/Switch.style.scss";

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-size: 10px;
		font-family: 'Baloo Thambi 2', cursive, Arial, sans-serif;
	}
	
	li {
		list-style: none;
	}
	
	a {
		text-decoration: none;
	}
	.text-medium {
		font-size: 1.7em;
		line-height: 1em;
		cursor: default;
	}

	.bold {
		font-weight: bold;
	}
	.text-15{
		font-size: 1.5em;
		line-height: 1em;
		cursor: default;
	}
	.sub-text {
		font-size: inherit;
		line-height: inherit;
	}

	.t{
		position: fixed;
		left: 10px;
		bottom: 10px;
		padding: 15px;
		background-color: rgba($color: #000000, $alpha: 0.5) ;
		background: rgb(54, 49, 49);
		color: #fff;
		border-radius: 5px;
	}
</style>
