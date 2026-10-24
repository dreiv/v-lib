import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { relative } from 'node:path'

export const check = process.argv.includes('--check')

export const lf = (text: string) => text.replaceAll('\r\n', '\n')

export function sync(
  file: string,
  next: string,
  hint: string,
  same: (current: string, next: string) => boolean = (current, wanted) => current === wanted,
) {
  const current = existsSync(file) ? lf(readFileSync(file, 'utf-8')) : ''
  const fresh = same(current, next)
  if (check) {
    if (!fresh) {
      console.error(`${relative(process.cwd(), file)} is out of date: run \`${hint}\``)
      process.exit(1)
    }
    return false
  }
  if (!fresh) writeFileSync(file, next)
  return !fresh
}
