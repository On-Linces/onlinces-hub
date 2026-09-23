// src/composables/useGallery.ts

// ============================================================
//                  ESTADO GLOBAL De Galeria
// ============================================================
import { ref } from 'vue'

export interface GalleryImage {
  id: number
  title: string
  description: string | null
  webp_url: string | null
  full_webp_url?: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  total: number
}

// ============================================================
// BACKEND: EL BACK RAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
// ============================================================
//
//   import api from '../lib/api'   // tu axios configurado
//
//   export async function fetchGallery(
//     page: number,
//     perPage = 16
//   ): Promise<PaginatedResponse<GalleryImage>> {
//     const { data } = await api.get<PaginatedResponse<GalleryImage>>(
//       '/public/gallery',
//       { params: { page, per_page: perPage } }
//     )
//     return data
//   }
//
// Formato esperado por cada imagen:
//   {
//     id: number,
//     title: string,
//     description: string | null,
//     webp_url: string | null,        // miniatura
//     full_webp_url?: string | null   // versión grande (lightbox)
//   }
// ============================================================

// ============================================================
// MOCK: datos simulados para ver la vista sin backend
// ============================================================
export const MOCK_GALLERY: GalleryImage[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  title: `Momento ${i + 1}`,
  description: i % 3 === 0 ? 'Captura de una actividad del club.' : null,
  // Placeholder de picsum.photos para que se vea algo mientras no hay backend :C
  webp_url: `https://picsum.photos/seed/onlinces-${i + 1}/600/400`,
  full_webp_url: `https://picsum.photos/seed/onlinces-${i + 1}/1600/1000`
}))

export function useGallery() {
  const images = ref<GalleryImage[]>([])
  const total = ref(0)
  const lastPage = ref(1)
  const page = ref(1)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load(p = page.value) {
    loading.value = true
    error.value = null
    try {
      // BACKEND: cambia este bloque por fetchGallery(p)
      //   const res = await fetchGallery(p)
      //   images.value = res.data
      //   total.value = res.total
      //   lastPage.value = res.last_page
      //   page.value = res.current_page

      // --- Simulación local mientras no hay backend ---
      await new Promise(r => setTimeout(r, 300)) // fake latency
      const perPage = 16
      const start = (p - 1) * perPage
      images.value = MOCK_GALLERY.slice(start, start + perPage)
      total.value = MOCK_GALLERY.length
      lastPage.value = Math.ceil(MOCK_GALLERY.length / perPage)
      page.value = p
      // --- fin simulación ---
    } catch (e: any) {
      error.value = e?.message ?? 'Error cargando la galería.'
    } finally {
      loading.value = false
    }
  }

  return { images, total, lastPage, page, loading, error, load }
}