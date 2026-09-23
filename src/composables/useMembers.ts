// src/composables/useMembers.ts

// ============================================================
//                  ESTADO GLOBAL De Miembros
// ============================================================
import { ref } from 'vue'

export type Area =
  | 'desarrollo'
  | 'cyd'
  | 'admin'
  | 'competencias'
  | 'ciberseguridad'

export interface Member {
  id: string
  fullName: string
  role: string          // 'Presidente' | 'Vicepresidente' | 'Líder' | 'Miembro'
  avatarUrl?: string
  areas?: Area[]        // a k chambas pertenece
}

export interface OrgNode {
  member: Member | null   // null = raíz virtual
  children: OrgNode[]
  isVirtual?: boolean
  area?: Area             // donde aparecera
}

const AREA_ORDER: Area[] = [
  'desarrollo',
  'cyd',
  'admin',
  'competencias',
  'ciberseguridad'
]

// ============================================================
// BACKEND: reemplaza por el baaaaaaaaackenddddddddddd rafaaaaaaaaa
// ============================================================
//
//   async function fetchMembers(): Promise<Member[]> {
//     const res = await fetch('/api/members')
//     if (!res.ok) throw new Error('Error cargando miembros')
//     return await res.json()
//   }
//
//   Formato esperado:
//     { id, fullName, role, avatarUrl?, areas?: Area[] }
//
//   role: 'Presidente' | 'Vicepresidente' | 'Líder' | 'Miembro'
//   areas: array de 'desarrollo' | 'cyd' | 'admin'
//          | 'competencias' | 'ciberseguridad'
// ============================================================

export const MOCK_MEMBERS: Member[] = [
  { id: '1', fullName: 'Ana Torres', role: 'Presidente' },
  { id: '2', fullName: 'Luis Ramírez', role: 'Vicepresidente' },

  // Desarrollo
  { id: '3', fullName: 'Diego Sánchez', role: 'Líder', areas: ['desarrollo'] },
  { id: '4', fullName: 'María López', role: 'Miembro', areas: ['desarrollo'] },
  // Ejemplo multi-chambas: Carlos está en Desarrollo y CyD
  { id: '5', fullName: 'Carlos Ruiz', role: 'Miembro', areas: ['desarrollo', 'cyd'] },
  { id: '6', fullName: 'Sofía Hernández', role: 'Miembro', areas: ['desarrollo'] },

  // CyD
  { id: '7', fullName: 'Valeria Cruz', role: 'Líder', areas: ['cyd'] },
  { id: '8', fullName: 'Jorge Peña', role: 'Miembro', areas: ['cyd'] },
  { id: '9', fullName: 'Daniela Ríos', role: 'Miembro', areas: ['cyd'] },

  // Administración
  { id: '10', fullName: 'Roberto Flores', role: 'Líder', areas: ['admin'] },
  { id: '11', fullName: 'Paola Mendoza', role: 'Miembro', areas: ['admin'] },

  // Competencias
  { id: '12', fullName: 'Iván Castillo', role: 'Líder', areas: ['competencias'] },
  { id: '13', fullName: 'Karla Núñez', role: 'Miembro', areas: ['competencias'] },

  // Ciberseguridad
  { id: '14', fullName: 'Hugo Vega', role: 'Líder', areas: ['ciberseguridad'] },
  { id: '15', fullName: 'Renata Salas', role: 'Miembro', areas: ['ciberseguridad'] },
]

// ============================================================
//                          CABECERA
// ============================================================
export function splitMembers(members: Member[]) {
  const president = members.find(m => m.role === 'Presidente') ?? null
  const vice = members.find(m => m.role === 'Vicepresidente') ?? null

  // Líderes por área: rol 'Líder', o Presidente/Vice con áreas
  const leaders = new Map<Area, Member>()
  for (const m of members) {
    const isLeaderRole = m.role === 'Líder'
    const isExecWithArea =
      (m.role === 'Presidente' || m.role === 'Vicepresidente') &&
      m.areas && m.areas.length > 0

    if ((isLeaderRole || isExecWithArea) && m.areas) {
      for (const a of m.areas) {
        if (!leaders.has(a)) leaders.set(a, m)
      }
    }
  }

  // Miembros por área
  const membersByArea = new Map<Area, Member[]>()
  for (const m of members) {
    if (m.role === 'Miembro' && m.areas) {
      for (const a of m.areas) {
        const list = membersByArea.get(a) ?? []
        list.push(m)
        membersByArea.set(a, list)
      }
    }
  }

  return { president, vice, leaders, membersByArea }
}

// ============================================================
//                     CONSTRUIR ÁRBOL
// ============================================================
export function buildOrgTree(members: Member[]): OrgNode {
  const { leaders, membersByArea } = splitMembers(members)

  const leaderNodes: OrgNode[] = AREA_ORDER
    .filter(a => leaders.has(a))
    .map(area => {
      const leader = leaders.get(area)!
      const team = (membersByArea.get(area) ?? []).map(m => ({
        member: m,
        children: [],
        area   // guardamos el área para :key única
      }))
      return { member: leader, children: team, area }
    })

  return {
    member: null,
    children: leaderNodes,
    isVirtual: true
  }
}

// ============================================================
//                        COMPOSABLE
// ============================================================
export function useMembers() {
  const members = ref<Member[]>(MOCK_MEMBERS)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ASINCRONA EL BACKKKKKKKKKKKKKK RAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  // async function load() {
  //   loading.value = true
  //   try { members.value = await fetchMembers() }
  //   catch (e: any) { error.value = e.message }
  //   finally { loading.value = false }
  // }
  // load()

  return { members, loading, error }
}