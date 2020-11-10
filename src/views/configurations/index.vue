<template>
    <div>
        <custom-header></custom-header>
        <main>
            <wrapper-profile :user=user.data></wrapper-profile>
            <hr>
            <wrapper-notification></wrapper-notification>
            <hr>
            <wrapper-about></wrapper-about>
        </main>
    </div>
</template>

<script>
import customHeader from "./header";

import wrapperProfile from "./profile"
import wrapperNotification from "./notifications";
import wrapperAbout from "./about";
import { mapGetters } from 'vuex';

export default {
    name:"configurations",
    components:{
        customHeader,
        wrapperProfile,
        wrapperNotification,
        wrapperAbout
    },
    computed:{
        ...mapGetters({
            user: "user/user"
        })
    }
}
</script>

<style lang="scss" scoped>
    main{
        width: 560px;
        margin: 0 20px 0 20px;
    }
    ::v-deep .sub-title{
        font-size: 2em;
        line-height: 1em;
        font-weight: bold;
        color: rgb(65, 65, 65);
    }

    hr{
        border: dashed 1px rgba(211, 211, 211, 0.6);
        margin: 15px 0 35px 0;
    }
</style>