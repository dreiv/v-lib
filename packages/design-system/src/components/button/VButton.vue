<script setup lang="ts">
import type { VButtonProps } from './button.types'

const {
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  pending = false,
} = defineProps<VButtonProps>()
</script>

<template>
  <button
    class="v-button"
    :type="type"
    :data-variant="variant"
    :data-size="size"
    :disabled="disabled || pending"
    :aria-busy="pending || undefined"
  >
    <slot />
  </button>
</template>
