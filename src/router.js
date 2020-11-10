import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

import LoginComponent from './views/login/index';

import managerComponent from "./views/manager/index";
import OrdersComponent from './views/orders/index';
import ConfigurationComponent from "./views/configurations/index"

const routes = [{
        path: "/",
        redirect: "/gestor/pedidos"
    },
    {
        path: "/login",
        component: LoginComponent,
        meta: {
            requiresNotAuth: true
        }
    },
    {
        path: "/gestor",
        name: "gestor",
        component: managerComponent,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: "pedidos",
                name: "gestor/pedidos",
                component: OrdersComponent
            },
            {
                path: "configuracoes",
                name: "gestor/configuracoes",
                component: ConfigurationComponent
            }
        ]
    },
    {
        path: "*",
        redirect: "/gestor"
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes: routes
})

export default router