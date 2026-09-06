<!-- src/views/ProfileView.vue -->

<script setup lang="ts">
// ============================================================
//                         LAYOUT PERFIL
// ============================================================
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ============================================================
//                 COMPONENTES DEL PERFIL
// ============================================================
import CardShell from '../components/dashboard/CardShell.vue'

const router = useRouter()

interface ProfileData {
  avatarUrl: string
  nombre: string
  apellidos: string
  numeroControl: string
  carrera: string
  semestre: number
}

const profile = ref<ProfileData>({
  avatarUrl: '',
  nombre: 'Leonardo',
  apellidos: 'Martínez Hernández',
  numeroControl: '23031417',
  carrera: 'Ingeniería en Sistemas Computacionales',
  semestre: 7
})

const isEditing = ref(false)

// avatarFile: el archivo real seleccionado lo que va en el back avatarPreview: URL temporal SOLO para
// mostrarlo en pantalla mientras se edita — no es una URL real de servidor, vive únicamente en el navegador.
const editForm = ref({
  nombre: '',
  apellidos: '',
  avatarFile: null as File | null,
  avatarPreview: ''
})

// Referencia al <input type="file"> oculto, para poder abrirlo
// programáticamente al hacer click en el avatar.
const avatarFileInput = ref<HTMLInputElement | null>(null)

function triggerAvatarPicker() {
  if (!isEditing.value) return
  avatarFileInput.value?.click()
}

function onAvatarFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  // Validar solo imágenes y que no suban un .mov de sherk 2. El backend debería repetir
  // esta validación del lado del servidor (nunca confiar solo en
  // lo que valida el navegador).
  if (!file.type.startsWith('image/')) {
    alert('El archivo debe ser una imagen.')
    return
  }

  // Libera el object URL anterior si existía, para no acumular
  // memoria mientras el usuario prueba varias fotos antes de guardar.
  if (editForm.value.avatarPreview) {
    URL.revokeObjectURL(editForm.value.avatarPreview)
  }

  editForm.value.avatarFile = file
  editForm.value.avatarPreview = URL.createObjectURL(file)

  // Reinicia el input para permitir volver a seleccionar el mismo
  // archivo dos veces seguidas si el usuario se arrepiente y lo
  // vuelve a elegir (el navegador no dispara @change si el valor
  // no cambia).
  input.value = ''
}

const startEdit = () => {
  editForm.value = {
    nombre: profile.value.nombre,
    apellidos: profile.value.apellidos,
    avatarFile: null,
    avatarPreview: profile.value.avatarUrl
  }
  isEditing.value = true
}

const saveEdit = async () => {
  profile.value.nombre = editForm.value.nombre
  profile.value.apellidos = editForm.value.apellidos

  if (editForm.value.avatarFile) {
    // BACKEND: este es el punto exacto de integración para la
    // foto de perfil. Cuando exista el endpoint, reemplazar el
    // bloque de abajo por algo como:
    //
    //   const formData = new FormData()
    //   formData.append('avatar', editForm.value.avatarFile)
    //
    //   const res = await fetch('/api/profile/avatar', {
    //     method: 'POST',
    //     body: formData
    //     // sin Content-Type manual: el navegador arma el
    //     // multipart/form-data correcto solo con FormData
    //   })
    //
    //   if (!res.ok) {
    //     // manejar error (toast, mensaje, etc.)
    //     return
    //   }
    //
    //   const data = await res.json()
    //   profile.value.avatarUrl = data.avatarUrl // URL real que
    //                                              // devuelva el backend
    //
    // Por ahora, sin backend, usamos el preview local como si
    // fuera el resultado final (NO persiste al recargar la página):
    profile.value.avatarUrl = editForm.value.avatarPreview
  }

  isEditing.value = false
}

const cancelEdit = () => {
  // Libera el preview si no se guardó, para no dejar el object
  // URL "vivo" sin uso en memoria.
  if (editForm.value.avatarPreview && editForm.value.avatarPreview !== profile.value.avatarUrl) {
    URL.revokeObjectURL(editForm.value.avatarPreview)
  }
  isEditing.value = false
}
</script>

