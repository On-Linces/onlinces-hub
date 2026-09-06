<script setup lang="ts">
import TopBar from './components/layout/TopBar.vue'
import WelcomeHeader from './components/dashboard/WelcomeHeader.vue';
import DashboardCard from './components/dashboard/DashboardCard.vue'
import CardLink from './components/dashboard/CardLink.vue'
</script>

<template>
  <TopBar user-name="lildud" :unread-notifications="67" />

  <main class="dashboard-body">
    <WelcomeHeader user-name="lildud" />

    <div class="dashboard-cards">
      <DashboardCard title="Mi cuenta" accent="purple">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </template>

        <CardLink type="perfil" accent="purple">Perfil</CardLink>
        <CardLink type="configuracion" accent="purple">Configuración</CardLink>
      </DashboardCard>

      <DashboardCard title="Comunidad" accent="teal">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="8" cy="8" r="3" />
            <circle cx="16" cy="8" r="3" />
            <path d="M2 20c0-3 3-5 6-5s6 2 6 5" />
            <path d="M14 15c3 0 6 2 6 5" />
          </svg>
        </template>

        <CardLink type="miembros" accent="teal">Miembros</CardLink>
        <CardLink type="galeria" accent="teal">Galeria</CardLink>
      </DashboardCard>
    </div>
  </main>
</template>

<style scoped>
.dashboard-body {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: transparent;
}

.dashboard-cards {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>