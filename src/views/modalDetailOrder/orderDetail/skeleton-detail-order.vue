<template>
    <div class="content-skeleton">
        <span class="skeleton skeleton-header-order"></span>
        <span class="skeleton skeleton-title"></span>
        <!-- Informartions user -->
        <div class="wrapper-info-user">
			<div class="skeleton skeleton-container-photo"></div>
            <ul class="list-informations-user">
                <li class="skeleton"></li>
                <li class="skeleton"></li>
                <li class="skeleton"></li>
                <li class="skeleton"></li>
            </ul>
        </div>
        <!-- Products -->
        <span class="skeleton skeleton-title"></span>
        <div class="wrapper-info-user" style="margin-bottom:22px" v-for="n in 2" :key="n">
			<div class="skeleton skeleton-container-photo-product"></div>
            <ul class="list-informations-products">
                <li class="skeleton"></li>
                <li class="skeleton"></li>
                <li class="skeleton"></li>
            </ul>
        </div>
        <!-- container order -->
        <span class="skeleton skeleton-title"></span>
        <ul class="list-informations-status">
            <li class="skeleton"></li>
            <li class="skeleton"></li>
            <li class="skeleton"></li>
        </ul>
        <!-- Status -->
        <span class="skeleton skeleton-title"></span>
        <ul class="list-informations-status">
            <li class="skeleton"></li>
            <li class="skeleton"></li>
            <li class="skeleton"></li>
        </ul>
        <!-- Buttons -->
        <span class="skeleton skeleton-title"></span>
        <div class="group-buttons">
            <span class="skeleton skeleton-button btn_50"></span>
            <span class="skeleton skeleton-button btn_50"></span>
        </div>
        <span class="skeleton skeleton-button"></span>
  </div>
</template>

<script>
export default {
    name:"skeleton-details-order",
    props:{
        is_loading: {
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
    
    .skeleton{
        border-radius: 5px;
        opacity: .5;
    }
    .skeleton-header-order {
        width: 180px;
        height: 22px;
        color: #ccc;
    }
	.skeleton-title{
		width: 200px;
		height: 32px;
        color:#ccc;
		margin: 18px 0 10px 0;

    }
    // container user
    .wrapper-info-user{
        width: 100%;
        height: auto;
		display: flex;
		justify-content: start;
		flex-direction: row;
		align-items: center;
	}
	.skeleton-container-photo{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 30px;
    }
    .list-informations-user{
        width: calc(100% - 110px);
		// height: 156px;
		li{
            width: 100%;
            height: 26px;
            margin: 4px 0;
            display: inline-block;
        }
        li:first-child{
            margin: 6px 0;
        }
    }
    
    // container products 
    .skeleton-container-photo-product{
        width: 70px;
        height: 70px;
        border-radius: 5px;
        margin: 12px 10px;
    }   
    .list-informations-products{
        width: calc(100% - 110px);
		li{
            width: 100%;
            height: 20px;
            margin: 6px 0;
        }
    }
    
    // container status
    .list-informations-status{
        width: 300px;
		li{
            width: 100%;
            height: 26px;
            margin: 4px 0;
            display: inline-block;
        }
    }
    .group-buttons{
		display: flex; 
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		// margin: 20px 0 50px 0;
	}
    .skeleton-button{
        width: 100%;
        height: 54px;
		color:#ccc;
        background-color:#ccc;
        margin: 5px 0
    }
    .btn_50{
        width: 49%;
    }
</style>