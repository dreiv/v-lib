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
        'aria-label': 'Terms, new window',
      },
    })
    expect(wrapper.attributes('href')).toBe('/terms')
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.attributes('aria-label')).toBe('Terms, new window')
  })

  test('adds no role or tabindex of its own', () => {
    const wrapper = mount(VLink, { attrs: { href: '/terms' } })
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  test('does not add the external icon or rel by default', () => {
    const wrapper = mount(VLink, { attrs: { href: '/terms' } })
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.find('.v-link__icon').exists()).toBe(false)
    expect(wrapper.find('.v-visually-hidden').exists()).toBe(false)
  })

  test('target="_blank" adds a safe rel by default', () => {
    const wrapper = mount(VLink, { attrs: { href: '/terms', target: '_blank' } })
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  test('an explicit rel overrides the default when target="_blank"', () => {
    const wrapper = mount(VLink, {
      attrs: { href: '/terms', target: '_blank', rel: 'noopener' },
    })
    expect(wrapper.attributes('rel')).toBe('noopener')
  })

  test('target="_blank" renders a hidden external icon and announces the new window', () => {
    const wrapper = mount(VLink, {
      attrs: { href: '/terms', target: '_blank' },
      slots: { default: 'Terms' },
    })
    const icon = wrapper.find('.v-link__icon')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('aria-hidden')).toBe('true')
    const hidden = wrapper.find('.v-visually-hidden')
    expect(hidden.exists()).toBe(true)
    expect(hidden.element.textContent).toBe(' (opens in new window)')
  })

  test('an explicit aria-label suppresses the generated new-window text', () => {
    const wrapper = mount(VLink, {
      attrs: {
        href: '/terms',
        target: '_blank',
        'aria-label': 'Terms of use, new window',
      },
    })
    expect(wrapper.find('.v-link__icon').exists()).toBe(true)
    expect(wrapper.find('.v-visually-hidden').exists()).toBe(false)
  })
})
