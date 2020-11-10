<template>
    <button type="submit" class="button button-primary" :disabled="loading" :class=" loading ? 'active-loading' : '' ">
        <div class="ctn-text-button">
            <span class="text-button">Entrar</span>
        </div>
        <span class="spinner-loading-button"></span>
    </button>
</template>
<script>
export default {
    name:"button-local",
    props:{
        loading: Boolean,
    }
}
</script>
