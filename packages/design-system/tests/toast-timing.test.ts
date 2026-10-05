import { describe, expect, test } from 'vite-plus/test'
import { readingTime } from '../src/components/toast/toast.timing'

describe('readingTime', () => {
  test('never goes below six seconds', () => {
    expect(readingTime('Saved')).toBe(6000)
    expect(readingTime('Project saved', undefined)).toBe(6000)
  })

  test('adds a second for every three words on top of three seconds', () => {
    const twelve = Array.from({ length: 12 }, () => 'word').join(' ')
    expect(readingTime(twelve)).toBe(7000)
    const thirty = Array.from({ length: 30 }, () => 'word').join(' ')
    expect(readingTime(thirty)).toBe(13000)
  })

  test('counts the title and the description together', () => {
    const fifteen = Array.from({ length: 15 }, () => 'word').join(' ')
    expect(readingTime('one two three', fifteen)).toBe(9000)
  })
})
