<template>
    <div>
        <div class="background"></div>
        <main> 
            <custom-header :uid=user.data.uid ></custom-header>
            <grid-orders></grid-orders>
        </main>
        <modal-detail-order></modal-detail-order>
    </div>
</template>

<script>
import customHeader from "./header"
import gridOrders from "./gridOrders/index";
import modalDetailOrder from "../modalDetailOrder/index";
import { mapGetters } from 'vuex';

export default {
    name:"order-component",
    components:{
        customHeader,
        gridOrders,
        modalDetailOrder
    },
    computed:{
        ...mapGetters({
            user: "user/user"
        })
    },
    data(){
        return{ 
            CODE_ESCAPE: 27
        }
    },
    methods:{
        monitoringKeyPress(e){
            if(e.keyCode === this.CODE_ESCAPE){
               this.$bus.$emit("event-close-modal-detail-order")
            }
        }
    },
    mounted(){
        window.addEventListener("keydown", this.monitoringKeyPress, false)
    },
    beforeDestroy(){
        window.removeEventListener("keypress", this.monitoringKeyPress, false )
    }
}
</script>

<style lang="scss" scoped>
    $headerHeight: 50px;
    .background {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left:0;
        z-index: -1;
        // background: url(https://images.wallpaperscraft.com/image/tangerines_fruits_citrus_191485_1280x720.jpg);
    }
    main{
        width: 98%;
        height: 100vh;
        margin: 0 auto 0 auto;
        overflow: hidden;
    }
</style>