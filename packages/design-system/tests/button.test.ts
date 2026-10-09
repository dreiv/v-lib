import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { describe, expect, test, vi } from 'vite-plus/test'
import { VButton } from '../src/components/button'

describe('VButton', () => {
  test('renders a native button with type=button by default', () => {
    const wrapper = mount(VButton, { slots: { default: 'Save' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.text()).toBe('Save')
  })

  test('wraps slot content in a label span', () => {
    const wrapper = mount(VButton, { slots: { default: 'Save' } })
    const label = wrapper.find('.v-button__label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Save')
  })

  test('exposes variant and size as data attributes', () => {
    const wrapper = mount(VButton, { props: { variant: 'danger', size: 'large' } })
    expect(wrapper.attributes('data-variant')).toBe('danger')
    expect(wrapper.attributes('data-size')).toBe('large')
  })

  test('exposes full and iconOnly as data attributes', () => {
    const wrapper = mount(VButton, { props: { full: true, iconOnly: true } })
    expect(wrapper.attributes('data-full')).toBeDefined()
    expect(wrapper.attributes('data-icon-only')).toBeDefined()
  })

  test('does not set data-full or data-icon-only by default', () => {
    const wrapper = mount(VButton)
    expect(wrapper.attributes('data-full')).toBeUndefined()
    expect(wrapper.attributes('data-icon-only')).toBeUndefined()
  })

  test('forwards attributes to the button', () => {
    const wrapper = mount(VButton, { attrs: { 'aria-label': 'Save draft', id: 'save' } })
    expect(wrapper.attributes('aria-label')).toBe('Save draft')
    expect(wrapper.attributes('id')).toBe('save')
  })

  test('disabled uses the native disabled attribute', () => {
    const wrapper = mount(VButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  test('pending sets aria-disabled and aria-busy without native disabled', () => {
    const wrapper = mount(VButton, { props: { pending: true } })
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  test('pending renders a spinner element', () => {
    const wrapper = mount(VButton, { props: { pending: true } })
    expect(wrapper.find('.v-button__spinner').exists()).toBe(true)
  })

  test('does not render a spinner when not pending', () => {
    const wrapper = mount(VButton)
    expect(wrapper.find('.v-button__spinner').exists()).toBe(false)
  })

  test('type prop overrides the default', () => {
    const wrapper = mount(VButton, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  test('click handlers run when idle', async () => {
    const onClick = vi.fn()
    const wrapper = mount(VButton, { attrs: { onClick } })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('pending swallows clicks', async () => {
    const onClick = vi.fn()
    const wrapper = mount(VButton, { props: { pending: true }, attrs: { onClick } })
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  test('consumer aria-disabled swallows clicks', async () => {
    const onClick = vi.fn()
    const wrapper = mount(VButton, { attrs: { onClick, 'aria-disabled': 'true' } })
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  test('pending does not submit a form', async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault())
    const Host = defineComponent({
      render: () =>
        h('form', { onSubmit }, [h(VButton, { type: 'submit', pending: true }, () => 'Go')]),
    })
    const wrapper = mount(Host, { attachTo: document.body })
    await wrapper.find('button').trigger('click')
    expect(onSubmit).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
