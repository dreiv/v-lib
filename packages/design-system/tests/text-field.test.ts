import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VTextField } from '../src/components/text-field'

describe('VTextField', () => {
  test('renders a native text input labelled by the label', () => {
    const wrapper = mount(VTextField, { props: { label: 'Name' } })
    const input = wrapper.get('input')
    expect(input.attributes('type')).toBe('text')
    expect(wrapper.get('label').attributes('for')).toBe(input.attributes('id'))
  })

  test('supports v-model', async () => {
    const wrapper = mount(VTextField, { props: { label: 'Name', modelValue: 'Ada' } })
    const input = wrapper.get('input')
    expect((input.element as HTMLInputElement).value).toBe('Ada')
    await input.setValue('Grace')
    expect(wrapper.emitted('update:modelValue')).toEqual([['Grace']])
  })

  test('applies type, placeholder and autocomplete', () => {
    const wrapper = mount(VTextField, {
      props: {
        label: 'Email',
        type: 'email',
        placeholder: 'name@example.com',
        autocomplete: 'email',
      },
    })
    const input = wrapper.get('input')
    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('placeholder')).toBe('name@example.com')
    expect(input.attributes('autocomplete')).toBe('email')
  })

  test('forwards other attributes to the input', () => {
    const wrapper = mount(VTextField, {
      props: { label: 'Email' },
      attrs: { name: 'email', maxlength: '80' },
    })
    expect(wrapper.get('input').attributes('name')).toBe('email')
    expect(wrapper.get('input').attributes('maxlength')).toBe('80')
    expect(wrapper.element.getAttribute('name')).toBeNull()
  })

  test('wires description and error to the input', () => {
    const wrapper = mount(VTextField, {
      props: { label: 'Email', description: 'Hint', error: 'Invalid' },
    })
    const input = wrapper.get('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    const describedby = input.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('required and disabled use the native attributes', () => {
    const wrapper = mount(VTextField, { props: { label: 'Name', required: true, disabled: true } })
    const input = wrapper.get('input')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('disabled')).toBeDefined()
  })
})
