// src/composables/useAuth.ts

// ============================================================
//                  ESTADO GLOBAL De Auth
// ============================================================
import { ref, computed } from 'vue'

export interface AuthUser {
  name: string
  avatarUrl: string
  unreadNotifications: number
}

// ============================================================
// BACKEND: cuando exista el trasero, reemplaza los bloques
// marcados como BACKEND. La firma de las funciones no cambia,
// así que el resto del front no se entera.
// ============================================================
//
//   async function apiLogin(email: string, password: string) {
//     const res = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     })
//     if (!res.ok) throw new Error('Credenciales inválidas')
//     return await res.json() as AuthUser
//   }
//
//   async function apiRegister(data: {
//     name: string; email: string; password: string
//   }) {
//     const res = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     if (!res.ok) throw new Error('No se pudo registrar')
//     return await res.json() as AuthUser
//   }
//
//   async function apiLogout() {
//     await fetch('/api/auth/logout', { method: 'POST' })
//   }
// ============================================================

const STORAGE_KEY = 'onlinces-auth'

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

// Estado a nivel de módulo (compartido por toda la app)
const user = ref<AuthUser | null>(loadUser())
const loading = ref(false)
const error = ref<string | null>(null)

const isAuthenticated = computed(() => user.value !== null)

function persist() {
  if (user.value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

async function login(email: string, password: string) {
  loading.value = true
  error.value = null
  try {
    // BACKEND: reemplaza por:
    //   user.value = await apiLogin(email, password)
    //
    // Simulación actual:
    if (!email || !password) throw new Error('Completa todos los campos.')
    await new Promise(r => setTimeout(r, 400))
    user.value = {
      name: email.split('@')[0] || 'lildud',
      avatarUrl: '',
      unreadNotifications: 0
    }
    persist()
  } catch (e: any) {
    error.value = e?.message ?? 'Error al iniciar sesión.'
    throw e
  } finally {
    loading.value = false
  }
}

async function register(data: { name: string; email: string; password: string }) {
  loading.value = true
  error.value = null
  try {
    // BACKEND: reemplaza por:
    //   user.value = await apiRegister(data)
    //
    // Simulación actual:
    if (!data.name || !data.email || !data.password) {
      throw new Error('Completa todos los campos.')
    }
    await new Promise(r => setTimeout(r, 400))
    user.value = {
      name: data.name,
      avatarUrl: '',
      unreadNotifications: 0
    }
    persist()
  } catch (e: any) {
    error.value = e?.message ?? 'Error al registrarse.'
    throw e
  } finally {
    loading.value = false
  }
}

async function logout() {
  // BACKEND: descomenta cuando exista API:
  //   try { await apiLogout() } catch {}
  user.value = null
  persist()
}

export function useAuth() {
  return { user, loading, error, isAuthenticated, login, register, logout }
}