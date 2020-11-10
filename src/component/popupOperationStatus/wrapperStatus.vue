<template>
    <div>
        <p class="text-medium" v-if="isLoading">Carregando...</p>
        <p class="text-medium" v-else-if="error">{{ error }}</p>
        <div v-if="!error && !isLoading"> 
            <div class="ctn-status">
                <span class="text-medium bold" style="color:#404040">Status:</span>
                <span class="text-medium bold text-status" :class="{ 'open-establishment': statusOperation.isOpen, 'closed-establishment': !statusOperation.isOpen }"> {{ statusOperation.isOpen ? "Aberto" : "Fechado" }} </span>
            </div>
            <div class="container-text-status" v-if="statusOperation.hours && !statusOperation.in_operation" >
                <p class="bold text-status-explanation"> <span class="sub-text">&#9888;</span> Fechado devido ao horário</p>   
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: "wrapper-status"
}
</script>

<style lang="scss" scoped>

</style>