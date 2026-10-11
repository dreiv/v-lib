import type { VFieldProps } from '../field/field.types'

export interface VSelectOption {
  value: string
  label: string
}

export interface VSelectOptionGroup {
  label: string
  options: VSelectOption[]
}

export interface VSelectProps extends VFieldProps {
  options: (VSelectOption | VSelectOptionGroup)[]
  placeholder?: string
}
