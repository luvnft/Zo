<script setup lang="ts">
defineProps<{
  /**
   * Title of the item
   */
  title: string;
}>()
</script>

<template>
  <div class="data-table-item">
    <div class="title">{{ title }}</div>

    <div class="content">
      <slot name="content" />
    </div>

    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.data-table-item {
  display: grid;
  gap: 4px;
  padding-inline: 10px;
  min-width: 95px;

  text-align: center;
  color: var(--color-hint);
  @apply --caption-2;
}

.title {
  text-transform: uppercase;
  line-height: 20px;
  font-weight: 500;
}

.content {
  min-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  font-size: 12px;
  color: var(--color-text-secondary);
}
</style>
