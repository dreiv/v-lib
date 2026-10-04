import type { VFieldProps } from '../field/field.types'

export interface VRadioOption {
  value: string
  label: string
}

export interface VRadioGroupProps extends VFieldProps {
  options: VRadioOption[]
  name?: string
}
