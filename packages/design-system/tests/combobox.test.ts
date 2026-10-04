import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VCombobox } from '../src/components/combobox'

const options = [
  { value: 'ro', label: 'Romania' },
  { value: 'de', label: 'Germany' },
]

describe('VCombobox', () => {
  test('labels the input', () => {
    const wrapper = mount(VCombobox, { props: { label: 'Country', options } })
    const input = wrapper.get('input')
    const label = wrapper.get('label')
    expect(label.attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('role')).toBe('combobox')
  })

  test('shows the label of the selected value', () => {
    const wrapper = mount(VCombobox, {
      props: { label: 'Country', options, modelValue: 'de' },
    })
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('Germany')
  })
})
