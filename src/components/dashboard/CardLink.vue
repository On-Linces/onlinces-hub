<script setup lang="ts">
interface Props {
  accent?: 'teal' | 'purple'
  type: 'perfil' | 'configuracion' | 'miembros' | 'galeria'
}

withDefaults(defineProps<Props>(), {
  accent: 'teal',
  type: 'perfil'
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <button 
    class="card-link" 
    :class="`card-link--${accent}`"
    @click="$emit('click')"
  >
    <div class="card-link__doodles">
      <svg v-for="i in 4" :key="i" :class="`doodle doodle-${i}`" viewBox="0 0 24 24">
        
        <g v-if="type === 'perfil'">
          <circle cx="12" cy="7" r="4"/><path d="M5 21v-2a4 4 0 014-4h6a4 4 0 014 4v2"/>
        </g>
        
        <g v-else-if="type === 'configuracion'">
          <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </g>
        
        <g v-else-if="type === 'miembros'">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
        </g>
        
        <g v-else-if="type === 'galeria'">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </g>

      </svg>
    </div>

    <span class="card-link__text">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.card-link {
  --hover-color: #4DF0BA;
  
  position: relative;
  background: transparent;
  border: none;
  color: #f8f8f2;
  text-align: center;
  padding: 0.6rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  font-size: 1.4rem;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  width: 100%;
  overflow: hidden;
}

.card-link--purple {
  --hover-color: #bd93f9;
}

.card-link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--hover-color);
}

.card-link__text {
  position: relative;
  z-index: 2;
}

.card-link__doodles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.card-link:hover .card-link__doodles {
  opacity: 1;
}

.doodle {
  position: absolute;
  width: 26px;
  height: 26px;
  fill: none;
  stroke: var(--hover-color);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.55;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-link .doodle-1 { top: -5px; left: 5px; transform: rotate(-45deg) scale(0.6); }
.card-link:hover .doodle-1 { transform: rotate(-15deg) scale(0.9) translate(5px, 8px); }

.card-link .doodle-2 { top: -10px; right: 10px; transform: rotate(30deg) scale(0.5); }
.card-link:hover .doodle-2 { transform: rotate(55deg) scale(0.8) translate(-4px, 12px); }

.card-link .doodle-3 { bottom: -5px; left: 15px; transform: rotate(-20deg) scale(0.7); }
.card-link:hover .doodle-3 { transform: rotate(10deg) scale(0.85) translate(4px, -10px); }

.card-link .doodle-4 { bottom: -12px; right: 8px; transform: rotate(60deg) scale(0.6); }
.card-link:hover .doodle-4 { transform: rotate(25deg) scale(1) translate(-10px, -6px); }
</style>