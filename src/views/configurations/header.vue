<template>
    <header>
        <h1 class="title">Configurações</h1>
    </header>
</template>

<script>
export default {
    name:"custom-header"
}
</script>

<style lang="scss" scoped>
    header{
		width: calc(100% - 40px);
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0 5px 20px;
		background: #fff;
        margin: 15px auto 25px auto;
        border-bottom: solid 1px rgb(232, 232, 232);
	}
	.title{
		font-size: 2.6em;
		line-height: 1em;
		font-weight: bold;
	}
</style>