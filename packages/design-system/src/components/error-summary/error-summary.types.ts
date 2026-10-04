export interface VErrorSummaryItem {
  id: string
  message: string
}

export interface VErrorSummaryProps {
  heading: string
  errors: VErrorSummaryItem[]
}
