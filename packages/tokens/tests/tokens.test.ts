import { describe, expect, test } from 'vite-plus/test'
import {
  flatten,
  reducedMotion,
  reducedMotionAllowlist,
  tokenPrefix,
  tokens,
} from '../src/index.ts'
import { contrast, resolve, type Context } from './color.ts'

const values = new Map(flatten(tokens).map(({ name, value }) => [name, value]))

const TEXT_MIN = 4.5
const NON_TEXT_MIN = 3

const schemes = [
  { name: 'light', dark: false, canvas: '#ffffff', text: '#000000' },
  { name: 'dark (chromium)', dark: true, canvas: '#121212', text: '#ffffff' },
  { name: 'dark (firefox)', dark: true, canvas: '#1c1b22', text: '#fbfbfe' },
]

const accents = [
  { name: 'windows blue', value: '#0078d4' },
  { name: 'blue', value: '#007aff' },
  { name: 'purple', value: '#a550a7' },
  { name: 'pink', value: '#f74f9e' },
  { name: 'red', value: '#ff5257' },
  { name: 'orange', value: '#f7821b' },
  { name: 'yellow', value: '#ffc600' },
  { name: 'green', value: '#62ba46' },
  { name: 'graphite', value: '#8c8c8c' },
]

const pairs = [
  ['text', 'surface', TEXT_MIN],
  ['text', 'surface-subtle', TEXT_MIN],
  ['text', 'hover-mix', TEXT_MIN],
  ['text-muted', 'surface', TEXT_MIN],
  ['text-muted', 'surface-subtle', TEXT_MIN],
  ['text-muted', 'info-surface', TEXT_MIN],
  ['text-muted', 'success-surface', TEXT_MIN],
  ['text-muted', 'warning-surface', TEXT_MIN],
  ['text-muted', 'danger-surface', TEXT_MIN],
  ['border', 'surface', NON_TEXT_MIN],
  ['danger', 'surface', TEXT_MIN],
  ['danger', 'surface-subtle', TEXT_MIN],
  ['danger', 'danger-surface', TEXT_MIN],
  ['success', 'surface', TEXT_MIN],
  ['success', 'surface-subtle', TEXT_MIN],
  ['success', 'success-surface', TEXT_MIN],
  ['warning', 'surface', TEXT_MIN],
  ['warning', 'surface-subtle', TEXT_MIN],
  ['warning', 'warning-surface', TEXT_MIN],
  ['info', 'surface', TEXT_MIN],
  ['info', 'surface-subtle', TEXT_MIN],
  ['info', 'info-surface', TEXT_MIN],
] as const

const roleTokenNames = [
  'surface',
  'surface-subtle',
  'text',
  'text-muted',
  'border',
  'divider',
  'accent',
  'accent-ink',
  'danger',
  'info',
  'success',
  'warning',
  'info-surface',
  'success-surface',
  'warning-surface',
  'danger-surface',
  'focus',
  'scrim',
] as const

function context(scheme: (typeof schemes)[number], accent = accents[0]!.value): Context {
  return { tokens: values, accent, ...scheme }
}

function color(name: string, ctx: Context) {
  return resolve(`var(${tokenPrefix}color-${name})`, ctx)
}

function overlaid(foreground: string, background: string, ctx: Context, opacity: string) {
  const percent = Math.round(Number(opacity) * 100)
  return resolve(
    `color-mix(in oklab, var(${tokenPrefix}color-${foreground}) ${percent}%, var(${tokenPrefix}color-${background}))`,
    ctx,
  )
}

function pairColor(name: string, ctx: Context) {
  if (name === 'hover-mix') return overlaid('text', 'surface', ctx, tokens.opacity.hover)
  return color(name, ctx)
}

const overlays = [
  ['hover', tokens.opacity.hover],
  ['press', tokens.opacity.press],
] as const

const overlaidPairs = [['text', 'surface-subtle']] as const

