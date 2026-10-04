import type { VFieldProps } from '../field/field.types'

export interface VSelectOption {
  value: string
  label: string
}

export interface VSelectProps extends VFieldProps {
  options: VSelectOption[]
  placeholder?: string
}
