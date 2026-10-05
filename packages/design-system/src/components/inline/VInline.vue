<script setup lang="ts">
import type { VInlineProps } from './inline.types'

const { gap = 3, as = 'div' } = defineProps<VInlineProps>()
</script>

<template>
  <component :is="as" class="v-inline" :data-gap="gap">
    <slot />
  </component>
</template>
