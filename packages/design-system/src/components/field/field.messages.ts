import { computed, useId, type ComputedRef } from 'vue'

export function useFieldId(explicit: () => string | undefined) {
  const generated = useId()
  return computed(() => explicit() || generated)
}

export function useFieldMessages(
  id: ComputedRef<string>,
  description: () => string | undefined,
  error: () => string | undefined,
) {
  const descriptionId = computed(() => `${id.value}-description`)
  const errorId = computed(() => `${id.value}-error`)

  return {
    descriptionId,
    errorId,
    invalid: computed(() => Boolean(error())),
    describedby: computed(
      () =>
        [description() ? descriptionId.value : '', error() ? errorId.value : '']
          .filter(Boolean)
          .join(' ') || undefined,
    ),
  }
}
