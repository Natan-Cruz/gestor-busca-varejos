<template>
	<div>
		<p class="title">Status do pedido</p>
		<ul class="list-status-order">
			<item-status v-for="(status, i) in status.list_status" :key="i" :status="status"></item-status>
		</ul>
	</div>
</template>

<script>
import itemStatus from "../items/status";

export default {
	name:"container-informations-status",
	components:{
		itemStatus
	},
	props:{
		status:{
			type: Object
		}
	}
}
</script>

<style lang="scss" scoped>
	.list-status-order{
		li{
			padding: 10px 5px;
			border-bottom: solid 1px #ccc;
		}
	}
</style>