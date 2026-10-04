export type VButtonVariant = 'primary' | 'secondary' | 'danger' | 'quiet'
export type VButtonSize = 'small' | 'medium' | 'large'

export interface VButtonProps {
  variant?: VButtonVariant
  size?: VButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  pending?: boolean
}
