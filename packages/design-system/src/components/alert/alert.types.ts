export type VAlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface VAlertProps {
  title: string
  tone?: VAlertTone
  live?: 'polite' | 'assertive'
}
