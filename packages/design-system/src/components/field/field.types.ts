import type { ComputedRef } from 'vue'

export interface VFieldProps {
  id?: string
  label: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

export interface VFieldContext {
  id: ComputedRef<string>
  descriptionId: ComputedRef<string>
  errorId: ComputedRef<string>
  describedby: ComputedRef<string | undefined>
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
}
