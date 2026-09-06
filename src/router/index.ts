// src/router/index.ts

// ============================================================
//          Definición central de rutas de la aplicación. 
// ============================================================
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'
import ConfigView from '../views/ConfigView.vue'

const router = createRouter({
  // createWebHistory = URLs normales (/perfil)
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/perfil',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/configuracion',
      name: 'config',
      component: ConfigView
    }
    // TO-DO: rutas, /comunidad, /proyectos,
  ]
})

export default router