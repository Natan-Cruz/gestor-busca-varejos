    const state = () => ({
        loggedIn: false,
        data: null
    });

    const getters = {
        user(state) {
            return {
                loggedIn: state.loggedIn,
                data: state.data
            }
        },
        uid(state) {
            return (state.data) && state.data.uid
        }
    }
    const mutations = {
        SET_LOGGED_IN(state, value) {
            state.loggedIn = value;
        },
        SET_USER(state, data) {
            state.data = data;
        },
    }

    const actions = {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    id: user.id,
                    uid: user.uid,
                    displayName: user.name,
                    email: user.email,
                    photoURL: user.photoURL,
                });
            } else {
                commit("SET_USER", null);
            }
        }
    }
    export default {
        namespaced: true,
        state,
        getters,
        actions,
        mutations
    }