<template>
    <div class="content-skeleton">
        <ul class="list-informations-order">
            <li>
                <span class="skeleton key"></span>
                <span class="skeleton val"> </span>
            </li>
            <li>
                <span class="skeleton key"></span>
                <span class="skeleton val"> </span>
            </li>
            <li>
                <span class="skeleton key"></span>
                <span class="skeleton val"> </span>
            </li>
            <li>
                <p>
                    <span class="skeleton key"></span>
                    <span class="skeleton val val-shorted"> </span>
                    <span class="skeleton key key-shorted"></span>
                    <span class="skeleton val val-shorted"> </span>
                </p>
            </li>
            <li>
                <p>
                    <span class="skeleton key"></span>
                    <span class="skeleton val val-shorted"> </span>
                    <span class="skeleton key key-shorted"></span>
                    <span class="skeleton val val-shorted"> </span>
                </p>
            </li>
            <li>
                <span class="skeleton key"></span>
                <span class="skeleton val-message-client"> </span>
            </li>
        </ul>
        <div>
            <p class="skeleton key" style="margin-top: 5px;"></p>
            <table class="table-addendums">
                <tbody>
                    <tr v-for="i in 3" :key="i">
                        <td class="skeleton"></td>
                        <td class="skeleton"></td>
                        <td class="skeleton"></td>
                        <td class="skeleton"></td>
                    </tr>
                </tbody>
            </table>
        </div>
  </div>
</template>

<script>
export default {
    name:"skeleton-animation"
}
</script>

<style lang="scss" scoped>
    
    .content-skeleton{
        width: 100%;
        height: auto;
    }    
    .skeleton{
        border-radius: 5px;
        opacity: .5;
    }
    .list-informations-order{
        height: auto;
		li{
            height: 40px;
            padding: 5px 0;
            display: block;
		}
    }
    .key{
        width: 170px;
        height: 26px;
        display: inline-block;
        margin-right: 5px;
    }
    .key-shorted{
        width: 55px;
    }
    .val{
        width: 220px;
        height: 26px;
        display: inline-block;
    }
    .val-shorted{
        width: 120px;
        margin-right: 80px;
    }
    .val-message-client{
        width: calc(100% - 175px);
        height: 26px;
        display: inline-block;
    }
    
    .table-addendums{
        width: 100%;
        height: auto;
        border-collapse: separate;
        border-spacing: 8px;
        th, td{
            width: 25%;
            height: 28px;
        }
    }
</style>