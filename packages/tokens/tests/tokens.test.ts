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
] as const

function context(scheme: (typeof schemes)[number], accent = accents[0]!.value): Context {
  return { tokens: values, accent, ...scheme }
}

function color(name: string, ctx: Context) {
  return resolve(`var(${tokenPrefix}color-${name})`, ctx)
}

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

  describe.each(accents)('with $name accent', (accent) => {
    const ctx = context(scheme, accent.value)
    const surface = color('surface', ctx)

    test('accent ink on surface >= 4.5', () => {
      expect(contrast(color('accent-ink', ctx), surface)).toBeGreaterThanOrEqual(4.5)
    })

    test('focus on surface >= 3', () => {
      expect(contrast(color('focus', ctx), surface)).toBeGreaterThanOrEqual(3)
    })
  })
})
