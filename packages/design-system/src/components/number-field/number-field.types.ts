import type { VFieldProps } from '../field/field.types'

export interface VNumberFieldProps extends VFieldProps {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  formatOptions?: Intl.NumberFormatOptions
  locale?: string
  readonly?: boolean
  name?: string
  decrementLabel?: string
  incrementLabel?: string
}
