<template>
    <div class="modal modal-detail-order" ref="modal">
        <div class="wrapper-modal" @click=clickCloseModal >
            <!-- Backogrund modal -->
            <div class="background background-modal-detail-order" ></div>
            <!-- Content modal -->
            <div class="content-modal-detail-order" ref="content_modal">
                <!-- close -->
                <span class="close-details-orders" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        <path d="M0 0h24v24H0z" fill="none" /></svg>
                </span>

                <div class="wrapper-grid" :class="{ 'is-showing-order': isShowingOrder, 'is-showing-product': isShowingProduct }">
                    <wrapper-order-detail 
                        :style=" isShowingProduct && 'display:none'"
                        :uid="user.data.uid" 
                        :orderId=orderId 
                        @event-close-modal=closeModal>
                    </wrapper-order-detail>
                    <wrapper-product-detail 
                        :style=" isShowingOrder && 'display:none' "
                        :uid="user.data.uid" 
                        :productOrderId="productOrderId">
                    </wrapper-product-detail>
                </div>
                <!--  -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import wrapperOrderDetail from "./orderDetail/index"
import wrapperProductDetail from "./productDetail/index"

export default {
    name: "modal-detail-order",
    components:{
        wrapperOrderDetail,
        wrapperProductDetail
    },
    computed:{
        ...mapGetters({
            user: "user/user"
        }),
        isShowingOrder(){
            return this.showing === "detail-order"
        },
        isShowingProduct(){
            return this.showing === "detail-product"
        }
    },
    data(){
        return{
            orderId: undefined,
            productOrderId: undefined,
            showing: "detail-order",
        }
    },
    created(){
        this.$bus.$on("event-open-modal-detail-order", orderId => {
            this.orderId = orderId;
            this.openModal();
        })
        this.$bus.$on("event-close-modal-detail-order", () => {
            this.closeModal()
        })
        this.$bus.$on("event-view-detail-product", productOrderId => {
            this.productOrderId = productOrderId
            this.translateTo("detail-product")
        })
        this.$bus.$on("event-view-detail-order", () => {
            this.productOrderId = undefined;
            this.translateTo("detail-order")
        })
    },
    methods:{
        translateTo(index){
            this.showing = index
        },
        openModal(){
            const modal = document.querySelector('.modal-detail-order'),
                content = document.querySelector('.content-modal-detail-order')

            modal.style.display = "flex";

            setTimeout(() => {
                requestAnimationFrame(() => {
                    content.classList.add('open-animate-content')
                    modal.classList.add('open-animate-modal')
                })
            },50)
        },
        closeModal(){
            const modal = document.querySelector('.modal-detail-order'),
            content = document.querySelector('.content-modal-detail-order')

            requestAnimationFrame(() => {
                content.classList.remove('open-animate-content');
            })
            setTimeout(() => {
                modal.classList.remove('open-animate-modal')
            }, 100)
            setTimeout(() => {
                document.querySelector(".wrapper-modal").scrollTo(0,0)
            }, 180);
            setTimeout(() => {
                modal.style.display = "none"

                this.resetModal()
            }, 300);
        },
        resetModal(){
            this.orderId = undefined;
            this.productOrderId = undefined;
            this.translateTo("detail-order");
        },
        clickCloseModal(element){
            if(element.target.classList.contains('wrapper-modal'))
                this.closeModal()
        }
    }
}
</script>

<style lang="scss" scoped>
    .modal{
        width:100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        transition: 150ms;
    }
    .wrapper-modal{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: {
            x:hidden;
            y:auto;
        };
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .background-modal-detail-order{
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.75);
        position: fixed;
        top: 0;
        left: 0;
        z-index: -5;
        pointer-events: all;
    }
    .content-modal-detail-order{
        width: 100%;
        max-width: 850px;
        min-height: 50vh;
        border-radius: 10px;
        background-color: #fff;
        margin-bottom: 30px;
        pointer-events: all;
        transform: scale(0.92,0.92);
        transition: transform 310ms ;
        position: absolute;
        top: 100px;
        left: calc(50% - 425px);
        overflow: hidden;
    }
    .wrapper-grid{
        width: 200%;
        height: auto;
        display: grid;
        grid-template-areas: "detail_order detail_product";
        grid-template-columns: repeat(2, 50%);
        grid-template-rows: 100%;
        // column-gap: 10px;
        transition: 250ms;
    }
    // animation translate
    .is-showing-order{
        transform: translateX(0);
    }
    .is-showing-product{
        transform: translateX(-50%)
    }

    .wrapper-detail-order{
        width: 100%;
        grid-area: detail_order;
        padding: 20px;

    }
    .wrapper-detail-product{
        width: 100%;
        grid-area: detail_product;
        padding: 20px;
    }

    .content-absolute{
        position: absolute;
        top: 50px;
        left: calc(50% - 425px);
    }

    // Animations modal
    .open-animate-content{
        transform: scale(1,1);
    }
    .open-animate-modal{
        opacity: 1;
    }

    ::v-deep .title{
		font-size: 2.2em;
		font-weight: bold;
		margin: 20px 0 10px 0;
    }
    
    .close-details-orders {
        display: block;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgb(255, 255, 255);
        padding: 5px;
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
        box-shadow: 1px 1px 3px #a5a5a5;
        z-index: 1;
        &:hover {
            box-shadow: 1px 1px 3px #8f8f8f;
        }
        svg {
            transition: 130ms;
        }
        &:active svg {
            transform: scale(0.6);
        }
    }
</style>