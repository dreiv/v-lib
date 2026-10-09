export type VButtonVariant = 'primary' | 'secondary' | 'danger' | 'quiet'
export type VButtonSize = 'small' | 'medium' | 'large'
export type VButtonType = 'button' | 'submit' | 'reset'

export interface VButtonProps {
  variant?: VButtonVariant
  size?: VButtonSize
  type?: VButtonType
  pending?: boolean
  disabled?: boolean
  full?: boolean
  iconOnly?: boolean
}