<template>
  <main class="profile-view">
    <button class="profile-view__back" @click="router.push('/')">
      ← Volver al Dashboard
    </button>

    <CardShell title="Mi Perfil" accent="purple" full-width>
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </template>

      <div class="profile-content">
        <div class="profile-header">
          <!-- El avatar ahora es un <button>: en modo edición, al
               hacer click abre el selector de archivo del sistema
               operativo. Fuera de edición, está deshabilitado
               (:disabled) y se ve/comporta como antes. -->
          <button
            type="button"
            class="profile-header__avatar"
            :class="{ 'profile-header__avatar--editable': isEditing }"
            :disabled="!isEditing"
            @click="triggerAvatarPicker"
            :aria-label="isEditing ? 'Cambiar foto de perfil' : 'Foto de perfil'"
          >
            <img
              v-if="isEditing ? editForm.avatarPreview : profile.avatarUrl"
              :src="isEditing ? editForm.avatarPreview : profile.avatarUrl"
              alt=""
            />
            <span v-else>{{ profile.nombre.charAt(0).toUpperCase() }}</span>

            <!-- Overlay con ícono de cámara, solo visible en modo edición -->
            <span v-if="isEditing" class="profile-header__avatar-overlay">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
          </button>

          <!-- Input real de archivo: oculto visualmente, se dispara
               solo de forma programática desde triggerAvatarPicker() -->
          <input
            ref="avatarFileInput"
            type="file"
            accept="image/*"
            class="profile-header__avatar-input"
            @change="onAvatarFileChange"
          />

          <div class="profile-header__actions">
            <button v-if="!isEditing" class="btn-edit" @click="startEdit" title="Editar Perfil">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Editar
            </button>
            <div v-else class="edit-actions">
              <button class="btn-cancel" @click="cancelEdit">Cancelar</button>
              <button class="btn-save" @click="saveEdit">Guardar</button>
            </div>
          </div>
        </div>

        <div class="profile-grid">
          <template v-if="isEditing">
            <div class="profile-field">
              <label>Nombre</label>
              <input v-model="editForm.nombre" type="text" />
            </div>
            <div class="profile-field">
              <label>Apellidos</label>
              <input v-model="editForm.apellidos" type="text" />
            </div>
          </template>

          <template v-else>
            <div class="profile-field">
              <span class="label">Nombre</span>
              <span class="value">{{ profile.nombre }}</span>
            </div>
            <div class="profile-field">
              <span class="label">Apellidos</span>
              <span class="value">{{ profile.apellidos }}</span>
            </div>
          </template>

          <div class="profile-field">
            <span class="label">Número de control</span>
            <span class="value readonly">{{ profile.numeroControl }}</span>
          </div>
          <div class="profile-field">
            <span class="label">Carrera</span>
            <span class="value readonly">{{ profile.carrera }}</span>
          </div>
          <div class="profile-field">
            <span class="label">Semestre</span>
            <span class="value readonly">{{ profile.semestre }}° semestre</span>
          </div>
        </div>
      </div>
    </CardShell>
  </main>
</template>

<style scoped>
/* ============================================================
                        CSS STYLES
============================================================ */
.profile-view {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.profile-view__back {
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

.profile-view__back:hover {
  color: var(--accent-purple);
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.profile-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 2rem;
}

/* Avatar */
.profile-header__avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 3px solid var(--accent-purple);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  overflow: hidden;
  box-shadow: 0 0 20px var(--accent-purple-glow);
  padding: 0;
  cursor: default;
}

.profile-header__avatar:disabled {
  cursor: default;
}

.profile-header__avatar--editable {
  cursor: pointer;
}

.profile-header__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Overlay de cámara */
.profile-header__avatar-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.profile-header__avatar-overlay svg {
  width: 32px;
  height: 32px;
  color: var(--text-primary);
}

.profile-header__avatar--editable:hover .profile-header__avatar-overlay {
  opacity: 1;
}

/* Input oculto para archivos */
.profile-header__avatar-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Botón Editar */
.btn-edit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-purple-dim);
  color: var(--accent-purple);
  border: 1px solid var(--accent-purple);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.btn-edit svg {
  width: 18px;
  height: 18px;
}

.btn-edit:hover {
  background: var(--accent-purple);
  color: var(--text-primary);
  box-shadow: 0 0 15px var(--accent-purple-glow);
}

/* Acciones de edición */
.edit-actions {
  display: flex;
  gap: 1rem;
}

.btn-cancel {
  background: transparent;
  color: #ff5555;
  border: 1px solid rgba(255, 85, 85, 0.4);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  cursor: pointer;
  transition: background var(--transition-speed) ease;
}

.btn-cancel:hover {
  background: rgba(255, 85, 85, 0.15);
}

.btn-save {
  background: var(--accent-purple);
  color: var(--text-primary);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-weight: 700;
  cursor: pointer;
  transition: transform var(--transition-speed) ease,
              box-shadow var(--transition-speed) ease;
}

.btn-save:hover {
  transform: var(--hover-transform);
  box-shadow: 0 4px 15px var(--accent-purple-glow);
}

/* Grid de campos */
.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.profile-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-field .label,
.profile-field label {
  font-family: var(--font-family);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.profile-field .value {
  font-family: var(--font-family);
  font-size: 1.15rem;
  color: var(--text-primary);
}

.profile-field .readonly {
  color: var(--text-muted);
}

.profile-field input {
  background: var(--bg-hover);
  border: 1px solid var(--border-color);
  padding: 0.8rem 1rem;
  border-radius: var(--radius-xs);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 1rem;
  outline: none;
  transition: border-color var(--transition-speed) ease,
              background var(--transition-speed) ease;
}

.profile-field input:focus {
  border-color: var(--accent-purple);
  background: var(--accent-purple-dim);
}
</style>