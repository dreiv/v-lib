// Regenerates packages/icons/src/index.ts from the icon files in packages/icons/src.
// Never edit index.ts by hand.
//
//   vp run icons:generate   rewrite index.ts
//
// An icon is one file, src/<kebab-name>.ts, exporting VIcon<PascalName>.
// Two files with the same drawing are an error.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lf, sync } from './generated.ts'

const icons = fileURLToPath(new URL('../../../packages/icons', import.meta.url))
const src = join(icons, 'src')
const support = new Set(['index.ts', 'svg.ts'])

const read = (file: string) => lf(readFileSync(file, 'utf-8'))

const pascal = (kebab: string) =>
  `VIcon${kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')}`

const files = readdirSync(src)
  .filter((file) => file.endsWith('.ts') && !support.has(file))
  .map((file) => file.slice(0, -3))
  .sort()

const errors: string[] = []
const drawings = new Map<string, string>()

for (const name of files) {
  const source = read(join(src, `${name}.ts`))
  const declared = /export const (\w+) = \{\s*name: '(\w+)',/.exec(source)
  if (declared?.[1] !== pascal(name) || declared[2] !== pascal(name)) {
    errors.push(`${name}.ts must export a component named ${pascal(name)}`)
  }
  const drawing = (source.split('setup:')[1] ?? '').trim()
  const twin = drawings.get(drawing)
  if (twin) errors.push(`${name}.ts draws the same icon as ${twin}.ts: remove one`)
  else drawings.set(drawing, name)
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const lines = files.map((name) => `export { ${pascal(name)} } from './${name}'`)

sync(join(src, 'index.ts'), `${lines.join('\n')}\n`)

process.stdout.write(`${files.length} icons\n`)
