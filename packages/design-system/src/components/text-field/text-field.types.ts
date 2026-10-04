import type { VFieldProps } from '../field/field.types'

export type VTextFieldType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'

export interface VTextFieldProps extends VFieldProps {
  type?: VTextFieldType
  placeholder?: string
  autocomplete?: string
}
