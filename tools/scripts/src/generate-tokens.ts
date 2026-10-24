import { fileURLToPath } from 'node:url'
import { normalizeCss, toCss } from '../../../packages/tokens/src/index.ts'
import { sync } from './generated.ts'

const target = fileURLToPath(
  new URL('../../../packages/design-system/src/styles/tokens.css', import.meta.url),
)

sync(target, toCss(), (current, next) => normalizeCss(current) === normalizeCss(next))
