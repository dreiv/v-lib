// Regenerates packages/icons/src/index.ts from the icon files in packages/icons/src and the
// alias list in packages/icons/aliases.json. Never edit index.ts by hand.
//
//   vp run icons:generate   rewrite index.ts
//
// An icon is one file, src/<kebab-name>.ts, exporting VIcon<PascalName>. A second name for the same
// drawing (a renamed upstream icon, a synonym) is an entry in aliases.json, { "<alias>": "<target>" },
// and has no file of its own. Two files with the same drawing are an error: alias one of them.
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

const aliases = JSON.parse(read(join(icons, 'aliases.json'))) as Record<string, string>

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
  if (twin) errors.push(`${name}.ts draws the same icon as ${twin}.ts: make one an alias`)
  else drawings.set(drawing, name)
}

for (const [alias, target] of Object.entries(aliases)) {
  if (files.includes(alias)) errors.push(`alias ${alias} also has its own file`)
  if (!files.includes(target)) errors.push(`alias ${alias} points at missing icon ${target}`)
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const lines = [
  ...files.map((name) => ({
    name,
    line: `export { ${pascal(name)} } from './${name}'`,
  })),
  ...Object.entries(aliases).map(([alias, target]) => ({
    name: alias,
    line: `export { ${pascal(target)} as ${pascal(alias)} } from './${target}'`,
  })),
]
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
  .map(({ line }) => line)

sync(join(src, 'index.ts'), `${lines.join('\n')}\n`)

process.stdout.write(`${files.length} icons, ${Object.keys(aliases).length} aliases\n`)
