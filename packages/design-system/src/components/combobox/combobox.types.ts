export interface VComboboxOption {
  value: string
  label: string
}

export interface VComboboxProps {
  label: string
  options: VComboboxOption[]
  placeholder?: string
  disabled?: boolean
}
