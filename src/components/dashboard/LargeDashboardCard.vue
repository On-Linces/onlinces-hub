<!-- src/components/dashboard/LargeDashboardCard.vue -->

<script setup lang="ts">
// ============================================================
//             TARJETA LARGA para el carrusel
// ============================================================
import CardShell from './CardShell.vue'

interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <CardShell :title="title" accent="pink" full-width>
    <template #icon>
      <slot name="icon" />
    </template>

    <!-- Los <ProjectCard> que se fabrican en (App.vue) usan esta estructura y forma el carrusel -->
    <div class="large-card__carousel">
      <slot />
    </div>
  </CardShell>
</template>

<style scoped>
/* Carrusel con scroll nativo del navegador */
.large-card__carousel {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.75rem;
}

.large-card__carousel::-webkit-scrollbar {
  height: 8px;
}

.large-card__carousel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 999px;
}
</style>