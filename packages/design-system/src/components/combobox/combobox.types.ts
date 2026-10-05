import type { VFieldProps } from '../field/field.types'

export interface VComboboxOption {
  value: string
  label: string
}

export interface VComboboxProps extends VFieldProps {
  options: VComboboxOption[]
  triggerLabel: string
  emptyText: string
  placeholder?: string
}