describe('tokens', () => {
  test('every name uses the prefix and kebab-case', () => {
    for (const { name } of flatten(tokens)) {
      expect(name).toMatch(new RegExp(`^${tokenPrefix}[a-z0-9]+(-[a-z0-9]+)*$`))
    }
  })

  test('names are unique', () => {
    const names = flatten(tokens).map((token) => token.name)
    expect(new Set(names).size).toBe(names.length)
  })

  test('every var() inside a token value is defined', () => {
    const missing: string[] = []
    for (const { name, value } of flatten(tokens)) {
      for (const match of value.matchAll(/var\((--v-[a-z0-9-]+)\)/g)) {
        if (!values.has(match[1]!)) missing.push(`${name}: ${match[1]}`)
      }
    }
    expect(missing).toEqual([])
  })

  test('no public token name leaks the internal ref percentage naming', () => {
    const names = flatten(tokens)
      .map((token) => token.name)
      .filter((name) => !name.startsWith(`${tokenPrefix}ref-`))
    for (const name of names) {
      expect(name).not.toMatch(/-ink-\d+$/)
    }
  })

  test('every duration token is overridden under reduced motion or explicitly allowlisted', () => {
    const reduced = new Set(flatten(reducedMotion).map((token) => token.name))
    for (const key of Object.keys(tokens.duration)) {
      const name = `${tokenPrefix}duration-${key}`
      const allowed = reducedMotionAllowlist.includes(`duration.${key}` as never)
      expect(reduced.has(name) || allowed, `${name} is neither reduced nor allowlisted`).toBe(true)
    }
  })

  test('reduced motion only overrides existing tokens', () => {
    for (const { name } of flatten(reducedMotion)) expect(values.has(name)).toBe(true)
  })

  test('every role color token appears in at least one contrast pair or dedicated test', () => {
    const covered = new Set<string>()
    for (const [fg, bg] of pairs) {
      covered.add(fg)
      if (bg !== 'hover-mix') covered.add(bg)
    }
    covered.add('accent')
    covered.add('accent-ink')
    covered.add('focus')
    for (const name of roleTokenNames) {
      expect(covered.has(name), `${name} has no contrast coverage`).toBe(true)
    }
  })

  test('control heights meet the 44px touch target at medium', () => {
    expect(tokens.control.height.medium).toBe('2.75rem')
  })

  test('state opacities are ordered', () => {
    const { hover, press } = tokens.opacity
    expect(Number(hover)).toBeLessThan(Number(press))
  })

  test('z-index layers are ordered', () => {
    const order = ['sticky', 'modal', 'popover', 'toast', 'tooltip'] as const
    const numbers = order.map((key) => Number(tokens.z[key]))
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b))
  })
})

describe.each(schemes)('contrast: $name', (scheme) => {
  const base = context(scheme)

  test.each(pairs)('%s on %s >= %s', (foreground, background, minimum) => {
    expect(
      contrast(pairColor(foreground, base), pairColor(background, base)),
    ).toBeGreaterThanOrEqual(minimum)
  })

  describe.each(overlays)('%s overlay', (_state, opacity) => {
    test.each(overlaidPairs)('%s on %s stays >= 4.5', (foreground, background) => {
      expect(
        contrast(color(foreground, base), overlaid(foreground, background, base, opacity)),
      ).toBeGreaterThanOrEqual(TEXT_MIN)
    })
  })

  describe.each(accents)('with $name accent', (accent) => {
    const ctx = context(scheme, accent.value)
    const surface = color('surface', ctx)

    test.each(overlays)('accent ink on surface under %s overlay >= 4.5', (_state, opacity) => {
      expect(
        contrast(color('accent-ink', ctx), overlaid('accent-ink', 'surface', ctx, opacity)),
      ).toBeGreaterThanOrEqual(TEXT_MIN)
    })

    test('accent ink on surface >= 4.5', () => {
      expect(contrast(color('accent-ink', ctx), surface)).toBeGreaterThanOrEqual(TEXT_MIN)
    })

    test('focus on surface >= 3', () => {
      expect(contrast(color('focus', ctx), surface)).toBeGreaterThanOrEqual(NON_TEXT_MIN)
    })
  })
})
