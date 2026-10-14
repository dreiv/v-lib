import { inject, type InjectionKey } from 'vue'

export interface VStrings {
  link: {
    opensInNewWindow: string
  }
  alert: {
    dismiss: string
  }
  numberField: {
    increase: string
    decrease: string
  }
  // dialog: { close: string }, toast: { dismiss: string }, etc. — grows as you add components
}

export const defaultStrings: VStrings = {
  link: {
    opensInNewWindow: '(opens in new window)',
  },
  alert: {
    dismiss: 'Dismiss',
  },
  numberField: {
    increase: 'Increase {label}',
    decrease: 'Decrease {label}',
  },
}

export const V_STRINGS: InjectionKey<VStrings> = Symbol('v-strings')

export function useVStrings(): VStrings {
  return inject(V_STRINGS, defaultStrings)
}
