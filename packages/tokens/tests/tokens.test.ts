import { describe, expect, test } from 'vite-plus/test'
import { flatten, reducedMotion, tokenPrefix, tokens } from '../src/index.ts'
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

const plainSurfaces = ['surface', 'surface-muted', 'surface-raised', 'surface-overlay'] as const
const statuses = ['info', 'success', 'warning', 'danger'] as const

const pairs = [
  ...plainSurfaces.flatMap((surface) => [
    ['text', surface, TEXT_MIN],
    ['text-muted', surface, TEXT_MIN],
    ['border', surface, NON_TEXT_MIN],
    ...statuses.map((status) => [`text-${status}`, surface, TEXT_MIN]),
  ]),
  ...statuses.flatMap((status) => [
    ['text', `surface-${status}`, TEXT_MIN],
    ['text-muted', `surface-${status}`, TEXT_MIN],
    [`text-${status}`, `surface-${status}`, TEXT_MIN],
  ]),
] as [string, string, number][]

const colorTokenNames = flatten({ color: tokens.color }).map(({ name }) =>
  name.slice(`${tokenPrefix}color-`.length),
)

const decorativeColors = new Set(['border-muted', 'surface-scrim'])

const browserControlledColors = new Set(['surface-accent', 'text-on-accent'])

const dedicatedColors = new Set(['text-accent'])

function context(scheme: (typeof schemes)[number], accent = accents[0]!.value): Context {
  return { tokens: values, accent, ...scheme }
}

function token(name: string, ctx: Context) {
  return resolve(`var(${tokenPrefix}${name})`, ctx)
}

function color(name: string, ctx: Context) {
  return token(`color-${name}`, ctx)
}

function hovered(foreground: string, background: string, ctx: Context) {
  return resolve(
    `color-mix(in oklab, var(${tokenPrefix}color-${foreground}) var(${tokenPrefix}state-hover), var(${tokenPrefix}color-${background}))`,
    ctx,
  )
}

function rem(value: string) {
  return Number(value.replace('rem', ''))
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

  test('color tokens are named property first: surface, text or border', () => {
    for (const name of colorTokenNames) {
      expect(name).toMatch(/^(surface|text|border)(-[a-z]+)*$/)
    }
  })

  test('size scales only use the shared t-shirt vocabulary', () => {
    const sizes = new Set(['xs', 'sm', 'md', 'lg', 'xl', '2xl'])
    for (const scale of [tokens.font.size, tokens.control.height, tokens.radius]) {
      for (const key of Object.keys(scale)) {
        expect(sizes.has(key)).toBe(true)
      }
    }
  })

  test('every duration token is overridden under reduced motion', () => {
    const reduced = new Set(flatten(reducedMotion).map((token) => token.name))
    for (const key of Object.keys(tokens.duration)) {
      const name = `${tokenPrefix}duration-${key}`
      expect(reduced.has(name), `${name} is not reduced`).toBe(true)
    }
  })

  test('reduced motion only overrides existing tokens', () => {
    for (const { name } of flatten(reducedMotion)) expect(values.has(name)).toBe(true)
  })

  test('every non-decorative color token has contrast coverage', () => {
    const covered = new Set<string>(dedicatedColors)
    for (const [foreground, background] of pairs) {
      covered.add(foreground)
      covered.add(background)
    }
    for (const name of colorTokenNames) {
      if (decorativeColors.has(name) || browserControlledColors.has(name)) continue
      expect(covered.has(name), `${name} has no contrast coverage`).toBe(true)
    }
  })

  test('state hover is a percentage usable directly in color-mix', () => {
    expect(tokens.state.hover).toMatch(/^\d+(\.\d+)?%$/)
  })

  test('control heights meet WCAG 2.2 target sizes', () => {
    expect(rem(tokens.control.height.xs)).toBeGreaterThanOrEqual(1.5)
    expect(rem(tokens.control.height.md)).toBeGreaterThanOrEqual(2.75)
  })

  test('focus ring is at least 2px thick', () => {
    expect(Number.parseFloat(tokens.focus.width)).toBeGreaterThanOrEqual(2)
  })

  test('body line height meets WCAG text spacing', () => {
    expect(Number(tokens.lineHeight.normal)).toBeGreaterThanOrEqual(1.5)
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

  describe('hover overlay', () => {
    const interactive = [
      ['text', 'surface'],
      ['text', 'surface-muted'],
      ['text', 'surface-raised'],
      ['text', 'surface-overlay'],
    ] as const

    test.each(interactive)('%s on %s stays >= 4.5', (foreground, background) => {
      expect(
        contrast(color(foreground, base), hovered(foreground, background, base)),
      ).toBeGreaterThanOrEqual(TEXT_MIN)
    })
  })

  describe.each(accents)('with $name accent', (accent) => {
    const ctx = context(scheme, accent.value)

    test.each(plainSurfaces)('accent text on %s >= 4.5', (surface) => {
      expect(contrast(color('text-accent', ctx), color(surface, ctx))).toBeGreaterThanOrEqual(
        TEXT_MIN,
      )
    })

    test.each(plainSurfaces)('accent text on %s under hover >= 4.5', (surface) => {
      expect(
        contrast(color('text-accent', ctx), hovered('text-accent', surface, ctx)),
      ).toBeGreaterThanOrEqual(TEXT_MIN)
    })

    test.each(plainSurfaces)('focus ring on %s >= 3', (surface) => {
      expect(contrast(token('focus-color', ctx), color(surface, ctx))).toBeGreaterThanOrEqual(
        NON_TEXT_MIN,
      )
    })
  })
})
