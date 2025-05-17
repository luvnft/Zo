import { createSharedComposable } from '@vueuse/core'
import { type Ref, ref, onMounted, onUnmounted } from 'vue'

/**
 * App layout attributes
 */
interface useLayoutComposableState {
  /**
   * Visible application width
   */
  appWidth: Ref<number>;
}

/**
 * Service for working with layout
 */
export const useLayout = createSharedComposable((): useLayoutComposableState => {
  const appWidth = ref(0)

  const updateAppWidth = () => {
    appWidth.value = document.getElementById('app')?.offsetWidth ?? window.innerWidth
  }

  onMounted(() => {
    updateAppWidth()
    window.addEventListener('resize', updateAppWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateAppWidth)
  })

  return {
    appWidth,
  }
})
