import { computed } from 'vue'

export function useFieldMessages(
  id: string,
  description: () => string | undefined,
  error: () => string | undefined,
) {
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return {
    descriptionId,
    errorId,
    invalid: computed(() => Boolean(error())),
    describedby: computed(
      () =>
        [description() ? descriptionId : '', error() ? errorId : ''].filter(Boolean).join(' ') ||
        undefined,
    ),
  }
}
