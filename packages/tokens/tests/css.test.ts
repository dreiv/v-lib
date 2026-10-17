import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vite-plus/test'
import { flatten, layers, toCss, tokens } from '../src/index.ts'

const styles = fileURLToPath(new URL('../../design-system/src', import.meta.url))

const reserved = new Set([
  '--v-font-mono',
  '--v-font-size-xs',
  '--v-font-size-xl',
  '--v-font-size-2xl',
  '--v-font-weight-regular',
  '--v-line-height-relaxed',
  '--v-color-surface-raised',
  '--v-z-sticky',
  '--v-color-surface-selected',
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
  test('matches the generated output apart from formatting (run: vp run tokens)', () => {
    expect(normalize(read(`${styles}/styles/tokens.css`))).toBe(normalize(toCss()))
  })

  test('declares the cascade layers in order', () => {
    expect(read(`${styles}/styles/tokens.css`).split('\n')[0]).toBe(`@layer ${layers.join(', ')};`)
  })

  test('every --v- variable used in design-system CSS is defined', () => {
    const defined = new Set(flatten(tokens).map((token) => token.name))
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

  test('every reserved token is defined and still unused', () => {
    const defined = new Set(flatten(tokens).map((token) => token.name))
    const used = usedTokens()
    const stale = [...reserved].filter((name) => !defined.has(name) || used.has(name))
    expect(stale).toEqual([])
  })
})
