import { fileURLToPath } from 'node:url'
import { toCss } from '../../../packages/tokens/src/index.ts'
import { sync } from './generated.ts'

const target = fileURLToPath(
  new URL('../../../packages/design-system/src/styles/tokens.css', import.meta.url),
)

const normalize = (css: string) =>
  css.replace(/\s+/g, ' ').replace(/\( /g, '(').replace(/ \)/g, ')').trim()

sync(
  target,
  toCss(),
  'vp run tokens:generate',
  (current, next) => normalize(current) === normalize(next),
)
