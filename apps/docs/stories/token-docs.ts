/**
 * Where each token is explained. The "All tokens" page reads this to link every token to its page,
 * and `tests/token-coverage.test.ts` fails when a token has no entry here or an entry matches no
 * token. An entry ending in `-` matches by prefix, anything else matches one token exactly. Use
 * a prefix only for a group whose page renders every member automatically.
 */
export const pages = {
  color: { title: 'Color', id: 'foundations-color' },
  typography: { title: 'Typography', id: 'foundations-typography' },
  spacing: { title: 'Spacing and shape', id: 'foundations-spacing-and-shape' },
  elevation: { title: 'Elevation and layers', id: 'foundations-elevation-and-layers' },
  focus: { title: 'Focus', id: 'foundations-focus' },
  motion: { title: 'Motion and states', id: 'foundations-motion-and-states' },
  layout: { title: 'Layout utilities', id: 'foundations-layout-utilities' },
} as const

export type PageKey = keyof typeof pages

export const documented: { match: string; page: PageKey }[] = [
  { match: '--v-color-', page: 'color' },
  { match: '--v-font-sans', page: 'typography' },
  { match: '--v-font-mono', page: 'typography' },
  { match: '--v-font-size-', page: 'typography' },
  { match: '--v-font-weight-', page: 'typography' },
  { match: '--v-line-height-', page: 'typography' },
  { match: '--v-space-', page: 'spacing' },
  { match: '--v-radius-', page: 'spacing' },
  { match: '--v-border-width', page: 'spacing' },
  { match: '--v-control-height-', page: 'spacing' },
  { match: '--v-control-target-min', page: 'spacing' },
  { match: '--v-control-indicator-size', page: 'spacing' },
  { match: '--v-shadow-', page: 'elevation' },
  { match: '--v-z-', page: 'elevation' },
  { match: '--v-focus-width', page: 'focus' },
  { match: '--v-focus-offset', page: 'focus' },
  { match: '--v-focus-color', page: 'focus' },
  { match: '--v-focus-ring', page: 'focus' },
  { match: '--v-duration-', page: 'motion' },
  { match: '--v-easing-out', page: 'motion' },
  { match: '--v-state-hover', page: 'motion' },
  { match: '--v-state-disabled-opacity', page: 'motion' },
  { match: '--v-state-press-scale', page: 'motion' },
  { match: '--v-container-max-inline', page: 'layout' },
]

const matches = (entry: string, name: string) =>
  entry.endsWith('-') ? name.startsWith(entry) : name === entry

export const pageOf = (name: string): PageKey | undefined =>
  documented.find((entry) => matches(entry.match, name))?.page

export const unmatchedEntries = (names: string[]) =>
  documented.filter((entry) => !names.some((name) => matches(entry.match, name)))
