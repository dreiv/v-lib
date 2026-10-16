import { defineComponent } from 'vue'
import { flatten, tokenPrefix, tokens, type Token, type TokenGroup } from '@v/design-tokens'

export const schemes = ['light', 'dark'] as const

export const v = (name: string) => `var(${tokenPrefix}${name})`

export const px = (rem: string) => `${Math.round(parseFloat(rem) * 16)}px`

export const percent = (value: string) => `${Math.round(Number(value) * 100)}%`

export const overlay = (foreground: string, mix: string, base: string) =>
  `color-mix(in oklab, ${v(`color-${foreground}`)} ${Math.round(Number(mix) * 100)}%, ${v(`color-${base}`)})`

export function tokensOf(...path: string[]): Token[] {
  const group = path.reduce<TokenGroup>(
    (current, key) => current[key] as TokenGroup,
    tokens as TokenGroup,
  )
  return flatten(group, path)
}

const rgbPattern = /^rgb\((\d+) (\d+) (\d+) \/ (\d+)%\)$/

const describeRgb = (value: string) => {
  const match = value.trim().match(rgbPattern)
  if (!match) return value.trim()
  const [, r, g, b, alpha] = match
  const name =
    r === '0' && g === '0' && b === '0'
      ? 'Black'
      : r === '255' && g === '255' && b === '255'
        ? 'White'
        : ''
  return name ? `${name} at ${alpha}%` : value.trim()
}

export function describeColor(value: string) {
  const match = value.match(/^light-dark\((.+), (.+)\)$/)
  if (!match) return describeRgb(value)
  const light = describeRgb(match[1]!)
  const dark = describeRgb(match[2]!)
  const [lightColor, lightAlpha] = light.split(' at ')
  const [darkColor, darkAlpha] = dark.split(' at ')
  return lightColor === darkColor && lightAlpha && darkAlpha
    ? `${lightColor}, ${lightAlpha} in light mode and ${darkAlpha} in dark mode`
    : `${light} in light mode, ${dark} in dark mode`
}

export const accents = [
  { name: 'System default', value: '' },
  { name: 'Windows blue', value: '#0078d4' },
  { name: 'Blue', value: '#007aff' },
  { name: 'Purple', value: '#a550a7' },
  { name: 'Pink', value: '#f74f9e' },
  { name: 'Red', value: '#ff5257' },
  { name: 'Orange', value: '#f7821b' },
  { name: 'Yellow', value: '#ffc600' },
  { name: 'Green', value: '#62ba46' },
  { name: 'Graphite', value: '#8c8c8c' },
]

const accentName = `${tokenPrefix}color-accent`

const accentDependents = (() => {
  const all = flatten(tokens as TokenGroup)
  const names = new Set([accentName])
  let grew = true
  while (grew) {
    grew = false
    for (const token of all) {
      if (names.has(token.name)) continue
      if ([...names].some((name) => token.value.includes(`var(${name})`))) {
        names.add(token.name)
        grew = true
      }
    }
  }
  return all.filter((token) => names.has(token.name))
})()

export const SchemePanels = defineComponent({
  name: 'SchemePanels',
  props: {
    system: { type: Boolean, default: false },
    accent: { type: String, default: '' },
  },
  setup(props) {
    const panels = () =>
      props.system
        ? [{ scheme: 'light dark', label: 'Follows your system' }]
        : schemes.map((scheme) => ({ scheme, label: scheme === 'light' ? 'Light' : 'Dark' }))

    const overrides = () =>
      props.accent
        ? Object.fromEntries(
            accentDependents.map((token) => [
              token.name,
              token.name === accentName ? props.accent : token.value,
            ]),
          )
        : {}

    const wrap = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
      gap: '1rem',
      alignItems: 'start',
    }
    const panelStyle = (scheme: string) => ({
      colorScheme: scheme,
      background: v('color-surface'),
      color: v('color-text'),
      border: `${v('border-width')} solid ${v('color-divider')}`,
      borderRadius: v('radius-2'),
      padding: v('space-4'),
      minInlineSize: '0',
      font: `${v('font-weight-regular')} ${v('font-size-sm')}/${v('line-height-base')} ${v('font-sans')}`,
      ...overrides(),
    })
    const label = {
      margin: `0 0 ${v('space-3')}`,
      color: v('color-text-muted'),
      font: `${v('font-weight-bold')} ${v('font-size-xs')}/${v('line-height-tight')} ${v('font-sans')}`,
    }
    return { panels, wrap, panelStyle, label }
  },
  template: `
    <div :style="wrap">
      <section
        v-for="panel in panels()"
        :key="panel.scheme"
        :style="panelStyle(panel.scheme)"
        :aria-label="panel.label"
      >
        <p :style="label">{{ panel.label }}</p>
        <slot :scheme="panel.scheme" />
      </section>
    </div>
  `,
})

