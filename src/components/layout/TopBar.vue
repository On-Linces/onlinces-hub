<!-- src/components/layout/TopBar.vue -->
<script setup lang="ts">
import logo from '/src/assets/images/logo.webp'

interface Props {
    userName?: string
    avatarUrl?: string
    unreadNotifications?: number
}

const props = withDefaults(defineProps<Props>(), {
    userName: 'Invitado',
    avatarUrl: '',
    unreadNotifications: 0
})

const emit = defineEmits<{
    notificationClick: []
    profileClick:[]
}>()
</script>

<template>
    <header class="topbar">
        <div class="topbar__brand">
            <img :src="logo" alt="OnLinces" class="topbar__logo" />
            <span class="topbar__title">
                <span class="title__keyword">community</span><span class="title__method">.hub</span><span class="title__parens">()</span>
            </span>
        </div>

        <div class="topbar__actions">
            <button
                class="topbar__icon-btn"
                aria-label="Notificaciones"
                @click="emit('notificationClick')"
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>

                <span v-if="props.unreadNotifications > 0" class="topbar__badge">
                    {{ props.unreadNotifications }}
                </span>
            </button>

            <button class="topbar__profile" @click="emit('profileClick')">
                <div class="topbar__avatar">
                    <img v-if="props.avatarUrl" :src="props.avatarUrl" :alt="props.userName" />
                    <span v-else>{{ props.userName.charAt(0).toUpperCase() }}</span>
                </div>
                <span class="topbar__username">{{ props.userName }}</span>
            </button>
        </div>
    </header>
</template>

<!-- Top Bar CSS -->
<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #282a36;
  font-family: 'Fira Code', Consolas, Monaco, monospace;
  color: #f8f8f2;
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.topbar__logo {
  height: 48px;
  width: auto;
}

.topbar__title {
  font-size: 1.3rem;
  letter-spacing: 0.5px;
}

.title__keyword {
  color: #bd93f9;
}

.title__method {
  color: #f8f8f2;
}

.title__parens {
  color: #ff79c6;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.topbar__icon-btn {
  position: relative;
  background: #1e1f29;
  border: none;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 12px;
  color: #4DF0BA;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.topbar__icon-btn:hover {
  background: #0e382d;
  color: #4DF0BA;
  filter: brightness(1.25) drop-shadow(0 0 8px rgba(146, 255, 211, 0.7));
  transform: scale(1.05);
}

.topbar__icon-btn:active {
  filter: brightness(0.75);
  transform: scale(0.95);
}

.topbar__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff5555;
  color: white;
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 999px;
  line-height: 1.2;
}

.topbar__profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #f8f8f2;
}

.topbar__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #44475a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  overflow: hidden;
}

.topbar__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topbar__username {
  font-size: 1.1rem;
  font-weight: 400;
}
</style>