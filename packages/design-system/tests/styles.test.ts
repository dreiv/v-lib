import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vite-plus/test'

const root = resolve(import.meta.dirname, '../src')

const files = readdirSync(root, { recursive: true, encoding: 'utf-8' })
  .filter((file) => file.endsWith('.css'))
  .map((file) => ({ file, source: readFileSync(`${root}/${file}`, 'utf-8') }))

describe('css', () => {
  test.each(files)('$file has no !important', ({ source }) => {
    expect(source).not.toContain('!important')
  })

  test('foundation handles forced colors', () => {
    const foundation = files.find(({ file }) => file.endsWith('foundation.css'))!.source
    expect(foundation).toContain('@media (forced-colors: active)')
  })

  test('visually hidden lives in the utilities layer', () => {
    const utilities = files.find(({ file }) => file.endsWith('utilities.css'))!.source
    expect(utilities).toContain('@layer v.utilities')
    expect(utilities).toContain('.v-visually-hidden')
  })

  test.each(files)('$file only uses declared layers', ({ source }) => {
    const declared = new Set(['v.reset', 'v.tokens', 'v.base', 'v.components', 'v.utilities'])
    for (const match of source.matchAll(/@layer\s+([a-z.]+)\s*\{/g)) {
      expect(declared.has(match[1]!)).toBe(true)
    }
  })

  test('reduced motion is handled through tokens', () => {
    const tokens = files.find(({ file }) => file.endsWith('tokens.css'))!.source
    expect(tokens).toContain('@media (prefers-reduced-motion: reduce)')
  })
})
