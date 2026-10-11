import { describe, expect, test, vi } from 'vite-plus/test'
import { guardRouterNavigate } from '../src/components/link'

function event(overrides: Partial<MouseEvent> = {}) {
  const preventDefault = vi.fn<() => void>()
  const e = {
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    button: 0,
    defaultPrevented: false,
    preventDefault,
    ...overrides,
  } as unknown as MouseEvent
  return { e, preventDefault }
}

describe('guardRouterNavigate', () => {
  test('navigates on a plain left click', () => {
    const navigate = vi.fn<(e: MouseEvent) => void>()
    const { e, preventDefault } = event()
    guardRouterNavigate(e, navigate)
    expect(preventDefault).toHaveBeenCalledOnce()
    expect(navigate).toHaveBeenCalledWith(e)
  })

  test.each([
    ['metaKey', { metaKey: true }],
    ['ctrlKey', { ctrlKey: true }],
    ['shiftKey', { shiftKey: true }],
    ['altKey', { altKey: true }],
    ['middle click', { button: 1 }],
    ['already prevented', { defaultPrevented: true }],
  ])('does not navigate on %s', (_label, overrides) => {
    const navigate = vi.fn<(e: MouseEvent) => void>()
    const { e, preventDefault } = event(overrides as Partial<MouseEvent>)
    guardRouterNavigate(e, navigate)
    expect(preventDefault).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})
