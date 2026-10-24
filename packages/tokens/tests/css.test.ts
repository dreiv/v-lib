import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vite-plus/test'
import { flatten, layers, toCss, tokens } from '../src/index.ts'

const styles = fileURLToPath(new URL('../../design-system/src', import.meta.url))

const reserved = new Set([
  '--v-font-mono',
  '--v-font-size-xl',
  '--v-font-size-2xl',
  '--v-font-weight-regular',
  '--v-line-height-relaxed',
  '--v-z-sticky',
  '--v-color-surface-selected',
])

// Custom properties that components read with a fallback so a consumer can set them per instance
// (see each component's docs). They are public hooks, not tokens, so they are not in tokens.ts.
const hooks = new Set([
  '--v-badge-overlay-offset',
  '--v-badge-overlay-ring',
  '--v-spinner-size',
  '--v-tag-group-gap',
  '--v-tag-hit',
  '--v-text-area-max-block-size',
])

function read(path: string) {
  return readFileSync(path, 'utf-8').replaceAll('\r\n', '\n')
}

function normalize(css: string) {
  return css.replace(/\s+/g, ' ').replace(/\( /g, '(').replace(/ \)/g, ')').trim()
}

function cssFiles() {
  return readdirSync(styles, { recursive: true, encoding: 'utf-8' })
    .filter((file) => file.endsWith('.css'))
    .map((file) => `${styles}/${file}`)
}

function declaredInCss() {
  const declared = new Set<string>()
  for (const file of cssFiles()) {
    for (const match of read(file).matchAll(/(--v-[a-z0-9-]+)\s*:/g)) declared.add(match[1]!)
  }
  return declared
}

function usedTokens() {
  const used = new Set<string>()
  for (const file of cssFiles()) {
    for (const match of read(file).matchAll(/var\((--v-[a-z0-9-]+)/g)) {
      used.add(match[1]!)
    }
  }
  return used
}

describe('tokens.css', () => {
  test('matches the generated output apart from formatting (run: vp run tokens:generate)', () => {
    expect(normalize(read(`${styles}/styles/tokens.css`))).toBe(normalize(toCss()))
  })

  test('declares the cascade layers in order', () => {
    expect(read(`${styles}/styles/tokens.css`).split('\n')[0]).toBe(`@layer ${layers.join(', ')};`)
  })

  test('every --v- variable used in design-system CSS is defined', () => {
    const defined = new Set([
      ...flatten(tokens).map((token) => token.name),
      ...declaredInCss(),
      ...hooks,
    ])
    const missing: string[] = []
    for (const file of cssFiles()) {
      for (const match of read(file).matchAll(/var\((--v-[a-z0-9-]+)/g)) {
        if (!defined.has(match[1]!)) missing.push(`${file}: ${match[1]}`)
      }
    }
    expect(missing).toEqual([])
  })

  test('every defined token is consumed in design-system CSS or listed as reserved', () => {
    const used = usedTokens()
    const unused = flatten(tokens)
      .map((token) => token.name)
      .filter((name) => !used.has(name) && !reserved.has(name))
    expect(unused).toEqual([])
  })

  test('every component hook is still read by some design-system CSS and is not a token', () => {
    const tokenNames = new Set(flatten(tokens).map((token) => token.name))
    const used = usedTokens()
    const stale = [...hooks].filter((name) => tokenNames.has(name) || !used.has(name))
    expect(stale).toEqual([])
  })

  test('every reserved token is defined and still unused', () => {
    const defined = new Set(flatten(tokens).map((token) => token.name))
    const used = usedTokens()
    const stale = [...reserved].filter((name) => !defined.has(name) || used.has(name))
    expect(stale).toEqual([])
  })
})
