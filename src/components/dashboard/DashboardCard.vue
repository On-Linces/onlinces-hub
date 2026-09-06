<script setup lang="ts">
interface Props {
  title: string
  accent?: 'purple' | 'teal'
}

withDefaults(defineProps<Props>(), {
  accent: 'teal'
})
</script>

<template>
  <div class="dashboard-card" :class="`dashboard-card--${accent}`">
    <div class="dashboard-card__header">
      <div class="dashboard-card__icon">
        <slot name="icon" />
      </div>
      <div class="dashboard-card__title-pill">
        {{ title }}
      </div>
    </div>

    <div class="dashboard-card__links">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dashboard-card {
  --accent-color: #4df0ba;
  --accent-bg: rgba(77, 240, 186, 0.1);
  --accent-glow: rgba(77, 240, 186, 0.4);
  --grid-line: rgba(77, 240, 186, 0.15);
}

.dashboard-card--purple {
  --accent-color: #bd93f9;
  --accent-bg: rgba(189, 147, 249, 0.1);
  --accent-glow: rgba(189, 147, 249, 0.4);
  --grid-line: rgba(189, 147, 249, 0.15);
}

.dashboard-card {
  flex: 1 1 380px;
  min-width: 320px;
  max-width: 600px;
  height: fit-content;

  background: rgba(11, 12, 16, 0.65);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  border-radius: 24px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease;
}

.dashboard-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 24px var(--accent-glow);
  transform: translateY(-2px);
}

.dashboard-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: 24px 24px;
  background-image: 
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  mask-image: linear-gradient(to top, black 5%, transparent 80%);
  -webkit-mask-image: linear-gradient(to top, black 5%, transparent 80%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.dashboard-card::after {
  content: '';
  position: absolute;
  bottom: -40%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 120px;
  background: radial-gradient(ellipse at center, var(--accent-bg), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.dashboard-card:hover::before,
.dashboard-card:hover::after {
  opacity: 1;
}

.dashboard-card__header,
.dashboard-card__links {
  position: relative;
  z-index: 1;
}

.dashboard-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.dashboard-card__icon {
  width: 60px;
  height: 60px;
  background: var(--accent-bg);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
}

.dashboard-card__icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: var(--accent-color);
  color: var(--accent-color);
}

.dashboard-card__title-pill {
  background: var(--accent-bg);
  color: var(--accent-color);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  font-weight: 700;
}

.dashboard-card__links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}
</style>