<!-- src/components/dashboard/ProjectCard.vue -->

<script setup lang="ts">
// ============================================================
//            TARJETA DE PROYECTO para el carrusel
// ============================================================
interface Props {
  image?: string
  title: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  image: '',
  description: ''
})

// TO-DO: abrir ventana emergente con informacion resumida del proyecto".
const emit = defineEmits<{
  moreInfo: []
}>()
</script>

<template>
  <div class="project-card">
    <!-- Si no hay imagen se muestra un fondo feo -->
    <img v-if="image" :src="image" :alt="title" class="project-card__img" />
    <div v-else class="project-card__placeholder"></div>

    <!-- Overlay oculto para animacion -->
    <div class="project-card__overlay">
      <h4 class="project-card__title">{{ title }}</h4>
      <button class="project-card__btn" @click.stop="emit('moreInfo')">
        Ver más...
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.project-card {
  scroll-snap-align: start;
  flex: 0 0 500px;
  aspect-ratio: 16 / 9;
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  border: 3px solid var(--border-color);
  transition: border-color var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease;
}

.project-card:hover {
  border-color: var(--accent-pink);
  box-shadow: var(--shadow-glow), 0 0 20px var(--accent-pink-glow);
}

.project-card__img,
.project-card__placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-card__placeholder {
  background: var(--accent-pink-dim);
}

.project-card:hover .project-card__img {
  transform: scale(1.08);
}

.project-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--border-color);

  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card:hover .project-card__overlay {
  transform: translateY(0);
}

.project-card__title {
  margin: 0;
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card__btn {
  background: var(--accent-pink-dim);
  color: var(--accent-pink);
  border: 1px solid var(--accent-pink);
  border-radius: var(--radius-xs);
  padding: 0.4rem 0.8rem;
  font-family: var(--font-family);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  white-space: nowrap;
}

.project-card__btn:hover {
  background: var(--accent-pink);
  color: var(--text-primary);
  border-color: var(--accent-pink);
}
</style>