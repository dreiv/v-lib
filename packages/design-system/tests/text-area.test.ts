import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VTextArea } from '../src/components/text-area'

describe('VTextArea', () => {
  test('renders a native textarea labelled by the label', () => {
    const wrapper = mount(VTextArea, { props: { label: 'Notes' } })
    const textarea = wrapper.get('textarea')
    expect(wrapper.get('label').attributes('for')).toBe(textarea.attributes('id'))
  })

  test('supports v-model', async () => {
    const wrapper = mount(VTextArea, { props: { label: 'Notes', modelValue: 'Hello' } })
    const textarea = wrapper.get('textarea')
    expect((textarea.element as HTMLTextAreaElement).value).toBe('Hello')
    await textarea.setValue('Hello there')
    expect(wrapper.emitted('update:modelValue')).toEqual([['Hello there']])
  })

  test('applies placeholder and autocomplete', () => {
    const wrapper = mount(VTextArea, {
      props: { label: 'Notes', placeholder: 'Write here', autocomplete: 'off' },
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('placeholder')).toBe('Write here')
    expect(textarea.attributes('autocomplete')).toBe('off')
  })

  test('forwards other attributes to the textarea', () => {
    const wrapper = mount(VTextArea, {
      props: { label: 'Notes' },
      attrs: { name: 'notes', rows: '6', maxlength: '500' },
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('name')).toBe('notes')
    expect(textarea.attributes('rows')).toBe('6')
    expect(textarea.attributes('maxlength')).toBe('500')
    expect(wrapper.element.getAttribute('name')).toBeNull()
  })

  test('wires description and error to the textarea', () => {
    const wrapper = mount(VTextArea, {
      props: { label: 'Notes', description: 'Hint', error: 'Invalid' },
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('aria-invalid')).toBe('true')
    const describedby = textarea.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('required and disabled use the native attributes', () => {
    const wrapper = mount(VTextArea, { props: { label: 'Notes', required: true, disabled: true } })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('required')).toBeDefined()
    expect(textarea.attributes('disabled')).toBeDefined()
  })

  test('id reaches the textarea and the label', () => {
    const wrapper = mount(VTextArea, { props: { label: 'Notes', id: 'notes' } })
    expect(wrapper.get('textarea').attributes('id')).toBe('notes')
    expect(wrapper.get('label').attributes('for')).toBe('notes')
  })
})
