<script setup lang="ts">
import { VSpinner } from '../spinner'
import type { VButtonProps } from './button.types'

const { variant = 'primary', size = 'medium', type = 'button' } = defineProps<VButtonProps>()

function blockInactive(event: Event) {
  const button = event.currentTarget as HTMLElement
  if (button.getAttribute('aria-disabled') !== 'true') return
  event.preventDefault()
  event.stopImmediatePropagation()
}
</script>

<template>
  <button
    class="v-button"
    :type="type"
    :disabled="disabled"
    :data-variant="variant"
    :data-size="size"
    :data-full="full || undefined"
    :data-icon-only="iconOnly || undefined"
    :aria-disabled="pending || undefined"
    :aria-busy="pending || undefined"
    @click.capture="blockInactive"
  >
    <span class="v-button__label">
      <slot />
    </span>
    <VSpinner v-if="pending" class="v-button__spinner" />
  </button>
</template>
