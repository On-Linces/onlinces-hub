<!-- src/views/ConfigView.vue -->

<script setup lang="ts">
// ============================================================
//                    LAYOUT CONFIGURACIONES
// ============================================================
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// ============================================================
//              COMPONENTES DE CONFIGURACIONES
// ============================================================
import CardShell from '../components/dashboard/CardShell.vue'
import SettingsToggle from '../components/settings/SettingsToggle.vue'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { settings } = useTheme()

const effectsAsString = computed({
  get: () => (settings.value.effectsEnabled ? 'on' : 'off'),
  set: (val: string) => {
    settings.value.effectsEnabled = val === 'on'
  }
})

function handleLogout() {
  // BACKEND: aquí debería invalidar la sesión, logout
  router.push('/')
}
</script>

<template>
  <main class="config-view">
    <button class="config-view__back" @click="router.push('/')">
      ← Volver al Dashboard
    </button>

    <CardShell title="Configuración" accent="purple" full-width>
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      </template>

      <div class="config-section">
        <h3 class="config-section__title">Apariencia</h3>

        <SettingsToggle
          label="Tema"
          v-model="settings.colorTheme"
          :options="[
            { value: 'dark', text: 'Negro' },
            { value: 'light', text: 'Blanco' }
          ]"
        />

        <SettingsToggle
          label="Elementos"
          v-model="settings.elementStyle"
          :options="[
            { value: 'rounded', text: 'Redondeados' },
            { value: 'flat', text: 'Planos' }
          ]"
        />

        <SettingsToggle
          label="Efectos"
          v-model="effectsAsString"
          :options="[
            { value: 'on', text: 'Activados' },
            { value: 'off', text: 'Apagados' }
          ]"
        />
      </div>

      <div class="config-section">
        <h3 class="config-section__title">Cuenta</h3>
        <button class="config-view__logout" @click="handleLogout">
          Cerrar sesión
        </button>
      </div>
    </CardShell>
  </main>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.config-view {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

.config-view__back {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  transition: color var(--transition-speed) ease;
}

.config-view__back:hover {
  color: var(--accent-purple);
}

.config-section {
  margin-bottom: 2rem;
}

.config-section:last-child {
  margin-bottom: 0;
}

.config-section__title {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  margin: 0 0 0.5rem;
}

.config-view__logout {
  background: rgba(255, 85, 85, 0.15);
  color: #ff5555;
  border: 1px solid rgba(255, 85, 85, 0.4);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-speed) ease;
}

.config-view__logout:hover {
  background: rgba(255, 85, 85, 0.3);
}
</style>