import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { nextTick } from 'vue'
import { VCombobox } from '../src/components/combobox'

const options = [
  { value: 'ro', label: 'Romania' },
  { value: 'de', label: 'Germany' },
]

const mounted: VueWrapper[] = []

function mountCombobox(props: Record<string, unknown> = {}) {
  const wrapper = mount(VCombobox, {
    props: {
      label: 'Country',
      options,
      triggerLabel: 'Show options',
      emptyText: 'No results',
      ...props,
    },
    attachTo: document.body,
  })
  mounted.push(wrapper)
  return wrapper
}

afterEach(() => {
  while (mounted.length > 0) mounted.pop()!.unmount()
})

describe('VCombobox', () => {
  test('labels the input', () => {
    const wrapper = mountCombobox()
    const input = wrapper.get('input')
    const label = wrapper.get('label')
    expect(label.attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('role')).toBe('combobox')
  })

  test('shows the label of the selected value', () => {
    const wrapper = mountCombobox({ modelValue: 'de' })
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('Germany')
  })

  test('wires description and error to the input', () => {
    const wrapper = mountCombobox({ description: 'Hint', error: 'Invalid' })
    const input = wrapper.get('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    const describedby = input.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('has no invalid state or describedby without error and description', () => {
    const input = mountCombobox().get('input')
    expect(input.attributes('aria-invalid')).toBeUndefined()
    expect(input.attributes('aria-describedby')).toBeUndefined()
  })

  test('required reaches the input', () => {
    expect(mountCombobox({ required: true }).get('input').attributes('required')).toBeDefined()
  })

  test('disabled reaches the input and the anchor', () => {
    const wrapper = mountCombobox({ disabled: true })
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
    const wrapper = mountCombobox({ id: 'country' })
    expect(wrapper.get('input').attributes('id')).toBe('country')
    expect(wrapper.get('label').attributes('for')).toBe('country')
  })

  test('the trigger is named by triggerLabel', () => {
    const trigger = mountCombobox({ triggerLabel: 'Afișează opțiunile' }).get('button')
    expect(trigger.attributes('aria-label')).toBe('Afișează opțiunile')
  })

  test('emptyText is shown when nothing matches', async () => {
    const wrapper = mountCombobox({ options: [], emptyText: 'Niciun rezultat' })
    await wrapper.get('button').trigger('click')
    await nextTick()
    await nextTick()
    expect(document.body.textContent).toContain('Niciun rezultat')
    expect(document.body.textContent).not.toContain('No results')
  })
})