export const ui = {
  th: { font: '600 0.75rem/1 system-ui, sans-serif', opacity: 0.7 },
  code: {
    font: '0.8125rem/1.4 ui-monospace, Menlo, Consolas, monospace',
    overflowWrap: 'anywhere',
  },
  note: { margin: '0.25rem 0 0', font: '0.8125rem/1.4 system-ui, sans-serif', opacity: 0.8 },
  value: {
    display: 'block',
    marginBlockStart: '0.25rem',
    font: '0.75rem/1.4 ui-monospace, Menlo, Consolas, monospace',
    opacity: 0.7,
    overflowWrap: 'anywhere',
  },
  group: { margin: '1.5rem 0 0.25rem', font: '700 1rem/1.3 system-ui, sans-serif' },
  row: (columns: string) => ({
    display: 'grid',
    gridTemplateColumns: columns,
    gap: '0.75rem 1rem',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBlockEnd: '1px solid color-mix(in srgb, currentColor 18%, transparent)',
  }),
  cell: (scheme: string) => ({
    colorScheme: scheme,
    background: v('color-surface'),
    color: v('color-text'),
    border: `${v('border-width')} solid ${v('color-divider')}`,
    borderRadius: v('radius-1'),
    padding: v('space-3'),
    display: 'flex',
    alignItems: 'center',
    gap: v('space-3'),
    minBlockSize: '3.5rem',
    minInlineSize: '0',
    font: `${v('font-weight-regular')} ${v('font-size-md')}/${v('line-height-base')} ${v('font-sans')}`,
  }),
  chip: (fill: string) => ({
    flex: 'none',
    inlineSize: '2.5rem',
    blockSize: '2.5rem',
    background: fill,
    border: `${v('border-width')} solid ${v('color-border')}`,
    borderRadius: v('radius-1'),
  }),
}

export const TokenList = defineComponent({
  name: 'TokenList',
  props: {
    rows: {
      type: Array as () => { token: string; value: string; note?: string }[],
      required: true,
    },
    labels: { type: Array as () => string[], default: () => ['Token', 'Value', 'Use'] },
  },
  setup() {
    return {
      ui,
      columns: 'minmax(12rem, 1.2fr) minmax(8rem, 1fr) minmax(12rem, 2fr)',
      valueStyle: { font: '0.8125rem/1.4 system-ui, sans-serif', overflowWrap: 'anywhere' },
      noteStyle: { margin: 0, font: '0.8125rem/1.4 system-ui, sans-serif', opacity: 0.8 },
    }
  },
  template: `
    <div>
      <div :style="{ ...ui.row(columns), borderBlockEnd: 'none', paddingBlock: 0 }">
        <span v-for="label in labels" :key="label" :style="ui.th">{{ label }}</span>
      </div>
      <div v-for="row in rows" :key="row.token" :style="ui.row(columns)">
        <code :style="ui.code">{{ row.token }}</code>
        <span :style="valueStyle">{{ row.value }}</span>
        <p :style="noteStyle">{{ row.note }}</p>
      </div>
    </div>
  `,
})
