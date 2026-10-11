import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VSelect } from '../src/components/select'

const options = [
  { value: 'ro', label: 'Romania' },
  { value: 'de', label: 'Germany' },
]

const groupedOptions = [
  {
    label: 'Europe',
    options: [
      { value: 'ro', label: 'Romania' },
      { value: 'de', label: 'Germany' },
    ],
  },
  { label: 'Asia', options: [{ value: 'jp', label: 'Japan' }] },
]

function mountSelect(props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) {
  return mount(VSelect, { props: { label: 'Country', options, ...props }, attrs })
}

describe('VSelect', () => {
  test('renders a native select labelled by the label', () => {
    const wrapper = mountSelect()
    const select = wrapper.get('select')
    expect(wrapper.get('label').attributes('for')).toBe(select.attributes('id'))
    expect(select.attributes('multiple')).toBeUndefined()
  })

  test('renders an empty option first, then one option per entry', () => {
    const rendered = mountSelect({ placeholder: 'Choose a country' })
      .findAll('option')
      .map((option) => [option.attributes('value'), option.text()])
    expect(rendered).toEqual([
      ['', 'Choose a country'],
      ['ro', 'Romania'],
      ['de', 'Germany'],
    ])
  })

  test('selects the empty option for a null model', () => {
    const select = mountSelect({ modelValue: null }).get('select')
    expect((select.element as HTMLSelectElement).value).toBe('')
  })

  test('reflects the model', () => {
    const select = mountSelect({ modelValue: 'de' }).get('select')
    expect((select.element as HTMLSelectElement).value).toBe('de')
  })

  test('emits the selected value', async () => {
    const wrapper = mountSelect({ modelValue: null })
    await wrapper.get('select').setValue('ro')
    expect(wrapper.emitted('update:modelValue')).toEqual([['ro']])
  })

  test('emits null when the empty option is chosen', async () => {
    const wrapper = mountSelect({ modelValue: 'ro' })
    await wrapper.get('select').setValue('')
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]])
  })

  test('id reaches the select and the label', () => {
    const wrapper = mountSelect({ id: 'country' })
    expect(wrapper.get('select').attributes('id')).toBe('country')
    expect(wrapper.get('label').attributes('for')).toBe('country')
  })

  test('forwards other attributes to the select', () => {
    const wrapper = mountSelect({}, { name: 'country', autocomplete: 'country' })
    expect(wrapper.get('select').attributes('name')).toBe('country')
    expect(wrapper.get('select').attributes('autocomplete')).toBe('country')
    expect(wrapper.element.getAttribute('name')).toBeNull()
  })

  test('wires description and error to the select', () => {
    const wrapper = mountSelect({ description: 'Hint', error: 'Invalid' })
    const select = wrapper.get('select')
    expect(select.attributes('aria-invalid')).toBe('true')
    const describedby = select.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('has no describedby or invalid state by default', () => {
    const select = mountSelect().get('select')
    expect(select.attributes('aria-describedby')).toBeUndefined()
    expect(select.attributes('aria-invalid')).toBeUndefined()
  })

  test('required and disabled use the native attributes', () => {
    const select = mountSelect({ required: true, disabled: true }).get('select')
    expect(select.attributes('required')).toBeDefined()
    expect(select.attributes('disabled')).toBeDefined()
  })

  test('renders optgroups with their nested options', () => {
    const wrapper = mountSelect({ options: groupedOptions, placeholder: 'Choose' })
    const groups = wrapper.findAll('optgroup')
    expect(groups.map((group) => group.attributes('label'))).toEqual(['Europe', 'Asia'])
    expect(groups[0]!.findAll('option').map((option) => option.attributes('value'))).toEqual([
      'ro',
      'de',
    ])
    expect(groups[1]!.findAll('option').map((option) => option.attributes('value'))).toEqual(['jp'])
  })

  test('selects a grouped option by value', async () => {
    const wrapper = mountSelect({ options: groupedOptions, modelValue: null })
    await wrapper.get('select').setValue('jp')
    expect(wrapper.emitted('update:modelValue')).toEqual([['jp']])
  })
})
