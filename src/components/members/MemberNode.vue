<!-- src/components/members/MemberNode.vue -->
<script setup lang="ts">
// ============================================================
//                  NODO INDIVIDUAL DE MIEMBRO
// ============================================================
import { computed } from 'vue'
import type { Member, Area } from '../../composables/useMembers'

interface Props {
  member: Member
  x: number
  y: number
  highlighted?: boolean
  /** Área de esta aparición concreta. Se usa para excluirla del badge. */
  currentArea?: Area
}

const props = withDefaults(defineProps<Props>(), {
  highlighted: false,
  currentArea: undefined
})

// ============================================================
// ETIQUETAS
// ============================================================
const ROLE_LABEL: Record<string, string> = {
  Presidente: 'Presidente',
  Vicepresidente: 'Vicepresidente',
  'Líder': 'Líder',
  Miembro: 'Miembro'
}

const AREA_LABEL: Record<Area, string> = {
  desarrollo: 'Desarrollo',
  cyd: 'CyD',
  admin: 'Administración',
  competencias: 'Competencias',
  ciberseguridad: 'Ciberseguridad'
}

function roleLabel(role: string) {
  return ROLE_LABEL[role] ?? role
}

function areaLabel(area?: Area) {
  if (!area) return ''
  return AREA_LABEL[area] ?? area
}

// ============================================================
// AREAS SECUNDARIAS (las que no son la del nodo actual)
// ============================================================
const otherAreas = computed<Area[]>(() => {
  if (!props.member.areas) return []
  return props.member.areas.filter(a => a !== props.currentArea)
})
</script>

<template>
  <div
    class="member-node"
    :class="{ 'member-node--highlighted': highlighted }"
    :style="{ left: `${x}px`, top: `${y}px` }"
  >
    <!-- ============================================================
                          AVATAR
    ============================================================ -->
    <div class="member-node__avatar">
      <img v-if="member.avatarUrl" :src="member.avatarUrl" :alt="member.fullName" />
      <span v-else>{{ member.fullName.charAt(0).toUpperCase() }}</span>
    </div>

    <!-- ============================================================
                          INFO (NOMBRE + ROL + BADGE)
    ============================================================ -->
    <div class="member-node__info">
      <span class="member-node__name">{{ member.fullName }}</span>

      <span class="member-node__role">
        {{ roleLabel(member.role) }}
        <template v-if="currentArea"> · {{ areaLabel(currentArea) }}</template>
      </span>

      <!-- Badge: aparece solo si el miembro pertenece a más de un área -->
      <span v-if="otherAreas.length > 0" class="member-node__also">
        también en {{ otherAreas.map(areaLabel).join(', ') }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.member-node {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 140px;
  pointer-events: auto;
  transition: transform var(--transition-speed) ease;
}

.member-node--highlighted {
  transform: translateX(-50%) var(--hover-transform);
}

/* ------------------------------------------------------------
   Avatar
------------------------------------------------------------ */
.member-node__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--accent-teal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  overflow: hidden;
  box-shadow: 0 0 12px var(--accent-teal-glow);
  transition: box-shadow var(--transition-speed) ease;
  z-index: 2;
}

.member-node--highlighted .member-node__avatar {
  box-shadow: 0 0 20px var(--accent-teal-glow);
}

.member-node__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ------------------------------------------------------------
   Panel de info (glassmorphism)
------------------------------------------------------------ */
.member-node__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.6rem 0.2rem;
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-glow);
  margin-top: -0.2rem;
  z-index: 1;
}

.member-node__name {
  font-family: var(--font-family);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.2;
  margin-bottom: 0.2rem;
}

.member-node__role {
  font-family: var(--font-family);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-align: center;
}

/* ------------------------------------------------------------
   Badge de áreas secundarias
------------------------------------------------------------ */
.member-node__also {
  margin-top: 0.25rem;
  font-family: var(--font-family);
  font-size: 0.6rem;
  color: var(--accent-teal);
  text-align: center;
  opacity: 0.85;
  font-style: italic;
}
</style>