import { expect, test } from 'vite-plus/test'
import { tokenPrefix } from '../src/index.ts'

test('tokenPrefix', () => {
  expect(tokenPrefix).toBe('--v-')
})
