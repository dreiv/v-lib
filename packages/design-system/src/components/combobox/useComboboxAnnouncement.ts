import { onBeforeUnmount, ref, watch, type Ref } from 'vue'
import type { VComboboxOption } from './combobox.types'

const ANNOUNCE_DELAY = 250

export interface UseComboboxAnnouncementOptions {
  searchTerm: Ref<string>
  open: Ref<boolean>
  options: () => VComboboxOption[]
  emptyText: string
  resultsAnnouncement: (count: number) => string
  contains: (text: string, term: string) => boolean
}

export function useComboboxAnnouncement({
  searchTerm,
  open,
  options,
  emptyText,
  resultsAnnouncement,
  contains,
}: UseComboboxAnnouncementOptions) {
  const announcement = ref('')
  let timer: ReturnType<typeof setTimeout> | undefined

  watch([searchTerm, open, options], () => {
    if (timer) clearTimeout(timer)

    if (!open.value) {
      announcement.value = ''
      return
    }

    timer = setTimeout(() => {
      const matches = options().filter((option) => contains(option.label, searchTerm.value))
      announcement.value = matches.length === 0 ? emptyText : resultsAnnouncement(matches.length)
    }, ANNOUNCE_DELAY)
  })

  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer)
  })

  return { announcement }
}
