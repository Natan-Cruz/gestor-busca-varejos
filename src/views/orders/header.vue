<template>
	<header>
		<h1 class="title">Seus pedidos</h1>
		<div class="group">
			<button class="button button-primary text-medium pause-sound" @click="$audioNotification.pauseAudioNotification" v-show="isRunning" >Pausar som</button>
			<button class="button button-primary text-medium pause-sound" @click="$audioNotification.createAudio" v-show="error" >Recarregar som</button>
			<operation-status />
		</div>
	</header>
</template>

<script>
import operationStatus from "@/component/popupOperationStatus/index";

export default {
	name:"custom-header",
	components:{
		operationStatus
	},
	computed:{
		isRunning(){
			return this.$audioNotification.isRunning
		},
		error(){
			return this.$audioNotification.error
		}
	}
}
</script>

<style lang="scss" scoped>
	header{
		width: calc(100% - 40px);
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0 5px 20px;
		background: #fff;
        margin: 15px auto 25px auto;
        border-bottom: solid 1px rgb(232, 232, 232);
	}
	.title{
		font-size: 2.6em;
		line-height: 1em;
		font-weight: bold;
	}
	.group{
		display: flex;
		align-items: center;
	}
	.button{
		width: 120px;
		height: 40px;
		margin-right: 15px;
		cursor: pointer;
	}
</style>