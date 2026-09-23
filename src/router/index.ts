// src/router/index.ts

// ============================================================
//          Definición central de rutas de la aplicación. 
// ============================================================
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'
import ConfigView from '../views/ConfigView.vue'
import MembersView from '../views/MembersView.vue'

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
      component: ConfigView,
    },
    {
      path: '/miembros',
      name: 'members',
      component: MembersView
    }
    // TO-DO: rutas, /galeria, /proyectos,
  ]
})

export default router