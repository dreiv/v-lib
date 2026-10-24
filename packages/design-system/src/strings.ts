import { inject, type InjectionKey } from 'vue'

// Where a component's own text comes from (pick one, in this order):
//
// 1. Text the component itself writes and that does not depend on where it is used ("Dismiss",
//    "Remove", "(opens in new window)") lives in VStrings, with an English default. Apps translate
//    it once by providing V_STRINGS. A prop of the same meaning may override it per instance.
// 2. Text that only the caller can know (a field label, a dialog title, a list's accessible
//    name, a toast region's label) is a required prop. It has no default, so a missing one is a
//    type error instead of an English string in a French page.
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
  badge: { overflow: string }
  tag: { remove: string }
  tagGroup: { removed: string }
  typeahead: { results: string; resultsOne: string; empty: string }
  combobox: { added: string; removed: string; trigger: string }
  dialog: { close: string }
  toast: { label: string; announcement: string; close: string }
  // Add a key here when a new component writes generic text itself (rule above).
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
  badge: { overflow: '+' },
  tag: { remove: 'Remove' },
  tagGroup: { removed: 'Removed {label}. {count} left.' },
  typeahead: {
    results: '{count} results available.',
    resultsOne: '1 result available.',
    empty: 'No results.',
  },
  combobox: {
    added: 'Added {label}. {count} selected.',
    removed: 'Removed {label}. {count} selected.',
    trigger: 'Show options',
  },
  dialog: {
    close: 'Close',
  },
  toast: {
    label: 'Notifications ({hotkey})',
    announcement: 'Notification',
    close: 'Close',
  },
}

export const V_STRINGS: InjectionKey<VStrings> = Symbol('v-strings')

export function useVStrings(): VStrings {
  return inject(V_STRINGS, defaultStrings)
}

export function formatString(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.hasOwn(values, key) ? String(values[key]) : match,
  )
}
