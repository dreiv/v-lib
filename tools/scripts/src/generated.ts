import { existsSync, readFileSync, writeFileSync } from 'node:fs'

export const lf = (text: string) => text.replaceAll('\r\n', '\n')

export function sync(
  file: string,
  next: string,
  same: (current: string, next: string) => boolean = (current, wanted) => current === wanted,
) {
  const current = existsSync(file) ? lf(readFileSync(file, 'utf-8')) : ''
  const fresh = same(current, next)
  if (!fresh) writeFileSync(file, next)
  return !fresh
}
