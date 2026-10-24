import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vite-plus/test'

const components = resolve(import.meta.dirname, '../src/components')
const records = resolve(import.meta.dirname, '../a11y')

const sections = [
  '## Role',
  '## Name source',
  '## Description source',
  '## Keyboard commands',
  '## Focus entry',
  '## Focus movement',
  '## Focus exit',
  '## Focus restoration',
  '## Announcements',
  '## Required consumer content',
  '## WCAG mapping',
  '## Automated tests',
  '## Manual tests',
  '## Screen-reader matrix',
  '## Known limitations',
  '## Verification date',
  '## Verified versions',
]

const names = readdirSync(components, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

describe('accessibility records', () => {
  test.each(names)('%s has a complete record', (name) => {
    const file = `${records}/${name}.md`
    expect(existsSync(file)).toBe(true)
    const source = readFileSync(file, 'utf-8')
    for (const section of sections) expect(source).toContain(section)
  })
})
