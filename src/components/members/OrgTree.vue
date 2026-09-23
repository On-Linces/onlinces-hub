<!-- src/components/members/OrgTree.vue -->

<script setup lang="ts">
// ============================================================
//                  ORGANIZACION DEL ARBOL
// ============================================================
import { computed } from 'vue'
import type { OrgNode } from '../../composables/useMembers'
import MemberNode from './MemberNode.vue'

interface Props {
  tree: OrgNode
}

const props = defineProps<Props>()

const NODE_WIDTH = 160
const NODE_HEIGHT = 130
const LEVEL_GAP = 90
const SIBLING_GAP = 24
const PADDING_X = 60
const PADDING_Y = 40

interface Positioned {
  node: OrgNode
  x: number
  y: number
  parent?: Positioned
}

function subtreeWidth(node: OrgNode): number {
  if (node.children.length === 0) return NODE_WIDTH
  const childrenWidth = node.children.reduce(
    (sum, c) => sum + subtreeWidth(c), 0
  ) + SIBLING_GAP * (node.children.length - 1)
  return Math.max(NODE_WIDTH, childrenWidth)
}

// ============================================================
//                         LAYOUT
// ============================================================
function layout(
  node: OrgNode,
  depth: number,
  offsetX: number,
  parent: Positioned | undefined,
  acc: Positioned[]
): Positioned {
  const width = subtreeWidth(node)
  const x = offsetX + width / 2
  const y = PADDING_Y + depth * (NODE_HEIGHT + LEVEL_GAP)

  const positioned: Positioned = { node, x, y, parent }
  if (!node.isVirtual) acc.push(positioned)

  // Si es virtual, sus hijos suben un nivel (depth no avanza)
  const childDepth = node.isVirtual ? depth : depth + 1
  let childOffset = offsetX
  for (const child of node.children) {
    const cw = subtreeWidth(child)
    layout(child, childDepth, childOffset, node.isVirtual ? parent : positioned, acc)
    childOffset += cw + SIBLING_GAP
  }

  return positioned
}

const positioned = computed<Positioned[]>(() => {
  const acc: Positioned[] = []
  layout(props.tree, 0, PADDING_X, undefined, acc)
  return acc
})

const totalWidth = computed(() => {
  const first = positioned.value[0]
  if (!first) return 0
  return subtreeWidth(props.tree) + PADDING_X * 2
})

const totalHeight = computed(() => {
  if (positioned.value.length === 0) return 0
  const maxY = Math.max(...positioned.value.map(p => p.y))
  return maxY + NODE_HEIGHT + PADDING_Y
})

const edges = computed(() => {
  const paths: Array<{ d: string }> = []
  for (const p of positioned.value) {
    if (!p.parent) continue
    const parentBottom = p.parent.y + NODE_HEIGHT - 10
    const childTop = p.y
    const midY = (parentBottom + childTop) / 2
    paths.push({
      d: `M ${p.parent.x} ${parentBottom} C ${p.parent.x} ${midY}, ${p.x} ${midY}, ${p.x} ${childTop}`
    })
  }
  return paths
})
</script>

<template>
  <!-- ============================================================
                        CONTENEDOR DEL ARBOL
  ============================================================ -->
  <div
    class="org-tree"
    :style="{
      width: `${totalWidth}px`,
      height: `${totalHeight}px`
    }"
  >
    <!-- ============================================================
                          CONEXIONES (SVG)
    ============================================================ -->
    <svg class="org-tree__edges" :width="totalWidth" :height="totalHeight">
      <path
        v-for="(p, i) in edges"
        :key="i"
        :d="p.d"
        class="org-tree__edge"
      />
    </svg>

    <!-- ============================================================
                      NODOS (LIDERES Y MIEMBROS)
    ============================================================ -->
    <MemberNode
      v-for="(p, i) in positioned"
      :key="(p.node.member?.id ?? 'virtual') + '-' + (p.node.area ?? 'root') + '-' + i"
      :member="p.node.member!"
      :x="p.x"
      :y="p.y"
      :current-area="p.node.area"
      highlighted
    />
  </div>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.org-tree {
  position: relative;
  margin: 0 auto;
}

.org-tree__edges {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.org-tree__edge {
  fill: none;
  stroke: var(--accent-teal);
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0.65;
  filter: drop-shadow(0 0 5px var(--accent-teal));
  transition: all var(--transition-speed) ease;
}
</style>