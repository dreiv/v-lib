<script setup lang="ts">
import { useAttrs } from 'vue'
import { VSpinner } from '../spinner'
import type { VButtonProps } from './button.types'

const {
  variant = 'primary',
  size = 'medium',
  type = 'button',
  pending = false,
} = defineProps<VButtonProps>()

const attrs = useAttrs()

function blockInactive(event: Event) {
  const isInactive = pending || attrs['aria-disabled'] === 'true'
  if (!isInactive) return
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
