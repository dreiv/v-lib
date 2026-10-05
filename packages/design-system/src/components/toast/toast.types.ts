export interface VToastOptions {
  title: string
  description?: string
  duration?: number
}

export interface VToastItem extends VToastOptions {
  id: number
}

export interface VToastRegionProps {
  label: string
  announcementLabel: string
  closeLabel: string
}
