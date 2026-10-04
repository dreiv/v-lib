import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { toCss } from '../../../packages/tokens/src/index.ts'

const target = fileURLToPath(
  new URL('../../../packages/design-system/src/styles/tokens.css', import.meta.url),
)

writeFileSync(target, toCss())
