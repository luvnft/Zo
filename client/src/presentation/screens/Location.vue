<script setup lang="ts">
import { List, ListItem, Sections, Section, Input, Placeholder, Lottie } from '@/presentation/components'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useCities } from '@/domain/services/useCities'
import { useTripDetails } from '@/domain/services/useTripDetails'
import { useTelegram, useLottie } from '@/application/services'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

/**
 * Cities list
 */
const { cities } = useCities()

/**
 * Search input values (raw and debounced)
 */
const rawSearch = ref('')
const searchQuery = ref('')

watch(
  rawSearch,
  useDebounceFn((val) => {
    searchQuery.value = val.trim()
  }, 200)
)

/**
 * Selected city id
 */
const selectedId = ref(0)

/**
 * Lottie animation used when no cities found
 */
const { animationData } = useLottie('eyes')

/**
 * Filtered cities
 */
const citiesFiltered = computed(() =>
  cities.value.filter(city =>
    city.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

/**
 * Ensure selected city is visible if not in filtered list
 */
const visibleCities = computed(() => {
  const filtered = citiesFiltered.value
  const selected = cities.value.find(city => city.id === selectedId.value)
  if (selected && !filtered.includes(selected)) {
    return [selected, ...filtered]
  }
  return filtered
})

/**
 * Select a city
 */
function selectCity(id: number): void {
  selectedId.value = id
}

/**
 * Trip details and Telegram integration
 */
const { setCity, trip } = useTripDetails()
const { showMainButton, hideMainButton, expand, showBackButton, hideBackButton, vibrate } = useTelegram()
const router = useRouter()

/**
 * Feedback: vibrate if no results
 */
watch(citiesFiltered, () => {
  if (citiesFiltered.value.length === 0) {
    vibrate('light')
  }
})

/**
 * Handle UI effects on mount/unmount
 */
onMounted(() => {
  if (trip.city !== 0) {
    selectedId.value = trip.city
  }

  expand()

  if (selectedId.value !== 0) {
    showMainButton('Select', () => {
      setCity(selectedId.value)
      void router.push('/')
    })
  }

  showBackButton(() => {
    void router.back()
  })
})

watch(selectedId, (id) => {
  if (id === 0) {
    hideMainButton()
  } else {
    showMainButton('Select', () => {
      setCity(id)
      void router.push('/')
    })
  }
})

onBeforeUnmount(() => {
  hideMainButton()
  hideBackButton()
})

/**
 * Loading state for empty cities
 */
const isLoading = computed(() => cities.value.length === 0 && rawSearch.value === '')
</script>

<template>
  <div class="locations">
    <Sections>
      <Section padded>
        <Input
          v-model="rawSearch"
          placeholder="Search for a city"
          left-icon="search"
        />
      </Section>

      <Section
        v-if="visibleCities.length"
        with-background
        standalone
      >
        <List>
          <ListItem
            v-for="city in visibleCities"
            :id="city.id"
            :key="city.id"
            :title="city.title"
            :subtitle="city.country"
            :right-icon="selectedId === city.id ? 'checkmark' : undefined"
            @click="selectCity(city.id)"
          >
            <template #picture>
              <div class="list-emoji">
                {{ city.emoji }}
              </div>
            </template>
          </ListItem>
        </List>
      </Section>

      <Placeholder
        v-else-if="isLoading"
        title="Loading"
        caption="Fetching cities..."
      >
        <template #picture>
          <Lottie
            v-if="animationData"
            :animation-data="animationData"
            width="50px"
            height="50px"
            class="pic"
          />
        </template>
      </Placeholder>

      <Placeholder
        v-else
        title="No results"
        caption="Try searching for something else"
      >
        <template #picture>
          <Lottie
            v-if="animationData"
            :animation-data="animationData"
            width="50px"
            height="50px"
            class="pic"
          />
        </template>
      </Placeholder>
    </Sections>
  </div>
</template>

<style scoped>
.list-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size-avatar-medium);
  height: var(--size-avatar-medium);
  border-radius: 30px;
  font-size: 1.3rem;
  background-color: var(--color-bg-tertiary);
  letter-spacing: -1px;
}

.locations {
  :deep(.icon-checkmark) {
    animation: jump-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

    svg {
      stroke: var(--color-link);
    }
  }

  :deep(.placeholder .pic) {
    margin-top: 20px;
    padding-bottom: 6px;
    animation: jump-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

@keyframes jump-in {
  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
