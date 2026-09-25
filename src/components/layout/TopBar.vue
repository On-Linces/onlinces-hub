<!-- src/components/layout/TopBar.vue -->

<script setup lang="ts">
// ============================================================
//                        BARRA SUPERIOR
// ============================================================
import { computed } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useAuth } from '../../composables/useAuth'

// ============================================================
//                       ASSETS ESTÁTICOS
// ============================================================
import logoDark from '../../assets/images/logo_dark.webp'
import logoLight from '../../assets/images/logo_light.webp'

const { settings } = useTheme()
const { user, isAuthenticated } = useAuth()

// Si el tema es light, usa la versión light; si no, la dark.
const currentLogo = computed(() => 
  settings.value.colorTheme === 'light' ? logoLight : logoDark
)

// BACKEND: 
// Estos 3 parametros son exactamente lo que necesita recibir
// del sistema de sesión/SSO cuando exista. No hace falta cambiar
// nada de este componente: solo quien lo usa debe pasarle valores
// reales en vez de los defaults de abajo.
//
// Con la llegada de useAuth, estos props actúan como FALLBACK:
// si hay sesión activa, los datos de la sesión tienen prioridad;
// si no, se usan los props (útil mientras el backend no exista).
interface Props {
    userName?: string          // nombre a mostrar junto al avatar
    avatarUrl?: string          // URL de la foto; si viene vacío, se
                                 // muestra la inicial del nombre (ver template)
    unreadNotifications?: number // cantidad para el badge de la campana
}

const props = withDefaults(defineProps<Props>(), {
    userName: 'Invitado',   // valor mientras no hay sesión iniciada
    avatarUrl: '',
    unreadNotifications: 0
})

// TO-DO: panel de notificaciones
// Se añade 'loginClick' para abrir el modal de autenticación global.
const emit = defineEmits<{
    notificationClick: []
    profileClick: []
    loginClick: []
}>()

// Datos efectivos: sesión > props
const displayName = computed(() => user.value?.name ?? props.userName)
const displayAvatar = computed(() => user.value?.avatarUrl ?? props.avatarUrl)
const displayUnread = computed(
    () => user.value?.unreadNotifications ?? props.unreadNotifications
)
</script>

<template>
    <header class="topbar">
        <!-- Logo + nombre de pagina -->
        <div class="topbar__brand">
            <img :src="currentLogo" alt="OnLinces" class="topbar__logo" />
            <span class="topbar__title">
                <span class="title__keyword">community</span><span class="title__method">.hub</span><span class="title__parens">()</span>
            </span>
        </div>

        <div class="topbar__actions">
            <!-- ============================================================
                 SIN SESIÓN: solo botón de login
            ============================================================ -->
            <button
                v-if="!isAuthenticated"
                class="topbar__login"
                @click="emit('loginClick')"
            >
                Iniciar sesión
            </button>

            <!-- ============================================================
                 CON SESIÓN: campana + perfil
            ============================================================ -->
            <template v-else>
                <!-- Botón de notificaciones -->
                <button
                    class="topbar__icon-btn"
                    aria-label="Notificaciones"
                    @click="emit('notificationClick')"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>

                    <!-- El numero solo aparece si hay notificaciones sin leer -->
                    <span v-if="displayUnread > 0" class="topbar__badge">
                        {{ displayUnread }}
                    </span>
                </button>

                <!-- Perfil de usuario -->
                <button class="topbar__profile" @click="emit('profileClick')">
                    <div class="topbar__avatar">
                        <!-- Si hay avatarUrl (foto del SSO), se muestra la imagen.
                             Si no, cae al fallback: inicial del nombre en mayúscula.-->
                        <img v-if="displayAvatar" :src="displayAvatar" :alt="displayName" />
                        <span v-else>{{ displayName.charAt(0).toUpperCase() }}</span>
                    </div>
                    <span class="topbar__username">{{ displayName }}</span>
                </button>
            </template>
        </div>
    </header>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.topbar {
  position: sticky;
  top: 1rem;
  z-index: 100;
  display: flex;
  width: calc(100% - 2rem);
  max-width: 1400px;
  margin: 0 auto 1.5rem auto;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;

  background: var(--bg-surface);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-glow);

  font-family: var(--font-family);
  color: var(--text-primary);
  transition: background var(--transition-speed),
              border var(--transition-speed),
              color var(--transition-speed),
              box-shadow var(--transition-speed);
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.topbar__logo {
  height: 40px;
  width: auto;
}

.topbar__title {
  font-size: 1.3rem;
  letter-spacing: 0.5px;
  color: var(--text-primary);
}

.title__keyword { color: var(--accent-purple); }
.title__method  { color: var(--text-primary); }
.title__parens  { color: var(--accent-pink); }

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* ------------------------------------------------------------
                        Botón de login
------------------------------------------------------------ */
.topbar__login {
  padding: 0.5rem 1.1rem;
  background: var(--accent-purple-dim);
  color: var(--accent-purple);
  border: 1px solid var(--accent-purple);
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.topbar__login:hover {
  background: var(--accent-purple);
  color: var(--text-primary);
  box-shadow: 0 0 15px var(--accent-purple-glow);
  transform: var(--hover-transform);
}

.topbar__icon-btn {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  cursor: pointer;
  padding: 0.6rem;
  border-radius: var(--radius-sm);
  color: var(--accent-teal);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed) ease;
}

.topbar__icon-btn:hover {
  filter: brightness(1.25);
  transform: var(--hover-scale);
}

.topbar__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff5555;
  color: white;
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 999px;
  line-height: 1.2;
}

.topbar__profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
}

.topbar__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  overflow: hidden;
  color: var(--text-primary);
}

.topbar__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topbar__username {
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--text-primary);
}
</style>