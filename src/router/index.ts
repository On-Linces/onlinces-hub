// src/router/index.ts

// ============================================================
//          Definición central de rutas de la aplicación. 
// ============================================================
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'

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
    }
    // TO-DO: rutas configuracion, /comunidad, /proyectos,
  ]
})

export default router