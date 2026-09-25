<!-- src/views/DashboardView.vue -->

<script setup lang="ts">
// ============================================================
//                        LAYOUT GLOBAL
// ============================================================
import { useRouter } from 'vue-router'

// ============================================================
//                 COMPONENTES DEL DASHBOARD
// ============================================================
import WelcomeHeader from '../components/dashboard/WelcomeHeader.vue'
import DashboardCard from '../components/dashboard/DashboardCard.vue'
import CardLink from '../components/dashboard/CardLink.vue'
import LargeDashboardCard from '../components/dashboard/LargeDashboardCard.vue'
import ProjectCard from '../components/dashboard/ProjectCard.vue'
import ProjectModal from '../components/dashboard/ProjectModal.vue'

// ============================================================
//                       DATOS DE PROYECTOS
// ============================================================
import { PROJECTS, type Project } from '../data/projects'
import { ref } from 'vue'

// ============================================================
//                       SESIÓN DE USUARIO
// ============================================================
// BACKEND: cuando exista login SSO, estos valores deben salir
// de useAuth() y pasarse tanto a TopBar como a WelcomeHeader.
// El nombre "lildud", el 67 de las notis y la foto por defecto
// están escritos a mano en este archivo. Ningún componente hijo
// (TopBar, WelcomeHeader) necesita cambiar: ya reciben estos
// datos como parámetros, no los buscan ellos mismos.
import { useAuth } from '../composables/useAuth'
const { isAuthenticated } = useAuth()

const router = useRouter()

// ============================================================
//                  MODAL DE PROYECTOS
// ============================================================
const activeProject = ref<Project | null>(null)

function openProject(project: Project) {
  activeProject.value = project
}

function closeProject() {
  activeProject.value = null
}
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

        <!-- Perfil: bloqueado si no hay sesión -->
        <CardLink
          type="perfil"
          accent="purple"
          :disabled="!isAuthenticated"
          @click="router.push('/perfil')"
        >
          Perfil
        </CardLink>

        <CardLink type="configuracion" accent="purple" @click="router.push('/configuracion')">
          Configuración
        </CardLink>
      </DashboardCard>

      <!-- TO-DO: navegacion individual de cada apartado-->
      <DashboardCard title="Comunidad" accent="teal">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="8" cy="8" r="3" />
            <circle cx="16" cy="8" r="3" />
            <path d="M2 20c0-3 3-5 6-5s6 2 6 5" />
            <path d="M14 15c3 0 6 2 6 5" />
          </svg>
        </template>

        <CardLink type="miembros" accent="teal" @click="router.push('/miembros')">
          Miembros
        </CardLink>
        <CardLink type="galeria" accent="teal" @click="router.push('/galeria')">
          Galería
        </CardLink>
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
        v-for="project in PROJECTS"
        :key="project.id"
        :image="project.image"
        :title="project.title"
        :description="project.description"
        @more-info="openProject(project)"
      />
    </LargeDashboardCard>
  </main>

  <!-- Modal de proyecto -->
  <ProjectModal
    :project="activeProject"
    @close="closeProject"
  />

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