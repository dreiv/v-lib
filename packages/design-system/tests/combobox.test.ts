import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
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

  test('wires description and error to the input', () => {
    const wrapper = mount(VCombobox, {
      props: { label: 'Country', options, description: 'Hint', error: 'Invalid' },
    })
    const input = wrapper.get('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    const describedby = input.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('has no invalid state or describedby without error and description', () => {
    const input = mount(VCombobox, { props: { label: 'Country', options } }).get('input')
    expect(input.attributes('aria-invalid')).toBeUndefined()
    expect(input.attributes('aria-describedby')).toBeUndefined()
  })

  test('required reaches the input', () => {
    const wrapper = mount(VCombobox, { props: { label: 'Country', options, required: true } })
    expect(wrapper.get('input').attributes('required')).toBeDefined()
  })

  test('disabled reaches the input and the anchor', () => {
    const wrapper = mount(VCombobox, { props: { label: 'Country', options, disabled: true } })
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.get('.v-combobox__anchor').attributes('data-disabled')).toBeDefined()
  })

  test('the focus ring is drawn on the anchor, not the input', () => {
    const css = readFileSync(
      resolve(import.meta.dirname, '../src/components/combobox/combobox.css'),
      'utf-8',
    )
    expect(css).toContain('.v-combobox__anchor:has(:focus-visible)')
    expect(css).toContain('.v-combobox__input:focus-visible')
  })

  test('id reaches the input and the label', () => {
    const wrapper = mount(VCombobox, { props: { label: 'Country', options, id: 'country' } })
    expect(wrapper.get('input').attributes('id')).toBe('country')
    expect(wrapper.get('label').attributes('for')).toBe('country')
  })
})
