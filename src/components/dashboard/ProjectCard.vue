<!-- src/components/dashboard/ProjectCard.vue -->
<script setup lang="ts">
interface Props {
  image?: string
  title: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  image: '',
  description: ''
})

const emit = defineEmits<{
  moreInfo: []
}>()
</script>

<template>
  <div class="project-card">
    <div class="project-card__image">
      <img v-if="image" :src="image" :alt="title" />
      <div v-else class="project-card__placeholder" />
    </div>

    <h4 class="project-card__title">{{ title }}</h4>
    <p v-if="description" class="project-card__desc">{{ description }}</p>

    <button class="project-card__btn" @click="emit('moreInfo')">
      Más información
    </button>
  </div>
</template>

<style scoped>
.project-card {
  scroll-snap-align: start;
  flex: 0 0 220px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 121, 198, 0.08);
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__title {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  color: #f8f8f2;
}

.project-card__desc {
  margin: 0;
  font-size: 0.85rem;
  color: #9ca3af;
  flex-grow: 1;
}

.project-card__btn {
  margin-top: 0.25rem;
  background: rgba(255, 121, 198, 0.1);
  color: #ff79c6;
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  font-family: 'Fira Code', monospace;
  cursor: pointer;
  transition: background 0.2s ease;
}

.project-card__btn:hover {
  background: rgba(255, 121, 198, 0.2);
}
</style>