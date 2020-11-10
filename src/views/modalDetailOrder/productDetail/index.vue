<template>
    <div class="wrapper-detail-product">
        <div class="header">
            <button @click="$bus.$emit('event-view-detail-order')" class="back-icon" tabindex="0">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
            </button>    
            <p class="title-product">Produto</p>
        </div>   
        <div class="body" style="position:relative">
            <error-component :msg="errorMsg" :retry="true" @event-retry="fetchProduct(productOrderId)"></error-component>
            
            <skeleton-animation v-if="is_loading" ></skeleton-animation>

            <ul class="list-informations-order"  v-else-if="product">
                <li>
                    <span class="key">Codigo do produto:</span>
                    <span class="text-medium"> {{ product.id }} </span>
                </li>
                <li v-show="product.code_bars">
                    <span class="key">Codigo de barras:</span>
                    <span class="text-medium"> {{ product.code_bars }} </span>
                </li>
                <li>
                    <span class="key">Nome:</span>
                    <span class="text-medium"> {{ product.name }} </span>
                </li>
                <li>
                    <span class="key">Categoria:</span>
                    <span class="text-medium"> {{ product.category }} </span>
                </li>
                <li>
                    <p>
                        <span class="key">Quantidade:</span> 
                        <span class="text-medium val"> {{ product.quantity }} </span> 
                        <span class="key">Und:</span> 
                        <span class="text-medium val"> {{ product.unit }} </span> 
                    </p>
                </li>
                <li>
                    <p>
                        <span class="key">Preço:</span>
                        <span class="text-medium val"> {{ formatPrice(product.price) }} </span>
                        <span class="key">Total:</span>
                        <span class="text-medium val"> {{ formatPrice(product.amount) }} </span>
                    </p>
                </li>
                <li>
                    <span class="key">Message do cliente:</span>
                    <span class="text-medium"> {{ product.message }} </span>
                </li>
                <li v-show="(product.addendums) && product.addendums.length">
                    <p class="key" style="margin: 5px 0 15px 0">Adendos:</p>
                    <table class="table-addendums">
                        <thead> 
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Qnt a mais</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="a in product.addendums" :key="a.id">
                                <td> {{ a.name }} </td>
                                <td> {{ a.quantity }} </td>
                                <td> {{ a.more_quantity }} </td>
                                <td> {{ formatPrice(a.price * a.more_quantity) }} </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import Format from "@/components/Format"
import skeletonAnimation from "./skeletonAnimation";

export default {
    name: "wrapper-product-detail",
    components:{
        skeletonAnimation
    },
    props:{
        productOrderId:{
            type: Number
        },
        uid:{
            type: String
        }
    },
    data(){
        return{
            product: undefined,
            errorMsg: "",
            is_loading: false
        }
    },
    watch:{
        productOrderId(id){
            if(typeof id === 'number' || typeof id === 'string')
                this.fetchProduct(id)
            else
                this.resetData()
        }
    },
    methods:{
        ...Format("formatPrice"),
        resetData(){
            this.product = undefined;
            this.errorMsg = "";
            this.is_loading = false;
        },
        fetchProduct(productOrderId){
            this.product = undefined;
            this.errorMsg = "";
            setTimeout(() => {
                if(!this.is_loading && !this.product)
                    this.is_loading = true;
            }, 150);
            
            const url = `https://api.buscavarejos.com/estabelecimentos/pedidos/produto/${productOrderId}`,
                headers = {
                    uid: this.uid
                }
            Axios.get(url,{ headers })
			.then( ({ data: product }) => {
                this.product = product;
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

<style lang="scss" scoped>
    .key{
        font-size: 1.8em;
        line-height: 1em;
        font-weight: bold;
        width: 160px;
        text-align: right;
        display: inline-block;
        color: rgb(61, 61, 61);
        margin-right: 10px;
    }
    .val{
        width: 90px;
        display: inline-block;
    }
    .header{
        width: 100%;
        height:  45px;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .back-icon{
        display: block;
        width: 60px;
        height: 45px;
        padding: 0 15px;
        cursor: pointer;
        border:none;
        background-color:#fff;
        outline: none;
        svg{
            width: 100%;
            height: 100%;
            transition:100ms;
            pointer-events: none;
        }
        &:active svg{
            transform: scale(.7)
        }
    }
    .title-product{
		font-size: 2.2em;
		font-weight: bold;
    }

    .list-informations-order{
        margin-top: 10px;
		li{
			padding: 10px 5px;
			border-bottom: solid 1px #ccc;
		}
        li:last-child{
            border-bottom: none;
        }
    }

    .table-addendums{
        width: 100%;
        height: auto;
        border-collapse: collapse;
        tr{
            border-top: dashed 1px #ccc;
            height: 26px;
            vertical-align: middle;
        }
        th, td{
            width: 25%;
            height: 36px;
            font-size: 1.7em;
            text-align: center;
        }
    }
</style>