import type { VFieldProps } from '../field/field.types'

export interface VAutocompleteProps extends VFieldProps {
  suggestions: string[]
  placeholder?: string
}
