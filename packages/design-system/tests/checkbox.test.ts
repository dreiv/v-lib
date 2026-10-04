import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VCheckbox } from '../src/components/checkbox'

describe('VCheckbox', () => {
  test('renders a native checkbox inside its label', () => {
    const wrapper = mount(VCheckbox, { props: { label: 'Updates' } })
    const input = wrapper.get('input')
    expect(input.attributes('type')).toBe('checkbox')
    expect(wrapper.get('label').element.contains(input.element)).toBe(true)
    expect(wrapper.get('label').text()).toBe('Updates')
  })

  test('supports v-model', async () => {
    const wrapper = mount(VCheckbox, { props: { label: 'Updates', modelValue: false } })
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  test('reflects the model', () => {
    const wrapper = mount(VCheckbox, { props: { label: 'Updates', modelValue: true } })
    expect((wrapper.get('input').element as HTMLInputElement).checked).toBe(true)
  })

  test('forwards other attributes to the input', () => {
    const wrapper = mount(VCheckbox, {
      props: { label: 'Updates' },
      attrs: { name: 'updates', value: 'yes' },
    })
    expect(wrapper.get('input').attributes('name')).toBe('updates')
    expect(wrapper.get('input').attributes('value')).toBe('yes')
    expect(wrapper.element.getAttribute('name')).toBeNull()
  })

  test('wires description and error to the input', () => {
    const wrapper = mount(VCheckbox, {
      props: { label: 'Terms', description: 'Hint', error: 'Invalid' },
    })
    const input = wrapper.get('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    const describedby = input.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('has no describedby or invalid state by default', () => {
    const input = mount(VCheckbox, { props: { label: 'Updates' } }).get('input')
    expect(input.attributes('aria-describedby')).toBeUndefined()
    expect(input.attributes('aria-invalid')).toBeUndefined()
  })

  test('required hides the asterisk from assistive tech', () => {
    const wrapper = mount(VCheckbox, { props: { label: 'Terms', required: true } })
    expect(wrapper.get('input').attributes('required')).toBeDefined()
    expect(wrapper.get('.v-field__required').attributes('aria-hidden')).toBe('true')
  })

  test('disabled uses the native attribute', () => {
    const wrapper = mount(VCheckbox, { props: { label: 'Updates', disabled: true } })
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('data-disabled')).toBeDefined()
  })
})
