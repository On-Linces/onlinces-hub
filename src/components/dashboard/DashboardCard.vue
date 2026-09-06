<!-- src/components/dashboard/DashboardCard.vue -->

<script setup lang="ts">
// ============================================================
//             TARJETA PEQUEÑA para el Dashboard
// ============================================================
import CardShell from './CardShell.vue'

interface Props {
  title: string
  accent?: 'purple' | 'teal'
}

withDefaults(defineProps<Props>(), {
  accent: 'teal'
})
</script>

<template>
  <CardShell :title="title" :accent="accent">
    <template #icon>
      <slot name="icon" />
    </template>

    <!-- Los <CardLink> que se fabrican en (App.vue) usan esta estructura -->
    <div class="dashboard-card__links">
      <slot />
    </div>
  </CardShell>
</template>

<style scoped>
.dashboard-card__links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}
</style>