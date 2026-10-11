export interface VErrorSummaryItem {
  id: string
  message: string
}

export interface VErrorSummaryProps {
  heading: string
  errors: VErrorSummaryItem[]
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
