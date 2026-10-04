import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const [dir, ...needles] = process.argv.slice(2)

function* walk(path: string): Generator<string> {
  for (const name of readdirSync(path)) {
    const full = join(path, name)
    if (statSync(full).isDirectory()) yield* walk(full)
    else if (/\.(js|mjs|css)$/.test(name)) yield full
  }
}

const failures: string[] = []
for (const file of walk(dir)) {
  const source = readFileSync(file, 'utf-8')
  for (const needle of needles) {
    if (source.includes(needle)) failures.push(`${file}: ${needle}`)
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}
