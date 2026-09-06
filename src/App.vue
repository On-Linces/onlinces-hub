<script setup lang="ts">
// ============================================================
// LAYOUT GLOBAL — aparece en TODAS las vistas, sin importar la ruta
// ============================================================
import TopBar from './components/layout/TopBar.vue'
import BottomBar from './components/layout/BottomBar.vue'

// BACKEND — es pura plantilla sobre puesta, cuando exista sesión real, este dato debe
// venir de un composable/store (ej: useAuth()), y pasarse tanto
// aquí (TopBar) como en cada vista que lo necesite (ProfileView).
</script>

<template>
  <!-- BACKEND: user-name y unread-notifications → sesión real -->
  <TopBar user-name="lildud" :unread-notifications="67" />

  <!-- router-view renderiza la vista que corresponda a la URL
       actual: DashboardView en "/", ProfileView en "/perfil", etc.
       App.vue ya NO conoce el contenido de cada vista — solo el
       layout que las envuelve. -->
  <router-view />

  <BottomBar />
</template>