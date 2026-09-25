// src/router/index.ts

// ============================================================
//          Definición central de rutas de la aplicación. 
// ============================================================
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'
import ConfigView from '../views/ConfigView.vue'
import MembersView from '../views/MembersView.vue'
import GalleryView from '../views/GalleryView.vue'
import { useAuth } from '../composables/useAuth'

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
    },
    {
      path: '/miembros',
      name: 'members',
      component: MembersView
    },
    {
      path: '/galeria',
      name: 'gallery',
      component: GalleryView
    }
    // TO-DO: rutas, /comunidad, /proyectos,
  ]
})

// ============================================================
//          GUARD: /perfil requiere sesión activa
// ============================================================
// Sin cuenta, evita que se entre al perfil usando el link, no pass broda
router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()
  if (to.name === 'profile' && !isAuthenticated.value) {
    return { name: 'dashboard' }
  }
})

export default router