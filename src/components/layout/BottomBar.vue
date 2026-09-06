<!-- src/components/layout/BottomBar.vue -->

<script setup lang="ts">
// ============================================================
//                        BARRA INFERIOR
// ============================================================
import { computed } from 'vue'
import { useTheme } from '../../composables/useTheme'

// ============================================================
//                       ASSETS ESTÁTICOS
// ============================================================
import logoDark from '../../assets/images/logo_dark.webp'
import logoLight from '../../assets/images/logo_light.webp'

const { settings } = useTheme()

// Si el tema es light, usa la versión light; si no, la dark.
const currentLogo = computed(() => 
  settings.value.colorTheme === 'light' ? logoLight : logoDark
)

interface InternalLink {
  label: string
  to: string
}

interface ExternalLink {
  label: string
  href: string
}

const COMMUNITY_LINKS: InternalLink[] = [
  { label: 'Convocatorias', to: '/convocatorias' },
  { label: 'Eventos', to: '/eventos' },
  { label: 'Miembros', to: '/miembros' },
]

const RESOURCE_LINKS: Array<InternalLink | ExternalLink> = [
  { label: 'Script', href: 'https://script.onlinces.net' },
  { label: 'Galería', to: '/galeria' },
  { label: 'Asesorías', to: '/asesorias' },
]

function isExternal(l: InternalLink | ExternalLink): l is ExternalLink {
  return 'href' in l
}

const SOCIAL_LINKS: ExternalLink[] = [
  { label: 'GitHub', href: 'https://github.com/On-Linces' },
  { label: 'Discord', href: 'https://discord.gg/onlinces' },
]

const LEGAL_LINKS: InternalLink[] = [
  { label: 'Privacidad', to: '/privacidad' },
  { label: 'Términos', to: '/terminos' },
  { label: 'Código de conducta', to: '/codigo-de-conducta' },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="top">
      <div class="inner">
        <!-- Brand col -->
        <div class="brandCol">
          <RouterLink to="/" class="brand">
            <div class="logoBox">
              <img :src="currentLogo" alt="OnLinces" class="topbar__logo" />
            </div>
            <span class="brandName">On Linces</span>
          </RouterLink>
          <p class="tagline">
            Club estudiantil de programación y desarrollo de software
            del Tecnológico Nacional de México en Celaya.
          </p>
          <div class="socials">
            <a v-for="s in SOCIAL_LINKS" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer"
              :aria-label="s.label" class="socialBtn">
              <!-- GitHub -->
              <svg v-if="s.label === 'GitHub'" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"
                aria-hidden="true">
                <path
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <!-- Discord (MessageCircle de lucide) -->
              <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div class="linksGrid">
          <div class="col">
            <span class="colTitle">Comunidad</span>
            <RouterLink v-for="l in COMMUNITY_LINKS" :key="l.to" :to="l.to" class="link">
              {{ l.label }}
            </RouterLink>
          </div>
          <div class="col">
            <span class="colTitle">Recursos</span>
            <template v-for="l in RESOURCE_LINKS" :key="l.label">
              <a v-if="isExternal(l)" :href="l.href" target="_blank" rel="noopener noreferrer" class="link">
                {{ l.label }}
              </a>
              <RouterLink v-else :to="l.to" class="link">
                {{ l.label }}
              </RouterLink>
            </template>
          </div>
          <div class="col">
            <span class="colTitle">Contacto</span>
            <a href="mailto:contact@onlinces.net" class="link">contact@onlinces.net</a>
            <span class="linkStatic">TecnNM en Celaya, Gto. MX</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="bottom">
      <div class="bottomInner">
        <span class="copyright">
          © {{ currentYear }} On Linces. Hecho con
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="heart" aria-hidden="true">
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          por On Linces
        </span>
        <div class="legal">
          <RouterLink v-for="l in LEGAL_LINKS" :key="l.to" :to="l.to" class="legalLink">
            {{ l.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  width: 100%;
  margin-top: auto;
  color: var(--text-primary);
}

.top {
  padding: 56px 32px 48px;
}

.inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  gap: 80px;
}

.brandCol {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 0 260px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  width: fit-content;
}

.logoBox {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-xs);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logoImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brandName {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.tagline {
  margin: 0;
  font-size: 0.845rem;
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 280px;
}

.socials {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.socialBtn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-xs);
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background var(--transition-speed), color var(--transition-speed);
}

.socialBtn:hover {
  color: var(--accent-teal);
}

.linksGrid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.colTitle {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-teal);
  margin-bottom: 4px;
}

.link {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed);
}

.link:hover {
  color: var(--text-primary);
}

.linkStatic {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.bottom {
  border-top: 1px solid var(--border-color);
  padding: 16px 32px;
}

.bottomInner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.copyright {
  font-size: 0.825rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.legal {
  display: flex;
  align-items: center;
  gap: 20px;
}

.legalLink {
  font-size: 0.825rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-speed);
}

.legalLink:hover {
  color: var(--text-primary);
}
</style>