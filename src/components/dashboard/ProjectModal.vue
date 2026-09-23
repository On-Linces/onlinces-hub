<!-- src/components/dashboard/ProjectModal.vue -->
<script setup lang="ts">
// ============================================================
//             VENTANA EMERGENTE DE PROYECTO
// ============================================================
import { onBeforeUnmount, onMounted, watch } from 'vue'
import type { Project } from '../../data/projects'

interface Props {
  project: Project | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

watch(
  () => props.project,
  val => {
    document.body.style.overflow = val ? 'hidden' : ''
  }
)

// Cierra con Escape
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.project) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function normalizeUrl(url: string) {
  if (!url) return ''
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="project"
      class="project-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="project.title"
      @click="emit('close')"
    >
      <div class="project-modal__content" @click.stop>
        <!-- Cabecera -->
        <div class="project-modal__header">
          <h3 class="project-modal__title">{{ project.title }}</h3>
          <button
            class="project-modal__close"
            @click="emit('close')"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Imagen -->
        <div class="project-modal__img-wrap">
          <img :src="project.image" :alt="project.title" />
        </div>

        <!-- Cuerpo -->
        <div class="project-modal__body">
          <p class="project-modal__desc">{{ project.description }}</p>
        </div>

        <!-- Footer -->
        <div class="project-modal__footer">
          <a
            :href="normalizeUrl(project.link)"
            target="_blank"
            rel="noopener noreferrer"
            class="project-modal__visit"
          >
            {{ project.linkLabel ?? 'Visitar sitio' }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.project-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
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

.project-modal__content {
  position: relative;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--bg-surface);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glow);
  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* ============================================================
                        HEADER
============================================================ */
.project-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.project-modal__title {
  margin: 0;
  font-family: var(--font-family);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.project-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xs);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  flex-shrink: 0;
}

.project-modal__close:hover {
  border-color: var(--accent-pink);
  color: var(--accent-pink);
}

.project-modal__close svg {
  width: 18px;
  height: 18px;
}

/* ============================================================
                        IMAGEN
============================================================ */
.project-modal__img-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--accent-pink-dim);
}

.project-modal__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ============================================================
                        CUERPO
============================================================ */
.project-modal__body {
  padding: 1.5rem;
}

.project-modal__desc {
  margin: 0;
  font-family: var(--font-family);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-primary);
}

/* ============================================================
                        FOOTER
============================================================ */
.project-modal__footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

.project-modal__visit {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.3rem;
  background: var(--accent-pink-dim);
  color: var(--accent-pink);
  border: 1px solid var(--accent-pink);
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-speed) ease;
}

.project-modal__visit:hover {
  background: var(--accent-pink);
  color: var(--text-primary);
  box-shadow: 0 0 15px var(--accent-pink-glow);
  transform: var(--hover-transform);
}

.project-modal__visit svg {
  width: 16px;
  height: 16px;
}
</style>