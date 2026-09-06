<!-- src/components/dashboard/WelcomeHeader.vue -->
 
<script setup lang="ts">
// ============================================================
//                     SALUDO + NOMBRE
// ============================================================

// BACKEND: userName debe venir de la sesión real (mismo dato
// que se le pasa a <TopBar>). Se menciona en App.vue.
interface Props {
  userName?: string
}

withDefaults(defineProps<Props>(), {
  userName: 'Invitado'
})
</script>

<template>
  <div class="welcome-header">
    <p class="welcome-header__greeting">Hola, bienvenido</p>
    <h1 class="welcome-header__name">
      {{ userName }}
      <!-- Barra decorativa vacía -->
      <span class="welcome-header__underline" />
    </h1>
  </div>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.welcome-header {
  text-align: center;
  padding: 0.25rem 0 1.5rem;
}

.welcome-header__greeting {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  color: #f8f8f2;
  opacity: 0.6;
  margin: 0 0 0.5rem;
}

.welcome-header__name {
  position: relative;
  display: inline-block;
  font-family: 'Fira Code', monospace;
  font-size: 5rem;
  font-weight: 700;
  color: #f8f8f2;
  margin: 0;
  padding-bottom: 0.4rem;
}

.welcome-header__underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: #4DF0BA;
  border-radius: 999px;
  transition: width 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}

.welcome-header__name:hover .welcome-header__underline {
  width: 100%;
}
</style>