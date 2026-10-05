<script setup lang="ts">
import {
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'reka-ui'
import { nextTick } from 'vue'
import { VIconClose } from '@v/icons'
import { VIconButton } from '../icon-button'
import { toasts, useToast } from './toast.state'
import { readingTime } from './toast.timing'
import type { VToastRegionProps } from './toast.types'

const { label, announcementLabel, closeLabel } = defineProps<VToastRegionProps>()

const { dismiss } = useToast()

let returnTo: HTMLElement | null = null

function rememberFocus(event: FocusEvent) {
  const previous = event.relatedTarget
  if (previous instanceof HTMLElement && !(event.currentTarget as Node).contains(previous)) {
    returnTo = previous
  }
}

async function close(id: number, open: boolean) {
  if (open) return
  const hadFocus = (document.activeElement?.closest('.v-toast__viewport') ?? null) !== null
  dismiss(id)
  if (!hadFocus) return
  await nextTick()
  const active = document.activeElement
  const lost = active === document.body || active?.classList.contains('v-toast__viewport')
  if (toasts.value.length === 0 && lost && returnTo?.isConnected) returnTo.focus()
}
</script>

<template>
  <ToastProvider :label="announcementLabel" disable-swipe>
    <ToastRoot
      v-for="toast in toasts"
      :key="toast.id"
      class="v-toast"
      type="background"
      :duration="toast.duration ?? readingTime(toast.title, toast.description)"
      @update:open="close(toast.id, $event)"
    >
      <div class="v-toast__text">
        <ToastTitle class="v-toast__title">{{ toast.title }}</ToastTitle>
        <ToastDescription v-if="toast.description" class="v-toast__description">
          {{ toast.description }}
        </ToastDescription>
      </div>
      <ToastClose as-child>
        <VIconButton :aria-label="closeLabel"><VIconClose /></VIconButton>
      </ToastClose>
    </ToastRoot>
    <ToastViewport class="v-toast__viewport" :label="label" @focusin="rememberFocus" />
  </ToastProvider>
</template>
