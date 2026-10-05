<script setup lang="ts">
import type { VContainerProps } from './container.types'

const { as = 'div' } = defineProps<VContainerProps>()
</script>

<template>
  <component :is="as" class="v-container">
    <slot />
  </component>
</template>
