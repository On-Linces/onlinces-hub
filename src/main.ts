// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(router) // usa <router-view>, <router-link>, useRouter(), para navegar entre pags.

app.mount('#app')