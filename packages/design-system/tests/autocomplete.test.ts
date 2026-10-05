import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { nextTick } from 'vue'
import { VAutocomplete } from '../src/components/autocomplete'

const suggestions = ['Timișoara', 'Târgu Mureș', 'Brașov']

const mounted: VueWrapper[] = []

function mountAutocomplete(
  props: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) {
  const wrapper = mount(VAutocomplete, {
    props: { label: 'City', suggestions, ...props },
    attrs,
    attachTo: document.body,
  })
  mounted.push(wrapper)
  return wrapper
}

async function flush() {
  await nextTick()
  await nextTick()
  await nextTick()
}

afterEach(() => {
  while (mounted.length > 0) mounted.pop()!.unmount()
})

describe('VAutocomplete', () => {
  test('labels a combobox input', () => {
    const wrapper = mountAutocomplete()
    const input = wrapper.get('input')
    expect(wrapper.get('label').attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-autocomplete')).toBe('list')
    expect(input.attributes('aria-expanded')).toBe('false')
  })

  test('has no trigger button', () => {
    expect(mountAutocomplete().find('button').exists()).toBe(false)
  })

  test('reflects the model as text', () => {
    const wrapper = mountAutocomplete({ modelValue: 'Brașov' })
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('Brașov')
  })

  test('typing updates the model with the free text', async () => {
    const wrapper = mountAutocomplete()
    await wrapper.get('input').setValue('Cluj')
    await flush()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Cluj'])
  })

  test('typing opens the list and filters the suggestions', async () => {
    const wrapper = mountAutocomplete()
    await wrapper.get('input').setValue('ti')
    await flush()
    const options = [...document.body.querySelectorAll('[role="option"]')].map((option) =>
      option.textContent?.trim(),
    )
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
    expect(options).toEqual(['Timișoara'])
  })

  test('with no match the list is hidden and no empty message is rendered', async () => {
    const wrapper = mountAutocomplete()
    await wrapper.get('input').setValue('zzz')
    await flush()
    const content = document.body.querySelector<HTMLElement>('.v-combobox__content')
    expect(document.body.querySelector('[role="option"]')).toBeNull()
    expect(content === null || content.style.display === 'none').toBe(true)
    expect(wrapper.get('input').attributes('aria-expanded')).toBe(content ? 'true' : 'false')
  })

  test('choosing a suggestion sets the model and closes the list', async () => {
    const wrapper = mountAutocomplete()
    await wrapper.get('input').setValue('ti')
    await flush()
    document.body.querySelector<HTMLElement>('[role="option"]')!.click()
    await flush()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Timișoara'])
    expect(document.body.querySelector('[role="option"]')).toBeNull()
  })

  test('forwards other attributes to the input', () => {
    const wrapper = mountAutocomplete({}, { name: 'city', autocomplete: 'address-level2' })
    const input = wrapper.get('input')
    expect(input.attributes('name')).toBe('city')
    expect(input.attributes('autocomplete')).toBe('address-level2')
    expect(wrapper.element.getAttribute('name')).toBeNull()
  })

  test('turns browser autocomplete off by default', () => {
    expect(mountAutocomplete().get('input').attributes('autocomplete')).toBe('off')
  })

  test('wires description and error to the input', () => {
    const wrapper = mountAutocomplete({ description: 'Hint', error: 'Invalid' })
    const input = wrapper.get('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    const describedby = input.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('required and disabled reach the input', () => {
    const input = mountAutocomplete({ required: true, disabled: true }).get('input')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('disabled')).toBeDefined()
  })

  test('id reaches the input and the label', () => {
    const wrapper = mountAutocomplete({ id: 'city' })
    expect(wrapper.get('input').attributes('id')).toBe('city')
    expect(wrapper.get('label').attributes('for')).toBe('city')
  })
})
