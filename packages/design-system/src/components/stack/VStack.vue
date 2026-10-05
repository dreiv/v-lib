<script setup lang="ts">
import type { VStackProps } from './stack.types'

const { gap = 4, as = 'div' } = defineProps<VStackProps>()
</script>

<template>
  <component :is="as" class="v-stack" :data-gap="gap">
    <slot />
  </component>
</template>
