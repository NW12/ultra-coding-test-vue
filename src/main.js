import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const store = createStore({
    state() {
        return {
            keyPairs: []
        }
    },
    mutations: {
        // save updated key pairs
        updateKeys(state, pairs = []) {
            state.keyPairs = pairs
        }
    },
    getters: {
        // getter to get pair by public key
        getPairByPublicKey: (state) => (pubKey) => {
            return state.keyPairs.find(pair => pair.publicKey === pubKey)
        }
    }
})

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
