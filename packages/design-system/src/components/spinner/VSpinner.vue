<script setup lang="ts">
import SpinnerMark from './SpinnerMark.vue'
import type { VSpinnerProps } from './spinner.types'

const { label } = defineProps<VSpinnerProps>()
</script>

<template>
  <span class="v-spinner" role="status">
    <SpinnerMark />
    <span class="v-visually-hidden">{{ label }}</span>
  </span>
</template>
