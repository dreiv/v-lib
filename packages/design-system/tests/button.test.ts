import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VButton } from '../src/components/button'

describe('VButton', () => {
  test('renders a native button with type=button by default', () => {
    const wrapper = mount(VButton, { slots: { default: 'Save' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.text()).toBe('Save')
  })

  test('exposes variant and size as data attributes', () => {
    const wrapper = mount(VButton, { props: { variant: 'danger', size: 'large' } })
    expect(wrapper.attributes('data-variant')).toBe('danger')
    expect(wrapper.attributes('data-size')).toBe('large')
  })

  test('forwards attributes to the button', () => {
    const wrapper = mount(VButton, { attrs: { 'aria-label': 'Save draft', id: 'save' } })
    expect(wrapper.attributes('aria-label')).toBe('Save draft')
    expect(wrapper.attributes('id')).toBe('save')
  })

  test('pending disables the button and sets aria-busy', () => {
    const wrapper = mount(VButton, { props: { pending: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })
})
