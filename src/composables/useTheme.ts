// src/composables/useTheme.ts

// ============================================================
//                  ESTADO GLOBAL De Apariencia
// ============================================================
import { ref, watch } from 'vue'

type ColorTheme = 'dark' | 'light'
type ElementStyle = 'rounded' | 'flat'

interface ThemeSettings {
  colorTheme: ColorTheme
  elementStyle: ElementStyle
  effectsEnabled: boolean
}

const STORAGE_KEY = 'onlinces-theme-settings'

function loadSettings(): ThemeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // localStorage no disponible o corrupto: usar defaults
  }
  return { colorTheme: 'dark', elementStyle: 'rounded', effectsEnabled: true }
}

// Estado a nivel de módulo (no dentro de la función useTheme):
const settings = ref<ThemeSettings>(loadSettings())

function applyToDocument() {
  const root = document.documentElement
  root.classList.toggle('theme-light', settings.value.colorTheme === 'light')
  root.classList.toggle('style-flat', settings.value.elementStyle === 'flat')
  root.classList.toggle('effects-off', !settings.value.effectsEnabled)
}

// Aplicar tema inmediatamente
watch(
  settings,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    applyToDocument()
  },
  { deep: true, immediate: true }
)

export function useTheme() {
  return { settings }
}