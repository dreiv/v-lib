import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VSpinner } from '../src/components/spinner'

describe('VSpinner', () => {
  test('is a status named by its label with a hidden decorative svg', () => {
    const wrapper = mount(VSpinner, { props: { label: 'Loading orders' } })
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.text()).toBe('Loading orders')
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
    expect(wrapper.get('svg').attributes('focusable')).toBe('false')
  })

  test('forwards attributes', () => {
    expect(mount(VSpinner, { props: { label: 'x' }, attrs: { id: 's' } }).attributes('id')).toBe(
      's',
    )
  })
})
