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
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid rgba(255, 255, 255, 0.08);
}

.project-card__img,
.project-card__placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-card__placeholder {
  background: rgba(255, 121, 198, 0.08);
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

  background: rgba(11, 12, 16, 0.65);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card:hover .project-card__overlay {
  transform: translateY(0);
}

.project-card__title {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  color: #f8f8f2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card__btn {
  background: rgba(255, 121, 198, 0.15);
  color: #ffcbe8;
  border: 1px solid rgba(255, 121, 198, 0.3);
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.project-card__btn:hover {
  background: rgba(255, 121, 198, 0.4);
  color: #fff;
  border-color: #ff79c6;
}
</style>