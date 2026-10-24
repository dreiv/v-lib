import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vite-plus/test'
import * as icons from '../src/index.ts'

const src = resolve(import.meta.dirname, '../src')
const aliases = JSON.parse(
  readFileSync(resolve(import.meta.dirname, '../aliases.json'), 'utf-8'),
) as Record<string, string>

const names = readdirSync(src)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts' && file !== 'svg.ts')
  .map((file) => file.slice(0, -3))

const pascal = (kebab: string) =>
  `VIcon${kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')}`

describe('icon index', () => {
  test('every icon file is exported under its own name', () => {
    for (const name of names) expect(icons).toHaveProperty(pascal(name))
  })

  test('exports are exactly the files plus the aliases (index.ts is generated)', () => {
    const expected = [...names, ...Object.keys(aliases)].map(pascal).sort()
    expect(Object.keys(icons).sort()).toEqual(expected)
  })

  test('an alias points at an existing icon and has no file of its own', () => {
    for (const [alias, target] of Object.entries(aliases)) {
      expect(names).not.toContain(alias)
      expect(names).toContain(target)
      expect(icons[pascal(alias) as keyof typeof icons]).toBe(
        icons[pascal(target) as keyof typeof icons],
      )
    }
  })

  test('no two icon files draw the same thing', () => {
    const seen = new Map<string, string>()
    for (const name of names) {
      const source = readFileSync(resolve(src, `${name}.ts`), 'utf-8')
      const drawing = (source.split('setup:')[1] ?? '').trim()
      expect({ name, twin: seen.get(drawing) }).toEqual({ name, twin: undefined })
      seen.set(drawing, name)
    }
  })
})
