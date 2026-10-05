<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { watch } from 'vue'
import { VIconClose } from '@v/icons'
import { VIconButton } from '../icon-button'
import type { VDialogProps } from './dialog.types'

const { title, closeLabel, description } = defineProps<VDialogProps>()

const open = defineModel<boolean>('open', { default: false })

let opener: HTMLElement | null = null

function findOpener() {
  const active = document.activeElement
  if (!(active instanceof HTMLElement)) return null
  const menu = active.closest('[role="menu"]')
  const labelledby = menu?.getAttribute('aria-labelledby')
  return (labelledby && document.getElementById(labelledby)) || active
}

function restoreFocus(event: Event) {
  if (!opener?.isConnected) return
  event.preventDefault()
  opener.focus()
}

watch(
  open,
  (value) => {
    if (value) opener = findOpener()
  },
  { flush: 'sync' },
)
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="v-dialog__overlay" />
      <DialogContent
        class="v-dialog__content"
        v-bind="description ? {} : { 'aria-describedby': undefined }"
        @close-auto-focus="restoreFocus"
      >
        <div class="v-dialog__header">
          <DialogTitle class="v-dialog__title">{{ title }}</DialogTitle>
          <DialogClose as-child>
            <VIconButton :aria-label="closeLabel"><VIconClose /></VIconButton>
          </DialogClose>
        </div>
        <DialogDescription v-if="description" class="v-dialog__description">
          {{ description }}
        </DialogDescription>
        <div class="v-dialog__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="v-dialog__footer">
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
