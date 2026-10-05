<script setup lang="ts">
import SpinnerMark from '../spinner/SpinnerMark.vue'
import type { VLoadingRegionProps } from './loading-region.types'

const { label, loading = false } = defineProps<VLoadingRegionProps>()
</script>

<template>
  <div class="v-loading-region" :aria-busy="loading ? 'true' : undefined">
    <div class="v-loading-region__content">
      <slot />
    </div>
    <span class="v-loading-region__mark" role="status">
      <template v-if="loading">
        <SpinnerMark />
        <span class="v-visually-hidden">{{ label }}</span>
      </template>
    </span>
  </div>
</template>
