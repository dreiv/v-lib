<script setup lang="ts">
import type { VBadgeProps } from './badge.types'

const { tone = 'neutral' } = defineProps<VBadgeProps>()
</script>

<template>
  <span class="v-badge v-items-center v-gap-1" :data-tone="tone">
    <slot />
  </span>
</template>
