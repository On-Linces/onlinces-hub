<script setup lang="ts">
// ============================================================
//                      LAYOUT GLOBAL
// ============================================================
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from './components/layout/TopBar.vue'
import BottomBar from './components/layout/BottomBar.vue'
import AuthModal from './components/auth/AuthModal.vue'

// BACKEND — es pura plantilla sobrepuesta, cuando exista sesión real, este dato debe
// venir de un composable/store (ej: useAuth()), y pasarse tanto
// aquí (TopBar) como en cada vista que lo necesite (ProfileView).
//
// Con useAuth ya integrado, TopBar consume la sesión directamente
// y los props quedan como fallback. Cuando el backend real exista,
// basta con que useAuth haga fetch y todo lo demás sigue igual.

const router = useRouter()

// Estado del modal de autenticación. Se monta aquí para que esté
// disponible desde cualquier vista (TopBar vive en App.vue).
const authOpen = ref(false)

function onLoginClick() {
  authOpen.value = true
}

function onAuthSuccess() {
  // Por ahora: al autenticarse, ir al dashboard.
  // BACKEND: aquí se podría redirigir a la ruta previa guardada,
  // o a /perfil si es un registro nuevo, etc.
  router.push('/')
}
</script>

<template>
  <!-- BACKEND: user-name y unread-notifications → sesión real -->
  <TopBar
    user-name="lildud"
    :unread-notifications="67"
    @login-click="onLoginClick"
    @profile-click="router.push('/perfil')"
  />

  <!-- router-view renderiza la vista que corresponda a la URL
       actual: DashboardView en "/", ProfileView en "/perfil", etc.
       App.vue ya NO conoce el contenido de cada vista — solo el
       layout que las envuelve. -->
  <router-view />

  <BottomBar />

  <!-- Modal de autenticación global -->
  <AuthModal
    :open="authOpen"
    @close="authOpen = false"
    @success="onAuthSuccess"
  />
</template>