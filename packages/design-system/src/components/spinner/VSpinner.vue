<script setup lang="ts">
import SpinnerMark from './SpinnerMark.vue'
import type { VSpinnerProps } from './spinner.types'

const { label } = defineProps<VSpinnerProps>()
</script>

<template>
  <span class="v-spinner" :role="label ? 'status' : undefined">
    <SpinnerMark />
    <span v-if="label" class="v-visually-hidden">{{ label }}</span>
  </span>
</template>
