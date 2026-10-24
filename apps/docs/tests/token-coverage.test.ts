import { describe, expect, test } from 'vite-plus/test'
import { flatten, tokens, type TokenGroup } from '@v/design-tokens'
import { documented, pageOf, pages, unmatchedEntries } from '../stories/token-docs.ts'

const names = flatten(tokens as TokenGroup).map((token) => token.name)

describe('token documentation', () => {
  test('every token is explained on a foundations page', () => {
    expect(names.filter((name) => !pageOf(name))).toEqual([])
  })

  test('every registry entry still matches a token', () => {
    expect(unmatchedEntries(names).map((entry) => entry.match)).toEqual([])
  })

  test('every registry entry points at a known page', () => {
    for (const entry of documented) expect(pages[entry.page]).toBeDefined()
  })
})
