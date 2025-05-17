<script setup lang="ts">
import { onBeforeMount, onErrorCaptured } from 'vue'
import { useTelegram } from '@/application/services'

const { colorScheme } = useTelegram()

function onBeforeSegue(): void {
  requestAnimationFrame(() => {
    window.scrollTo(0, 0)
  })
}

onErrorCaptured((error: Error) => {
  console.error(error)
})

onBeforeMount(() => {
  if (colorScheme !== undefined) {
    document.body.classList.add(colorScheme)
  }
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">RentalHub</h1>
    </header>

    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <transition name="default-segue" @before-enter="onBeforeSegue">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
@import '@/presentation/styles/theme/typescale.css';

:root {
  color-scheme: light dark;
  --header-height: 56px;
  --color-primary: #1a2e3b;
  --color-accent: #8c9a66;
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-border: #e0e0e0;
  --color-text: #1a2e3b;
  --family: 'Inter', sans-serif;
}

body {
  margin: 0;
  font-family: var(--family);
  display: flex;
  flex-direction: column;
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--color-bg-secondary);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  text-rendering: optimizeLegibility;

  @media (min-width: 460px) {
    max-width: 390px;
    margin: 0 auto;
  }
}

.app {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: var(--header-height);
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.app-main {
  flex: 1;
  padding: 0 16px;
}

/* Transitions */
.default-segue-leave-active {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

.default-segue-enter-active {
  transition: opacity 300ms ease;
  will-change: opacity;
}

.default-segue-enter-from,
.default-segue-leave-to {
  opacity: 0;
}

/* Smaller screens */
@media (max-width: 460px) {
  :root {
    --header-height: 48px;
  }

  .app {
    padding-top: 48px;
  }

  .app-header {
    height: 48px;
  }

  .app-main {
    padding: 0 12px;
  }
}
</style>
