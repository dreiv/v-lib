import type { ComputedRef } from 'vue'

export interface VFieldProps {
  label: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

export interface VFieldContext {
  id: string
  descriptionId: string
  errorId: string
  describedby: ComputedRef<string | undefined>
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
}
