import { expect, test } from 'vite-plus/test'
import { icons } from '../src/index.ts'

test('icons', () => {
  expect(Object.keys(icons)).toHaveLength(0)
})
