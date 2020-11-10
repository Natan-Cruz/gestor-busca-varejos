import Vue from 'vue'
import App from './App.vue'
import store from './store/store';
import router from "./router";
import EventBus from './plugins/mixin-event-bus.js'
import auth from "./firebase/auth";
import audioNotification from './plugins/audioNotification';

import spinnerLoadingComponent from './components/SpinnerLoading.vue';
import errorComponent from './components/ErrorComponent.vue';


auth.on("onAuthStateChanged", (user) => {
    store.dispatch("user/fetchUser", user);
})

Vue.mixin(EventBus)
Vue.use(audioNotification)

Vue.config.productionTip = false;

router.beforeEach(async(to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth),
        requiresNotAuth = to.matched.some(record => record.meta.requiresNotAuth);

    const user = auth.getCurrentUser();
    // Caso a pagina necessite que o usuario esteja logado para continuar
    // Redireciona o mesmo para a pagina de login
    if (requiresAuth && !user) {
        return next({ path: '/login' });
        // Caso o usuario estaja logado e a pagina só pode ser exibida com ele deslogado
        // redireciona o usuario para a pagina de inicio
    } else
    if (requiresNotAuth && user)
        return next({ path: '/' })
    else
        return next()

});

Vue.component("spinner-loading", spinnerLoadingComponent);
Vue.component("error-component", errorComponent);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')