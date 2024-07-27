import './assets/index.css'
import { createApp, Suspense } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
