import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VIconChevronDown, VIconClose, VIconEllipsis } from '../src/index.ts'

describe('icons', () => {
  test.each([
    ['VIconChevronDown', VIconChevronDown],
    ['VIconClose', VIconClose],
    ['VIconEllipsis', VIconEllipsis],
  ])('%s renders a decorative svg', (_, icon) => {
    const wrapper = mount(icon)
    expect(wrapper.element.tagName.toLowerCase()).toBe('svg')
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('stroke')).toBe('currentColor')
  })

  test('attributes fall through to the svg', () => {
    const wrapper = mount(VIconClose, { attrs: { class: 'x', 'data-test': 'y' } })
    expect(wrapper.classes()).toContain('x')
    expect(wrapper.attributes('data-test')).toBe('y')
  })
})
