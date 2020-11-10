<template>
	<li>
		<span class="text-medium">{{ status.status }}:</span>
		<span class="text-medium bold createdAt">  {{ formatDate(status.createdAt) }} </span>
	</li>
</template>

<script>
import dayjs from "dayjs";

export default {
	name:"item-status",
	props:{
		status:{
			type: Object
		}
	},
	methods:{
		formatDate(createdAt){
			return dayjs(createdAt).format("DD/MM/YYYY [as] HH:mm[h]")
		}
	}
}
</script>

<style>

</style>