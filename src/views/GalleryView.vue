<!-- src/views/GalleryView.vue -->
<script setup lang="ts">
// ============================================================
//                    VISTA DE GALERIA
// ============================================================
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CardShell from '../components/dashboard/CardShell.vue'
import { useGallery } from '../composables/useGallery'

const router = useRouter()
const { images, total, lastPage, page, loading, error, load } = useGallery()

// ============================================================
// LIGHTBOX
// ============================================================
const activeIndex = ref<number | null>(null)
const activeImage = computed(() =>
  activeIndex.value !== null ? images.value[activeIndex.value] : null
)

function openLightbox(i: number) {
  activeIndex.value = i
}

function closeLightbox() {
  activeIndex.value = null
}

function prev() {
  if (activeIndex.value !== null && activeIndex.value > 0) activeIndex.value--
}

function next() {
  if (activeIndex.value !== null && activeIndex.value < images.value.length - 1)
    activeIndex.value++
}

// Teclado + bloqueo de scroll del body
function onKeydown(e: KeyboardEvent) {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

watch(activeIndex, val => {
  document.body.style.overflow = val !== null ? 'hidden' : ''
})

onMounted(() => {
  load(1)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// ============================================================
// PAGINACION
// ============================================================
function goToPage(p: number) {
  if (p < 1 || p > lastPage.value || p === page.value) return
  load(p)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main class="gallery-view">
    <button class="gallery-view__back" @click="router.push('/')">
      ← Volver al Dashboard
    </button>

    <CardShell title="Galería" accent="teal" full-width>
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </template>

      <!-- Estados -->
      <div v-if="loading" class="gallery-view__status">
        <span class="spinner" />
        <span>Cargando galería...</span>
      </div>

      <div v-else-if="error" class="gallery-view__status gallery-view__status--error">
        {{ error }}
      </div>

      <div v-else-if="images.length === 0" class="gallery-view__status">
        No hay imágenes disponibles.
      </div>

      <template v-else>
        <p class="gallery-view__count">
          {{ total }} imagen{{ total !== 1 ? 'es' : '' }}
        </p>

        <!-- ================================================
                        GRID DE IMAGENES
        ================================================= -->
        <div class="gallery-grid">
          <button
            v-for="(img, i) in images"
            :key="img.id"
            type="button"
            class="gallery-card"
            @click="openLightbox(i)"
            :aria-label="`Ver imagen: ${img.title}`"
          >
            <img
              v-if="img.webp_url"
              :src="img.webp_url"
              :alt="img.title"
              loading="lazy"
              class="gallery-card__img"
            />
            <div v-else class="gallery-card__placeholder"></div>

            <div class="gallery-card__overlay">
              <span>{{ img.title }}</span>
            </div>
          </button>
        </div>

        <!-- ================================================
                        PAGINACION
        ================================================= -->
        <div v-if="lastPage > 1" class="gallery-view__pagination">
          <button
            class="gallery-view__page-btn"
            :disabled="page <= 1"
            @click="goToPage(page - 1)"
            aria-label="Página anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span class="gallery-view__page-info">
            Página {{ page }} de {{ lastPage }}
          </span>
          <button
            class="gallery-view__page-btn"
            :disabled="page >= lastPage"
            @click="goToPage(page + 1)"
            aria-label="Página siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </template>
    </CardShell>

    <!-- ================================================
                        LIGHTBOX
    ================================================= -->
    <Teleport to="body">
      <div
        v-if="activeImage"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="activeImage.title"
        @click="closeLightbox"
      >
        <button
          class="lightbox__close"
          @click="closeLightbox"
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <button
          v-if="activeIndex! > 0"
          class="lightbox__nav lightbox__nav--prev"
          @click.stop="prev"
          aria-label="Anterior"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div class="lightbox__content" @click.stop>
          <div class="lightbox__img-wrap">
            <img
              v-if="activeImage.full_webp_url || activeImage.webp_url"
              :src="(activeImage.full_webp_url || activeImage.webp_url)!"
              :alt="activeImage.title"
            />
          </div>

          <div
            v-if="activeImage.title || activeImage.description"
            class="lightbox__info"
          >
            <h3 class="lightbox__title">{{ activeImage.title }}</h3>
            <p v-if="activeImage.description" class="lightbox__desc">
              {{ activeImage.description }}
            </p>
          </div>
        </div>

        <button
          v-if="activeIndex! < images.length - 1"
          class="lightbox__nav lightbox__nav--next"
          @click.stop="next"
          aria-label="Siguiente"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.gallery-view {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.gallery-view__back {
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

.gallery-view__back:hover {
  color: var(--accent-teal);
}

.gallery-view__status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: var(--font-family);
  color: var(--text-muted);
  padding: 3rem 0;
}

.gallery-view__status--error {
  color: #ff5555;
}

.gallery-view__count {
  font-family: var(--font-family);
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0 0 1rem;
}

/* ============================================================
                        GRID
============================================================ */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.gallery-card {
  position: relative;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  cursor: pointer;
  padding: 0;
  transition: border-color var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease,
              transform var(--transition-speed) ease;
}

.gallery-card:hover {
  border-color: var(--accent-teal);
  box-shadow: var(--shadow-glow), 0 0 20px var(--accent-teal-glow);
  transform: var(--hover-transform);
}

.gallery-card__img,
.gallery-card__placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.gallery-card__placeholder {
  background: var(--accent-teal-dim);
}

.gallery-card:hover .gallery-card__img {
  transform: scale(1.05);
}

.gallery-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.6rem 0.8rem;
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--border-color);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(100%);
  transition: transform var(--transition-speed) ease;
}

.gallery-card:hover .gallery-card__overlay {
  transform: translateY(0);
}

/* ============================================================
                        PAGINACION
============================================================ */
.gallery-view__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.gallery-view__page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xs);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.gallery-view__page-btn svg {
  width: 18px;
  height: 18px;
}

.gallery-view__page-btn:hover:not(:disabled) {
  border-color: var(--accent-teal);
  color: var(--accent-teal);
}

.gallery-view__page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.gallery-view__page-info {
  font-family: var(--font-family);
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* ============================================================
                        SPINNER
============================================================ */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-teal);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================================
                        LIGHTBOX
============================================================ */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox__content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.lightbox__img-wrap {
  max-width: 90vw;
  max-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.lightbox__img-wrap img {
  max-width: 90vw;
  max-height: 75vh;
  object-fit: contain;
  display: block;
}

.lightbox__info {
  max-width: 700px;
  text-align: center;
  padding: 1rem 1.5rem;
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.lightbox__title {
  margin: 0 0 0.4rem;
  font-family: var(--font-family);
  font-size: 1.1rem;
  color: var(--text-primary);
}

.lightbox__desc {
  margin: 0;
  font-family: var(--font-family);
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Botones del lightbox */
.lightbox__close,
.lightbox__nav {
  position: absolute;
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed) ease;
}

.lightbox__close {
  top: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  z-index: 2;
}

.lightbox__close:hover {
  border-color: var(--accent-teal);
  color: var(--accent-teal);
}

.lightbox__nav {
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  z-index: 2;
}

.lightbox__nav--prev { left: 1.5rem; }
.lightbox__nav--next { right: 1.5rem; }

.lightbox__nav:hover {
  border-color: var(--accent-teal);
  color: var(--accent-teal);
}

.lightbox__close svg,
.lightbox__nav svg {
  width: 22px;
  height: 22px;
}

@media (max-width: 640px) {
  .lightbox__nav { width: 40px; height: 40px; }
  .lightbox__nav--prev { left: 0.5rem; }
  .lightbox__nav--next { right: 0.5rem; }
  .lightbox__close { top: 0.5rem; right: 0.5rem; }
}
</style>