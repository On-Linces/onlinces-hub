<!-- src/components/dashboard/CardShell.vue -->

<script setup lang="ts">
// ============================================================
//             BASE VISUAL para Dashboard Cards
// ============================================================
interface Props {
  title: string
  accent?: 'purple' | 'teal' | 'pink'
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  accent: 'teal',
  fullWidth: false
})
</script>

<template>
  <div
    class="card-shell"
    :class="[`card-shell--${accent}`, { 'card-shell--full': fullWidth }]"
  >
    <div class="card-shell__header">
      <!-- El ícono lo define quien use el componente (App.vue) -->
      <div class="card-shell__icon">
        <slot name="icon" />
      </div>
      <div class="card-shell__title-pill">{{ title }}</div>
    </div>

    <!-- Slot por defecto: del carrusel de proyectos -->
    <div class="card-shell__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
/* ============================================================
   BASE DE LA TARJETA: usa las variables globales
============================================================ */
.card-shell {
  --accent-color: var(--accent-teal);
  --accent-bg: var(--accent-teal-dim);
  --accent-glow: var(--accent-teal-glow);
  --grid-line: var(--accent-teal-grid);

  flex: 1 1 380px;
  min-width: 320px;
  max-width: 600px;
  height: fit-content;

  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  transition: border-color var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease,
              transform var(--transition-speed) ease;
}

/* ============================================================
   VARIANTES DE ACENTO
============================================================ */
.card-shell--purple {
  --accent-color: var(--accent-purple);
  --accent-bg: var(--accent-purple-dim);
  --accent-glow: var(--accent-purple-glow);
  --grid-line: var(--accent-purple-grid);
}

.card-shell--pink {
  --accent-color: var(--accent-pink);
  --accent-bg: var(--accent-pink-dim);
  --accent-glow: var(--accent-pink-glow);
  --grid-line: var(--accent-pink-grid);
}

/* ============================================================
   ESTADO HOVER: borde, sombra y elevación
============================================================ */
.card-shell:hover {
  border-color: var(--accent-color);
  box-shadow: var(--shadow-glow), 0 0 24px var(--accent-glow);
  transform: var(--hover-transform);
}

/* ============================================================
   DECORACIONES DE FONDO (cuadrícula y resplandor)
============================================================ */
.card-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: 24px 24px;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  mask-image: linear-gradient(to top, black 5%, transparent 80%);
  -webkit-mask-image: linear-gradient(to top, black 5%, transparent 80%);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
  pointer-events: none;
  z-index: 0;
}

.card-shell::after {
  content: '';
  position: absolute;
  bottom: -40%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 120px;
  background: radial-gradient(ellipse at center, var(--accent-bg), transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
  pointer-events: none;
  z-index: 0;
}

.card-shell:hover::before,
.card-shell:hover::after {
  opacity: 1;
}

/* ============================================================
   CABECERA Y CUERPO (z-index para estar por encima de decoraciones)
============================================================ */
.card-shell__header,
.card-shell__body {
  position: relative;
  z-index: 1;
}

.card-shell__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.card-shell__icon {
  width: 60px;
  height: 60px;
  background: var(--accent-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  flex-shrink: 0;
}

.card-shell__icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: var(--accent-color);
  color: var(--accent-color);
}

.card-shell__title-pill {
  background: var(--accent-bg);
  color: var(--accent-color);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-family: var(--font-family);
  font-size: 1.1rem;
  font-weight: 700;
}

/* ============================================================
   MODIFICADOR: ancho completo
============================================================ */
.card-shell--full {
  flex-basis: 100%;
  max-width: 100%;
}
</style>