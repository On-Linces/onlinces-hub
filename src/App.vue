<script setup lang="ts">
// ============================================================
//                        LAYOUT GLOBAL
// ============================================================
import TopBar from './components/layout/TopBar.vue'
import BottomBar from './components/layout/BottomBar.vue'

// ============================================================
//                 COMPONENTES DEL DASHBOARD
// ============================================================
import WelcomeHeader from './components/dashboard/WelcomeHeader.vue'
import DashboardCard from './components/dashboard/DashboardCard.vue'
import CardLink from './components/dashboard/CardLink.vue'
import LargeDashboardCard from './components/dashboard/LargeDashboardCard.vue'
import ProjectCard from './components/dashboard/ProjectCard.vue'

// ============================================================
//                       ASSETS ESTÁTICOS
// ============================================================
import hackOnLincesImg from './assets/images/hackonlinces.png'
import scriptOnLincesImg from './assets/images/scriptonlinces.png'
import adventLeadboardImg from './assets/images/adventleadboard.png'

// BACKEND:
// El nombre "lildud", el 67 de las notis y la foto por defecto
// están escritos a mano en este archivo. Cuando exista login SSO,
// a lo que vi segun, estos valores deben salir de un composable/store 
// de sesión, por ejemplo:
//
//   import { useAuth } from './composables/useAuth'
//   const { user } = useAuth()
//   // user.name, user.avatarUrl, user.unreadNotifications
//
// Ningún impotente hijo (TopBar, WelcomeHeader) necesita cambiar:
// ya reciben estos datos como parametritos, no los buscan ellos mismos.
// Solo hay que cambiar quien se los hecha aquí.

</script>

<template>
  <!-- BACKEND: user-name y unread-notifications -->
  <TopBar user-name="lildud" :unread-notifications="67" />

  <main class="dashboard-body">
    <!-- BACKEND: user-name -->
    <WelcomeHeader user-name="lildud" />

    <!-- ============================================================
                      TARJETAS PEQUEÑAS: Redirecciones
    ============================================================ -->
    <div class="dashboard-cards">
      <DashboardCard title="Mi cuenta" accent="purple">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </template>

        <!-- TO-DO: navegacion individual de cada apartado-->
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

    <!-- ============================================================
                        TARJETA GRANDE: Proyectos
    ============================================================ -->
    <LargeDashboardCard title="Proyectos">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </template>

      <ProjectCard
        :image="hackOnLincesImg"
        title="Hack OnLinces"
        description="Forma equipo, desarrolla soluciones increíbles y demuestra tu talento."
        @more-info="() => {}"
      />
      <!-- TO-DO: more-info debe explicar en brevedad el proyecto y anidar un link de redireccion -->

      <ProjectCard
        :image="scriptOnLincesImg"
        title="Script OnLinces"
        description="Forma equipo, desarrolla soluciones increíbles y demuestra tu talento."
        @more-info="() => {}"
      />

      <ProjectCard
        :image="adventLeadboardImg"
        title="Advent of Code Leadboard"
        description="Forma equipo, desarrolla soluciones increíbles y demuestra tu talento."
        @more-info="() => {}"
      />
    </LargeDashboardCard>
  </main>

  <!-- Enlaces institucionales -->
  <BottomBar />
</template>


<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.dashboard-body {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: transparent;
  flex: 1;
}

.dashboard-cards {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>