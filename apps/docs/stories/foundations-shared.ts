import { defineComponent, type PropType } from 'vue'
import { flatten, tokenPrefix, tokens, type Token, type TokenGroup } from '@v/design-tokens'

export const schemes = ['light', 'dark'] as const

export const v = (name: string) => `var(${tokenPrefix}${name})`

export const px = (rem: string) => `${Math.round(parseFloat(rem) * 16)}px`

export const percent = (value: string) => `${Math.round(Number(value) * 100)}%`

export const overlay = (foreground: string, opacity: string, base: string) =>
  `color-mix(in oklab, ${v(`color-${foreground}`)} ${Math.round(Number(opacity) * 100)}%, ${v(`color-${base}`)})`

export function tokensOf(...path: string[]): Token[] {
  const group = path.reduce<TokenGroup>(
    (current, key) => current[key] as TokenGroup,
    tokens as TokenGroup,
  )
  return flatten(group, path)
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

export const textMinimum = 4.5

export const nonTextMinimum = 3

export interface ContrastPair {
  foreground: string
  background: string
  minimum: number
}

const textOn = (foreground: string, ...backgrounds: string[]): ContrastPair[] =>
  backgrounds.map((background) => ({ foreground, background, minimum: textMinimum }))

export const contrastPairs: ContrastPair[] = [
  ...textOn('text', 'surface', 'surface-subtle', 'hover-mix'),
  ...textOn(
    'text-muted',
    'surface',
    'surface-subtle',
    'info-surface',
    'success-surface',
    'warning-surface',
    'danger-surface',
  ),
  { foreground: 'border', background: 'surface', minimum: nonTextMinimum },
  ...['danger', 'success', 'warning', 'info'].flatMap((tone) =>
    textOn(tone, 'surface', 'surface-subtle', `${tone}-surface`),
  ),
]

const backdropLabel = (name: string) => (name === 'hover-mix' ? 'the hover overlay' : name)

const join = (items: string[]) =>
  items.length < 3
    ? items.join(' and ')
    : `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`

export function contrastNotes(name: string): string[] {
  const notes: string[] = []
  const asForeground = contrastPairs.filter((pair) => pair.foreground === name)
  for (const minimum of new Set(asForeground.map((pair) => pair.minimum))) {
    const backdrops = asForeground
      .filter((pair) => pair.minimum === minimum)
      .map((pair) => backdropLabel(pair.background))
    notes.push(`Tested at ${minimum}:1 on ${join(backdrops)}.`)
  }
  const asBackground = contrastPairs.filter((pair) => pair.background === name)
  if (asBackground.length) {
    notes.push(`Backdrop for ${join([...new Set(asBackground.map((pair) => pair.foreground))])}.`)
  }
  return notes
}

const systemColors: Record<string, string> = {
  Canvas: "The browser's page background for the active color scheme.",
  CanvasText: "The browser's default text color for the active color scheme.",
  AccentColor: 'The accent color chosen in the operating system, when the browser exposes it.',
  AccentColorText: 'The text color the operating system pairs with its accent.',
}

const inkReference = new RegExp(`^var\\(${tokenPrefix}ref-ink-(\\d+)\\)$`)
const colorAlias = new RegExp(`^var\\(${tokenPrefix}color-([a-z-]+)\\)$`)
const tinted = new RegExp(
  `^color-mix\\(in oklab, var\\(${tokenPrefix}color-([a-z]+)\\) var\\(${tokenPrefix}ref-tone-tint\\), var\\(${tokenPrefix}color-surface\\)\\)$`,
)
const accentMix = new RegExp(`var\\(${tokenPrefix}color-accent\\) (\\d+)%`)
const lightnessPair =
  /^light-dark\(oklch\((\d+(?:\.\d+)?)% [\d.]+ [\d.]+\), oklch\((\d+(?:\.\d+)?)% [\d.]+ [\d.]+\)\)$/
const blackPair = /^light-dark\(rgb\(0 0 0 \/ (\d+)%\), rgb\(0 0 0 \/ (\d+)%\)\)$/

export function describeColor(value: string): string | undefined {
  if (systemColors[value]) return systemColors[value]

  const ink = value.match(inkReference)
  if (ink) return `The text color blended ${ink[1]}% into the surface.`

  const tone = value.match(tinted)
  if (tone) return `${tokens.ref.toneTint} of the ${tone[1]} color blended into the surface.`

  const mix = value.match(accentMix)
  const lower = value.match(/min\(l, ([\d.]+)\)/)
  const upper = value.match(/max\(l, ([\d.]+)\)/)
  if (mix && lower && upper) {
    return `The accent blended ${mix[1]}% toward the text color, then kept at ${Math.round(Number(lower[1]) * 100)}% lightness or less in light mode and ${Math.round(Number(upper[1]) * 100)}% or more in dark mode.`
  }

  const lightness = value.match(lightnessPair)
  if (lightness) {
    return `Tuned per scheme: ${lightness[1]}% lightness in light mode, ${lightness[2]}% in dark mode.`
  }

  const black = value.match(blackPair)
  if (black) return `Black at ${black[1]}% opacity in light mode and ${black[2]}% in dark mode.`

  const alias = value.match(colorAlias)
  if (alias) return `The same color as ${alias[1]}.`

  return undefined
}

const fontShorthand = (weight: string, size: string, lineHeight: string, family: string) =>
  `${v(`font-weight-${weight}`)} ${v(`font-size-${size}`)}/${v(`line-height-${lineHeight}`)} ${v(`font-${family}`)}`

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
      font: fontShorthand('regular', 'sm', 'base', 'sans'),
      ...overrides(),
    })
    const label = {
      margin: `0 0 ${v('space-3')}`,
      color: v('color-text-muted'),
      font: fontShorthand('bold', 'xs', 'tight', 'sans'),
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
  th: { font: fontShorthand('bold', 'xs', 'tight', 'sans') },
  code: {
    font: fontShorthand('regular', 'sm', 'base', 'mono'),
    overflowWrap: 'anywhere',
  },
  note: {
    margin: `${v('space-1')} 0 0`,
    font: fontShorthand('regular', 'sm', 'base', 'sans'),
  },
  group: {
    margin: `${v('space-6')} 0 ${v('space-1')}`,
    font: fontShorthand('bold', 'md', 'tight', 'sans'),
  },
  field: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: v('space-2'),
    marginBlockEnd: v('space-4'),
    font: fontShorthand('regular', 'sm', 'base', 'sans'),
  },
  row: (columns: string) => ({
    display: 'grid',
    gridTemplateColumns: columns,
    gap: `${v('space-3')} ${v('space-4')}`,
    alignItems: 'center',
    padding: `${v('space-3')} 0`,
    borderBlockEnd: `${v('border-width')} solid color-mix(in srgb, currentColor 18%, transparent)`,
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
    minInlineSize: '0',
    font: fontShorthand('regular', 'md', 'base', 'sans'),
  }),
  chip: (fill: string) => ({
    flex: 'none',
    inlineSize: v('space-10'),
    blockSize: v('space-10'),
    background: fill,
    border: `${v('border-width')} solid ${v('color-border')}`,
    borderRadius: v('radius-1'),
  }),
}

export interface TokenRow {
  token: string
  value: string
  note?: string
}

export const TokenList = defineComponent({
  name: 'TokenList',
  props: {
    rows: { type: Array as PropType<TokenRow[]>, required: true },
    labels: { type: Array as PropType<string[]>, default: () => ['Token', 'Value', 'Use'] },
  },
  setup() {
    const cell = {
      padding: `${v('space-2')} ${v('space-3')}`,
      textAlign: 'start',
      verticalAlign: 'top',
      borderBlockEnd: `${v('border-width')} solid ${v('color-divider')}`,
    }
    const table = {
      inlineSize: '100%',
      borderCollapse: 'collapse',
      font: fontShorthand('regular', 'sm', 'base', 'sans'),
    }
    const rowHeader = { ...cell, fontWeight: v('font-weight-regular') }
    return { ui, cell, table, rowHeader }
  },
  template: `
    <table :style="table">
      <thead>
        <tr>
          <th v-for="label in labels" :key="label" scope="col" :style="[cell, ui.th]">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.token">
          <th scope="row" :style="rowHeader"><code :style="ui.code">{{ row.token }}</code></th>
          <td :style="cell">{{ row.value }}</td>
          <td v-if="labels[2]" :style="cell">{{ row.note }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
