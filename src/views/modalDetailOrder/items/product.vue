<template>
	<li class="row-grid" @click="$bus.$emit('event-view-detail-product', product.id)">
		<div class="container-img">
			<img :src="`https://api.buscavarejos.com${product.photo}?width=60`" :alt=product.name class="image-product">
		</div>
		<div class="ctn_info">
			<span class="text-medium span-spacing_on-row-grid  bold"> {{ product.name }} </span>
			<!--  -->
			<span class="text-medium span-spacing_on-row-grid span"> <span class="sub-text bold">Qnt: </span> {{ product.quantity }} {{ product.unit }} </span>
			<span class="text-medium">
				<span class="sub-text bold">Total: </span>
				<span class="sub-text span-spacing_on-row-grid">{{ formatPrice(product.amount) }} </span>
			</span>
		</div>
		<ul class="list-addendums">
			<li v-for="(addendum,i) in addendums" :key="i"> {{ addendum.quantity }} - {{ addendum.name }} </li>
		</ul>
		<div class="ctn_message">
            <p class="message-item" v-on:click="toggleMessage" :title=" product.message"> {{ product.message }} </p>
        </div>
	</li>
</template>

<script>
import Format from "@/components/Format";

export default {
	name:"item-product",
	props:{
		product:{
			type: Object
		}
	},
	data(){
		return{
			ctn_is_check: false
		}
	},
	computed:{
		addendums(){
			return this.product.addendums ? this.product.addendums.split("&").map(o => JSON.parse(o)) : []
		}
	},
	methods:{
        toggleMessage(e){
            const messageNode = e.target;

            if (this.message) {
                messageNode.style.whiteSpace = 'nowrap';
                this.message = false
            } else {
                messageNode.style.whiteSpace = 'normal'
               this.message = true
            }
		},
		editProduct(){
			alert('Aguarde novidades')
		},
		removeProduct(){
			alert('Aguarde novidades')
		},
		...Format("formatPrice")
	}
}
</script>

<style lang="scss" scoped src="./product-style.scss"></style>
