<template>
    <div>
        <card-operation-status 
            :statusOperation=statusOperation 
            :isLoading="isLoadingHours || isLoadingOperation"
            :error="errorHours || errorOperation"
            @event-open-popup=openPopup
            @event-refresh=refresh />
        
        <wrapper-popup 
            :open=open 
            :uid=uid 
            :statusOperation=statusOperation 
            :isLoading="isLoadingHours || isLoadingOperation"
            :error="errorHours || errorOperation"
            @event-close-popup=closePopup 
            @event-refresh=refresh />
    </div>
</template>

<script>

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

import cardOperationStatus from "./cardOperationStatus";
import wrapperPopup from "./wrapperPopup";
import Axios from "axios";
import { mapGetters } from 'vuex';

export default {
    name: "operation-status",
    components:{
        cardOperationStatus,
        wrapperPopup
    },
    computed:{
        ...mapGetters({
            uid: "user/uid"
        }),
        statusOperation(){
            return {
                isOpen: this.inOperation && !this.closedByTime,
                in_operation: this.inOperation,
                hours: this.closedByTime
            }
        },
        closedByTime(){
            if(!this.openingHours.length ) 
                return true;

            const currentOpeningHour = this.openingHours[dayjs().day()];

            const s = dayjs().isBetween(dayjs(currentOpeningHour.start, "HH-mm"), dayjs("23:59", "HH-mm")),
                e = dayjs().isBetween(dayjs("00:00", "HH-mm"), dayjs(currentOpeningHour.end, "HH-mm"));
                
            if(currentOpeningHour.closed === "1"){
                return true;
            }else{
                if(!(s && e)){
                    return true;
                }else{
                    return false;
                }
            }
        }
    },
    data(){
        return{
            // In operation
            open: false,
            inOperation: 0,
            errorOperation:"",
            isLoadingOperation:false,
            // Hours
            openingHours: [],
            isLoadingHours: false,
            errorHours: "",
            is_closed: false,
        }
    },
    created(){
        this.getEstablishent()
        this.fetchHours()
    },
    methods:{
        openPopup(){
            this.open = true;
        },
        closePopup(){
            this.open = false
        },
        refresh(){
            this.getEstablishent()
            this.fetchHours()
        },
        async getEstablishent(){
            this.errorOperation = ""
            this.isLoadingOperation = true;
            const url = "https://api.buscavarejos.com/estabelecimentos/configuracoes?fields=in_operation"
            try {
                const { data } = await Axios.get(url, {
                    headers:{
                        "uid": this.uid
                    }
                })
				this.inOperation = data.in_operation
            } catch (error) {
                console.error(error)
                this.errorOperation = "Ops, ocorreu um problema!";
            }finally{
                this.isLoadingOperation = false
            }
        },       
        async fetchHours(){
            this.errorHours = ''
            this.isLoadingHours = true;

            const url = "https://api.buscavarejos.com/estabelecimentos/configuracoes/horarios"
            try {
                const { data } = await Axios.get(url, {
                    headers:{
                        "uid": this.uid
                    }
                })

                this.openingHours = data
            } catch (error) {
                console.error(error)
                this.errorHours = "Ops, ocorreu um erro! Tente novamente"
            }finally{
                this.isLoadingHours = false
            }
        }
    }
}
</script>

<style>

</style>