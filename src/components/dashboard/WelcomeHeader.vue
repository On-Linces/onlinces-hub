<!-- src/components/dashboard/WelcomeHeader.vue -->
 
<script setup lang="ts">
// ============================================================
//                     SALUDO + NOMBRE
// ============================================================
import { computed } from 'vue'
import { useAuth } from '../../composables/useAuth'

// BACKEND: userName debe venir de la sesión real osea del trasero (mismo dato
// que se le pasa a <TopBar>). Se menciona creo que en App.vue.
//
// Con useAuth integrado, el nombre de la sesión tiene prioridad
// y la prop actúa como fallback mientras no hay login real.
interface Props {
  userName?: string
}

const props = withDefaults(defineProps<Props>(), {
  userName: 'Invitado'
})

const { user, isAuthenticated } = useAuth()

// Nombre efectivo: sesión > prop > 'Invitado'
const displayName = computed(() => {
  if (isAuthenticated.value && user.value?.name) return user.value.name
  return props.userName || 'Invitado'
})

// Saludo distinto según si hay sesión o no
const greeting = computed(() =>
  isAuthenticated.value ? 'Hola, bienvenido de nuevo' : 'Hola, bienvenido'
)
</script>

<template>
  <div class="welcome-header">
    <p class="welcome-header__greeting">{{ greeting }}</p>
    <h1 class="welcome-header__name">
      {{ displayName }}
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
  font-family: var(--font-family);
  font-size: 1.1rem;
  color: var(--text-muted);
  opacity: 0.6;
  margin: 0 0 0.5rem;
}

.welcome-header__name {
  position: relative;
  display: inline-block;
  font-family: var(--font-family);
  font-size: 5rem;
  font-weight: 700;
  color: var(--text-primary);
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
  background: var(--accent-teal);
  border-radius: 999px;
  transition: width var(--transition-speed) cubic-bezier(0.25, 1, 0.5, 1);
}

.welcome-header__name:hover .welcome-header__underline {
  width: 100%;
}
</style>