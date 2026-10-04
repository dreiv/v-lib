import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VLink } from '../src/components/link'

describe('VLink', () => {
  test('renders a native anchor with the slot content', () => {
    const wrapper = mount(VLink, { slots: { default: 'Terms' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.text()).toBe('Terms')
    expect(wrapper.classes()).toContain('v-link')
  })

  test('forwards attributes to the anchor', () => {
    const wrapper = mount(VLink, {
      attrs: {
        href: '/terms',
        target: '_blank',
        rel: 'noopener',
        'aria-label': 'Terms, new window',
      },
    })
    expect(wrapper.attributes('href')).toBe('/terms')
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.attributes('rel')).toBe('noopener')
    expect(wrapper.attributes('aria-label')).toBe('Terms, new window')
  })

  test('adds no role or tabindex of its own', () => {
    const wrapper = mount(VLink, { attrs: { href: '/terms' } })
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })
})
