<script setup lang="ts">
import type { VIconButtonProps } from './icon-button.types'

const { size = 'medium', type = 'button', disabled = false } = defineProps<VIconButtonProps>()
</script>

<template>
  <button class="v-icon-button" :type="type" :data-size="size" :disabled="disabled">
    <slot />
  </button>
</template>
