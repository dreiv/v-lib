import type { VButtonSize } from '../button/button.types'

export type VIconButtonSize = VButtonSize

export interface VIconButtonProps {
  size?: VIconButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}
