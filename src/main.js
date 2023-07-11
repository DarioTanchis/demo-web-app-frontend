import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import vueAxios from 'vue-axios'

const pinia = createPinia().use(piniaPluginPersistedstate);

createApp(App)
.use(router)
.use(pinia)
.use(vueAxios, axios)
.mount('#app')
