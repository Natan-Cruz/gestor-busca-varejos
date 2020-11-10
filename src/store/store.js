import Vue from "vue";
import Vuex from "vuex";
import orders from "./modules/orders";
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        orders,
        user
    },
    strict: debug
});