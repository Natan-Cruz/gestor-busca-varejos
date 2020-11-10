const state = () => ({
    newOrders: [],
    ordersAccepted: [],
    groupedOrders: [],
    dispatchedOrders: []
});

const getters = {
    newOrders(state) {
        return state.newOrders
    },
    ordersAccepted(state) {
        return state.ordersAccepted
    },
    groupedOrders(state) {
        return state.groupedOrders
    },
    dispatchedOrders(state) {
        return state.dispatchedOrders
    }
}

const mutations = {
    REMOVE_ORDER(state, { key, orderId }) {
        const orders = state[key].filter(ord => {
            if (ord.id !== orderId)
                return ord
        })
        state[key] = orders
    },
    SET_ORDERS(state, { key, orders }) {
        state[key] = orders
    },
    PUSH_ORDER(state, { key, order }) {
        const hasOrder = state[key].filter(ord => {
            if (ord.id === order.id)
                return order
        })
        if (!hasOrder.length)
            state[key].push(order)
    }
}

const actions = {
    removeOrder({ commit }, { key, orderId }) {
        commit("REMOVE_ORDER", { key, orderId })
    },
    setOrders({ commit }, { key, orders }) {
        commit("SET_ORDERS", { key, orders });
    },
    pushOrder({ commit }, { key, order }) {
        commit("PUSH_ORDER", { key, order })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}