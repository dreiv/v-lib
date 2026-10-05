import { ref } from 'vue'
import type { VToastItem, VToastOptions } from './toast.types'

export const toasts = ref<VToastItem[]>([])

let lastId = 0

export function useToast() {
  function show(options: VToastOptions) {
    const id = ++lastId
    toasts.value = [...toasts.value, { ...options, id }]
    return id
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return { show, dismiss }
}
