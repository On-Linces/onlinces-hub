<!-- src/components/layout/BottomBar.vue -->
<script setup lang="ts">

interface LinkItem {
  label: string
  url: string
}

const socialLinks: LinkItem[] = [
  { label: 'GitHub', url: 'https://github.com/On-Linces' },
  { label: 'Instagram', url: 'https://www.instagram.com/on.linces/' },
  { label: 'Discord', url: 'https://discord.gg/4mkPVybtTk' }
]

const legalLinks: LinkItem[] = [
  { label: 'Privacidad', url: 'https://onlinces.net/privacidad' },
  { label: 'Términos', url: 'https://onlinces.net/terminos' },
  { label: 'Código de conducta', url: 'https://onlinces.net/codigo-de-conducta' }
]
</script>

<template>
  <footer class="bottombar">
    <div class="bottombar__main">
      <div class="bottombar__brand">
        <p class="bottombar__description">
          <a href="https://onlinces.net/" target="_blank" rel="noopener noreferrer" class="bottombar__brand-link">
            On Linces
          </a>:
          Club estudiantil de programación y desarrollo de software del
          Tecnológico Nacional de México en Celaya.
        </p>
      </div>

      <div class="bottombar__column">
        <span class="bottombar__heading">Redes</span>
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="bottombar__link"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="bottombar__column">
        <span class="bottombar__heading">Legal</span>
        <a
          v-for="link in legalLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="bottombar__link"
        >
          {{ link.label }}
        </a>
      </div>
    </div>

    <div class="bottombar__bottom">
      <span>© {{ new Date().getFullYear() }} On Linces</span>
    </div>
  </footer>
</template>

<style scoped>
.bottombar {
  margin: 2rem auto 1rem auto;
  width: calc(100% - 2rem);
  max-width: 1400px;
  box-sizing: border-box;

  background: rgba(40, 42, 54, 0.65);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  font-family: 'Fira Code', Consolas, Monaco, monospace;
  color: #f8f8f2;
  padding: 2rem;

  position: relative;
  overflow: hidden;
}

.bottombar__main {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: space-between;
}

.bottombar__brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1 1 320px;
  max-width: 420px;
}

.bottombar__description {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #9ca3af;
}

.bottombar__brand-link {
  color: #bd93f9;
  font-weight: 600;
  text-decoration: none;
}

.bottombar__brand-link:hover {
  color: #4DF0BA;
}

.bottombar__column {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 140px;
}

.bottombar__heading {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ff79c6;
  margin-bottom: 0.2rem;
}

.bottombar__link {
  font-size: 0.9rem;
  color: #f8f8f2;
  text-decoration: none;
  transition: color 0.2s ease;
  width: fit-content;
}

.bottombar__link:hover {
  color: #4DF0BA;
}

.bottombar__bottom {
  margin-top: 1rem;
  padding-top: 0.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.8rem;
  color: #6272a4;
  text-align: center;
}

.bottombar__main,
.bottombar__bottom {
  position: relative;
  z-index: 1;
}

.bottombar::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: 24px 24px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.156) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.131) 1px, transparent 1px);
  mask-image: linear-gradient(to top, black 5%, transparent 80%);
  -webkit-mask-image: linear-gradient(to top, black 5%, transparent 80%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.bottombar:hover::before {
  opacity: 1;
}
</style>