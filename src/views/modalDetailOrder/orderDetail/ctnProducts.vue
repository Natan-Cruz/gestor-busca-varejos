<template>
	<div class="container-informations-product">
		<!--  PRRODUCTS -->
		<div class="group-span">
			<input type="checkbox" name="" id="input-select_products" class="input-select" checked v-model=is_check>
			<label for="input-select_products" class="label-select label-select-products">
				<span class="title">Produtos</span>
				<!--  -->
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
					<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			</label>
			<ul class="container-container-products-request">
				<item-product v-for="(prod, i) in products" :key=i :product=prod></item-product>
			</ul>
		</div>
  </div>
</template>

<script>
import itemProduct from '../items/product';

export default {
	name:"container-informations-product",
	components:{
		itemProduct
	},
	props: {
		products:{
			type: Array
		},
	},
	data(){
		return{
			is_check: true
		}
	}
}
</script>

<style lang="scss" scoped>
	.sub-title{
		font-size: 1.8em;
		font-weight: bold;
		margin: 10px 0;
	}
	.group-span-checked{
		box-shadow: 0 0 6px rgba(0,0,0, 0.3);
		border-radius: 5px;
		overflow: hidden;
	}
	.label-select{
		width: 100%;
		height: 100%;
		display: flex;      
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		background: #fff;
		transition:150ms;
		border-bottom: solid 1px #ccc;

		&:hover{
			padding: 0 15px;
		}
		svg{
			transform: rotate(180deg); 
			transition: 150ms cubic-bezier(.75,.19,.67,.43);
		}
	}

	#input-select_products{
		display: none;
		&:checked + .label-select > svg{
			transform: rotate(0); /* IE 10, Fx 16+, Op 12.1+ */
		}
		&:checked ~ .container-container-products-request {
			height: auto;
		}
	}
	.container-container-products-request{
		width: 100%;
		height: 0;
		overflow: hidden;
	}
</style>