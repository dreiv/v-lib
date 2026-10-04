import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VIconButton } from '../src/components/icon-button'

const icon = '<svg aria-hidden="true"></svg>'

describe('VIconButton', () => {
  test('renders a native button with type=button by default', () => {
    const wrapper = mount(VIconButton, { slots: { default: icon } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  test('forwards the accessible name and other attributes to the button', () => {
    const wrapper = mount(VIconButton, { attrs: { 'aria-label': 'Close dialog', id: 'close' } })
    expect(wrapper.attributes('aria-label')).toBe('Close dialog')
    expect(wrapper.attributes('id')).toBe('close')
  })

  test('exposes size as a data attribute', () => {
    expect(mount(VIconButton).attributes('data-size')).toBe('medium')
    expect(mount(VIconButton, { props: { size: 'small' } }).attributes('data-size')).toBe('small')
  })

  test('applies the type', () => {
    expect(mount(VIconButton, { props: { type: 'submit' } }).attributes('type')).toBe('submit')
  })

  test('disabled uses the native attribute', () => {
    expect(mount(VIconButton, { props: { disabled: true } }).attributes('disabled')).toBeDefined()
  })

  test('calls a click listener passed as an attribute', async () => {
    let clicks = 0
    const wrapper = mount(VIconButton, { attrs: { onClick: () => clicks++ } })
    await wrapper.trigger('click')
    expect(clicks).toBe(1)
  })

  test('does not call the click listener when disabled', async () => {
    let clicks = 0
    const wrapper = mount(VIconButton, {
      props: { disabled: true },
      attrs: { onClick: () => clicks++ },
    })
    await wrapper.trigger('click')
    expect(clicks).toBe(0)
  })
})
