<script setup lang="ts">
defineProps<{
  /**
   * Optional prefix, like currency symbol or label
   */
  prefix?: string;
}>()
</script>

<template>
  <div class="amount">
    <div v-if="$slots.topline" class="topline">
      <slot name="topline" />
    </div>

    <span class="digit">
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
      <slot />
      <span v-if="$slots.postfix" class="postfix">
        <slot name="postfix" />
      </span>
    </span>

    <div v-if="$slots.subline" class="subline">
      <slot name="subline" />
    </div>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.amount {
  display: grid;
  gap: 4px;
  grid-auto-rows: min-content;
}

.digit {
  @apply --title-3-rounded-semibold;
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  white-space: nowrap;
}

.topline,
.subline {
  @apply --caption-1;
  color: var(--color-hint);
}

.prefix,
.postfix {
  @apply --footnote-rounded-semibold;
  color: var(--color-hint);
  line-height: 1;
}
</style>
