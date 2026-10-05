<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { nextTick, useId, watch } from 'vue'
import type { VPopoverProps } from './popover.types'

const { label } = defineProps<VPopoverProps>()

const open = defineModel<boolean>('open', { default: false })

const uid = useId()
const tabbable =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

watch(open, async (value) => {
  if (!value) return
  await nextTick()
  requestAnimationFrame(() => {
    const content = document.querySelector<HTMLElement>(`[data-v-popover="${uid}"]`)
    if (content && !content.querySelector(tabbable)) content.focus()
  })
})
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="v-popover__content"
        align="start"
        :side-offset="6"
        :aria-label="label"
        :data-v-popover="uid"
      >
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
