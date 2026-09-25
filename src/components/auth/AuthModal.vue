<!-- src/components/auth/AuthModal.vue -->

<script setup lang="ts">
// ============================================================
//              MODAL DE LOGIN / REGISTRO
// ============================================================
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAuth } from '../../composables/useAuth'

interface Props {
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  success: []
}>()

const { login, register, loading, error } = useAuth()

type Tab = 'login' | 'register'
const tab = ref<Tab>('login')

const form = ref({
  name: '',
  email: '',
  password: ''
})

function resetForm() {
  form.value = { name: '', email: '', password: '' }
  tab.value = 'login'
}

async function onSubmit() {
  try {
    if (tab.value === 'login') {
      await login(form.value.email, form.value.password)
    } else {
      await register({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      })
    }
    emit('success')
    emit('close')
    resetForm()
  } catch {
    // el error ya esta en el useAuth :D
  }
}

// Bloqueo de scroll + Escape
watch(
  () => props.open,
  val => {
    document.body.style.overflow = val ? 'hidden' : ''
    if (!val) resetForm()
  }
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="auth-modal"
      role="dialog"
      aria-modal="true"
      @click="emit('close')"
    >
      <div class="auth-modal__content" @click.stop>
        <!-- Cabecera con pestañas -->
        <div class="auth-modal__tabs">
          <button
            class="auth-modal__tab"
            :class="{ 'auth-modal__tab--active': tab === 'login' }"
            @click="tab = 'login'"
            type="button"
          >
            Iniciar sesión
          </button>
          <button
            class="auth-modal__tab"
            :class="{ 'auth-modal__tab--active': tab === 'register' }"
            @click="tab = 'register'"
            type="button"
          >
            Registrarse
          </button>

          <button
            class="auth-modal__close"
            @click="emit('close')"
            aria-label="Cerrar"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Formulario -->
        <form class="auth-modal__form" @submit.prevent="onSubmit">
          <div v-if="error" class="auth-modal__error">{{ error }}</div>

          <label v-if="tab === 'register'" class="auth-modal__field">
            <span>Nombre</span>
            <input
              v-model="form.name"
              type="text"
              autocomplete="name"
              required
              :disabled="loading"
            />
          </label>

          <label class="auth-modal__field">
            <span>Correo</span>
            <input
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              :disabled="loading"
            />
          </label>

          <label class="auth-modal__field">
            <span>Contraseña</span>
            <input
              v-model="form.password"
              type="password"
              :autocomplete="tab === 'login' ? 'current-password' : 'new-password'"
              required
              :disabled="loading"
            />
          </label>

          <button
            type="submit"
            class="auth-modal__submit"
            :disabled="loading"
          >
            {{ loading ? 'Procesando...' : (tab === 'login' ? 'Entrar' : 'Crear cuenta') }}
          </button>

          <!-- BACKEND: nota visual para recordarte que aun no tiene trasero, dale uno rafaaaa-->
          <p class="auth-modal__hint">
            Modo demo: cualquier correo y contraseña funcionan.
          </p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.auth-modal {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.auth-modal__content {
  width: 100%;
  max-width: 420px;
  background: var(--bg-surface);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glow);
  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* ============================================================
                        TABS
============================================================ */
.auth-modal__tabs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
  position: relative;
}

.auth-modal__tab {
  background: transparent;
  border: none;
  padding: 0.7rem 1rem;
  font-family: var(--font-family);
  font-size: 0.95rem;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
  transition: color var(--transition-speed) ease,
              background var(--transition-speed) ease;
}

.auth-modal__tab:hover {
  color: var(--text-primary);
}

.auth-modal__tab--active {
  color: var(--accent-purple);
  background: var(--accent-purple-dim);
  font-weight: 600;
}

.auth-modal__close {
  margin-left: auto;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xs);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.auth-modal__close:hover {
  border-color: var(--accent-purple);
  color: var(--accent-purple);
}

.auth-modal__close svg {
  width: 16px;
  height: 16px;
}

/* ============================================================
                        FORM
============================================================ */
.auth-modal__form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-modal__error {
  background: rgba(255, 85, 85, 0.12);
  border: 1px solid rgba(255, 85, 85, 0.4);
  color: #ff5555;
  font-family: var(--font-family);
  font-size: 0.85rem;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-xs);
}

.auth-modal__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.auth-modal__field span {
  font-family: var(--font-family);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.auth-modal__field input {
  background: var(--bg-hover);
  border: 1px solid var(--border-color);
  padding: 0.7rem 0.9rem;
  border-radius: var(--radius-xs);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 0.95rem;
  outline: none;
  transition: border-color var(--transition-speed) ease,
              background var(--transition-speed) ease;
}

.auth-modal__field input:focus {
  border-color: var(--accent-purple);
  background: var(--accent-purple-dim);
}

.auth-modal__submit {
  margin-top: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: var(--accent-purple);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease,
              opacity var(--transition-speed) ease;
}

.auth-modal__submit:hover:not(:disabled) {
  transform: var(--hover-transform);
  box-shadow: 0 4px 15px var(--accent-purple-glow);
}

.auth-modal__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-modal__hint {
  margin: 0;
  font-family: var(--font-family);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  font-style: italic;
}
</style>