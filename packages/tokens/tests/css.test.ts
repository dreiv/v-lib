import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vite-plus/test'
import { flatten, layers, toCss, tokens } from '../src/index.ts'

const styles = fileURLToPath(new URL('../../design-system/src', import.meta.url))

function read(path: string) {
  return readFileSync(path, 'utf-8').replaceAll('\r\n', '\n')
}

function cssFiles() {
  return readdirSync(styles, { recursive: true, encoding: 'utf-8' })
    .filter((file) => file.endsWith('.css'))
    .map((file) => `${styles}/${file}`)
}

function componentCssFiles() {
  return cssFiles().filter((file) => !file.endsWith('/styles/tokens.css'))
}

describe('tokens.css', () => {
  test('matches the generated output (run: vp run tokens)', () => {
    expect(read(`${styles}/styles/tokens.css`)).toBe(toCss())
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

  test('every defined token is consumed somewhere in design-system CSS', () => {
    const defined = flatten(tokens).map((token) => token.name)
    const used = new Set<string>()
    for (const file of cssFiles()) {
      for (const match of read(file).matchAll(/var\((--v-[a-z0-9-]+)/g)) {
        used.add(match[1]!)
      }
    }
    const unused = defined.filter((name) => !used.has(name))
    expect(unused).toEqual([])
  })

  test('components never reference internal --v-ref-* tokens directly', () => {
    const leaks: string[] = []
    for (const file of componentCssFiles()) {
      for (const match of read(file).matchAll(/var\((--v-ref-[a-z0-9-]+)/g)) {
        leaks.push(`${file}: ${match[1]}`)
      }
    }
    expect(leaks).toEqual([])
  })
})
