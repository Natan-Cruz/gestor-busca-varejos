<template>
    <div>
        <p class="title">Detalhes do usuário</p>
		<div class="wrapper-info-user">

			<div class="container-photo" v-show="user.picture">
				<img :src="user.picture" alt="">
			</div>
			<!--  -->
			<ul class="list-informations-user" :style=" user.picture ? 'width:calc(100% - 110px)' : 'width:100%' " >
				<li>
					<span class="text-medium bold">Nome: </span>
					<span class="text-medium"> {{ user.name }} </span>
				</li>
				<li v-show="user.phone" >
					<span class="text-medium bold">Telefone: </span>
					<span class="text-medium"> {{ user.phone }} </span>
				</li>
				<li v-show="complete_address">
					<span class="text-medium bold">Endereço:  </span>
					<span class="text-medium">{{ complete_address }}</span>

					<span class="text-medium"></span>
					<a :href="`https://www.google.com/maps/search/?api=1&query=${ user.latitude },${ user.longitude }`" target="_black" class="icon-external_link">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path
								d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
						</svg>
					</a>
				</li>
				<li v-show="user.reference_point" >
					<span class="text-medium bold" >Pontos de referencia:  </span>
					<span class="text-medium"> {{ user.reference_point }}</span>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
export default {
	name:"container-informations-user",
	props: {
		user:{
			type: Object
		}
	},
	computed:{
		complete_address(){
			return `${this.user.street || ""} ${this.valideAddress(this.user.number, " - Nº")} ${this.valideAddress(this.user.neighborhood, "- ")} ${this.valideAddress(this.user.complement, " - ")}`
		}
	},
	methods:{
		valideAddress(address, prefix = "", sufix = ""){
			if(address)
				return prefix + address + sufix
			else	
				return ""
		}
	}
}
</script>

<style lang="scss" scoped>
	.wrapper-info-user{
		width: 100%;
		height: auto;
		display: flex;
		justify-content: start;
		flex-direction: row;
		align-items: center;
	}
	.container-photo{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 30px;
		img{
			width: 100%;
		}
	}
	.list-informations-user{
		li{
			padding: 10px 5px;
			border-bottom: solid 1px #ccc;
			position: relative;
		}
	}
		
	.icon-external_link {
		position: absolute;
		top: calc(50% - 12px);
		right: 5px;
		width: 24px;
		height: 24px;
		cursor: pointer;
	}

	.icon-external_link svg {
		width: 100%;
	}


</style>