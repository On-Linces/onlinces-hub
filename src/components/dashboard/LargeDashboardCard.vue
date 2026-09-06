<!-- src/components/dashboard/LargeDashboardCard.vue -->
<script setup lang="ts">
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

    <div class="large-card__carousel">
      <slot />
    </div>
  </CardShell>
</template>

<style scoped>
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