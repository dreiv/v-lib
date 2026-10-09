import { describe, expect, test } from 'vite-plus/test'
import { flatten, reducedMotion, tokenPrefix, tokens } from '../src/index.ts'
import { contrast, resolve, type Context } from './color.ts'

const values = new Map(flatten(tokens).map(({ name, value }) => [name, value]))

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
  ['text', 'surface', 4.5],
  ['text', 'surface-subtle', 4.5],
  ['text', 'hover', 4.5],
  ['text-muted', 'surface', 4.5],
  ['text-muted', 'surface-subtle', 4.5],
  ['border', 'surface', 3],
  ['danger', 'surface', 4.5],
  ['danger-text', 'danger', 4.5],
  ['danger', 'surface-subtle', 3],
  ['success', 'surface', 3],
  ['success', 'surface-subtle', 3],
  ['warning', 'surface', 3],
  ['warning', 'surface-subtle', 3],
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

const overlays = [
  ['hover', tokens.opacity.hover],
  ['press', tokens.opacity.press],
] as const

const overlaidPairs = [
  ['text', 'surface-subtle'],
  ['danger-text', 'danger'],
] as const

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

  test('reduced motion only overrides existing tokens', () => {
    for (const { name } of flatten(reducedMotion)) expect(values.has(name)).toBe(true)
  })

  test('control heights meet the 44px touch target at medium', () => {
    expect(tokens.control.height.medium).toBe('2.75rem')
  })

  test('state opacities are ordered and below disabled', () => {
    const { hover, press, disabled } = tokens.opacity
    expect(Number(hover)).toBeLessThan(Number(press))
    expect(Number(press)).toBeLessThan(Number(disabled))
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
    expect(contrast(color(foreground, base), color(background, base))).toBeGreaterThanOrEqual(
      minimum,
    )
  })

  describe.each(overlays)('%s overlay', (_state, opacity) => {
    test.each(overlaidPairs)('%s on %s stays >= 4.5', (foreground, background) => {
      expect(
        contrast(color(foreground, base), overlaid(foreground, background, base, opacity)),
      ).toBeGreaterThanOrEqual(4.5)
    })
  })

  describe.each(accents)('with $name accent', (accent) => {
    const ctx = context(scheme, accent.value)
    const surface = color('surface', ctx)

    test.each(overlays)('accent ink on surface under %s overlay >= 4.5', (_state, opacity) => {
      expect(
        contrast(color('accent-ink', ctx), overlaid('accent-ink', 'surface', ctx, opacity)),
      ).toBeGreaterThanOrEqual(4.5)
    })

    test('accent ink on surface >= 4.5', () => {
      expect(contrast(color('accent-ink', ctx), surface)).toBeGreaterThanOrEqual(4.5)
    })

    test('info on surface and surface-subtle >= 3', () => {
      const subtle = color('surface-subtle', ctx)
      expect(contrast(color('info', ctx), surface)).toBeGreaterThanOrEqual(3)
      expect(contrast(color('info', ctx), subtle)).toBeGreaterThanOrEqual(3)
    })

    test('focus on surface >= 3', () => {
      expect(contrast(color('focus', ctx), surface)).toBeGreaterThanOrEqual(3)
    })
  })
})
