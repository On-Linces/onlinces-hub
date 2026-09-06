<!-- src/components/settings/SettingsToggle.vue -->

<script setup lang="ts">
// ============================================================
//             SWITCHES DE CONFIGURACIONES
// ============================================================
interface ToggleOption {
  value: string
  text: string
}

defineProps<{
  label: string
  options: ToggleOption[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="settings-toggle">
    <span class="settings-toggle__label">{{ label }}</span>
    <div class="settings-toggle__group">
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        class="settings-toggle__option"
        :class="{ 'settings-toggle__option--active': modelValue === opt.value }"
        @click="$emit('update:modelValue', opt.value)"
      >
        {{ opt.text }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.settings-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.settings-toggle:last-child {
  border-bottom: none;
}

.settings-toggle__label {
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
  font-size: 1rem;
}

.settings-toggle__group {
  display: flex;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 3px;
  gap: 3px;
}

.settings-toggle__option {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.4rem 1rem;
  border-radius: calc(var(--radius-sm) - 3px);
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background var(--transition-speed) ease, color var(--transition-speed) ease;
}

.settings-toggle__option--active {
  background: var(--accent-purple);
  color: #ffffff;
}
</style>