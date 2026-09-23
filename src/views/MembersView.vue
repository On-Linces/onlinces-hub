<!-- src/views/MembersView.vue -->
<script setup lang="ts">

// ============================================================
//                  LAYOUT Arbol de miembros
// ============================================================
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// ============================================================
//                 COMPONENTES DEL Arbol
// ============================================================
import CardShell from '../components/dashboard/CardShell.vue'
import OrgTree from '../components/members/OrgTree.vue'
import { useMembers, buildOrgTree, splitMembers } from '../composables/useMembers'

const router = useRouter()
const { members, loading, error } = useMembers()

const tree = computed(() => buildOrgTree(members.value))
const { president, vice } = computed(() => splitMembers(members.value)).value
</script>

<template>
  <main class="members-view">
    <button class="members-view__back" @click="router.push('/')">
      ← Volver al Dashboard
    </button>

    <CardShell title="Miembros" accent="teal" full-width>
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="7" r="4" />
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      </template>

      <div v-if="loading" class="members-view__status">Cargando miembros...</div>
      <div v-else-if="error" class="members-view__status members-view__status--error">
        {{ error }}
      </div>

      <template v-else>
        <!-- ================================================
             CABECERA: Presidente y Vicepresidente
        ================================================= -->
        <div class="members-view__exec">
          <div v-if="president" class="exec-card">
            <div class="exec-card__avatar">
              <img v-if="president.avatarUrl" :src="president.avatarUrl" :alt="president.fullName" />
              <span v-else>{{ president.fullName.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="exec-card__info">
              <span class="exec-card__role">Presidente</span>
              <span class="exec-card__name">{{ president.fullName }}</span>
            </div>
          </div>

          <div v-if="vice" class="exec-card">
            <div class="exec-card__avatar">
              <img v-if="vice.avatarUrl" :src="vice.avatarUrl" :alt="vice.fullName" />
              <span v-else>{{ vice.fullName.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="exec-card__info">
              <span class="exec-card__role">Vicepresidente</span>
              <span class="exec-card__name">{{ vice.fullName }}</span>
            </div>
          </div>
        </div>

        <!-- ================================================
             ÁRBOL: líderes y miembros
        ================================================= -->
        <div v-if="tree.children.length > 0" class="members-view__tree-wrapper">
          <OrgTree :tree="tree" />
        </div>
        <div v-else class="members-view__status">
          No hay líderes ni miembros registrados.
        </div>
      </template>
    </CardShell>
  </main>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.members-view {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.members-view__back {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-family);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  transition: color var(--transition-speed) ease;
}

.members-view__back:hover {
  color: var(--accent-teal);
}

/* Cabecera ejecutiva */
.members-view__exec {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.exec-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-glow);
}

.exec-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent-teal-dim);
  border: 2px solid var(--accent-teal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  overflow: hidden;
  flex-shrink: 0;
}

.exec-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.exec-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.exec-card__role {
  font-family: var(--font-family);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-teal);
  font-weight: 700;
}

.exec-card__name {
  font-family: var(--font-family);
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 600;
}

.members-view__status {
  font-family: var(--font-family);
  color: var(--text-muted);
  text-align: center;
  padding: 2rem 0;
}

.members-view__status--error {
  color: #ff5555;
}

.members-view__tree-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
}

.members-view__tree-wrapper::-webkit-scrollbar {
  height: 8px;
}

.members-view__tree-wrapper::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 999px;
}
</style>