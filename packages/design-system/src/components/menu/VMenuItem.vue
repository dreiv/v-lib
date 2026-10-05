<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'
import type { VMenuItemProps } from './menu.types'

const { disabled = false } = defineProps<VMenuItemProps>()

const emit = defineEmits<{ select: [event: Event] }>()
</script>

<template>
  <DropdownMenuItem class="v-popup__item" :disabled="disabled" @select="emit('select', $event)">
    <slot />
  </DropdownMenuItem>
</template>
