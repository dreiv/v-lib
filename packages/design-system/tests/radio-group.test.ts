import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { describe, expect, test } from 'vite-plus/test'
import { VRadioGroup } from '../src/components/radio-group'

const options = [
  { value: 'free', label: 'Free' },
  { value: 'team', label: 'Team' },
]

function mountGroup(props: Record<string, unknown> = {}) {
  return mount(VRadioGroup, { props: { label: 'Plan', options, ...props } })
}

describe('VRadioGroup', () => {
  test('renders a fieldset named by its legend', () => {
    const wrapper = mountGroup()
    expect(wrapper.element.tagName).toBe('FIELDSET')
    expect(wrapper.attributes('role')).toBe('radiogroup')
    expect(wrapper.get('legend').text()).toBe('Plan')
  })

  test('renders one native radio per option sharing a name', () => {
    const inputs = mountGroup().findAll('input')
    expect(inputs).toHaveLength(2)
    expect(inputs.every((input) => input.attributes('type') === 'radio')).toBe(true)
    expect(new Set(inputs.map((input) => input.attributes('name'))).size).toBe(1)
    expect(inputs[0]!.attributes('name')).toBeTruthy()
  })

  test('uses the name prop when given', () => {
    const inputs = mountGroup({ name: 'plan' }).findAll('input')
    expect(inputs.every((input) => input.attributes('name') === 'plan')).toBe(true)
  })

  test('labels each radio with its option label', () => {
    const labels = mountGroup().findAll('label')
    expect(labels.map((label) => label.text())).toEqual(['Free', 'Team'])
  })

  test('reflects the model', () => {
    const inputs = mountGroup({ modelValue: 'team' }).findAll('input')
    expect(inputs.map((input) => (input.element as HTMLInputElement).checked)).toEqual([
      false,
      true,
    ])
  })

  test('has nothing selected for a null model', () => {
    const inputs = mountGroup({ modelValue: null }).findAll('input')
    expect(inputs.some((input) => (input.element as HTMLInputElement).checked)).toBe(false)
  })

  test('emits the selected value', async () => {
    const wrapper = mountGroup()
    await wrapper.findAll('input')[1]!.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([['team']])
  })

  test('wires description and error to the group', () => {
    const wrapper = mountGroup({ description: 'Hint', error: 'Invalid' })
    expect(wrapper.attributes('aria-invalid')).toBe('true')
    const describedby = wrapper.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('has no describedby or invalid state by default', () => {
    const wrapper = mountGroup()
    expect(wrapper.attributes('aria-describedby')).toBeUndefined()
    expect(wrapper.attributes('aria-invalid')).toBeUndefined()
  })

  test('required marks every radio and hides the asterisk from assistive tech', () => {
    const wrapper = mountGroup({ required: true })
    expect(
      wrapper.findAll('input').every((input) => input.attributes('required') !== undefined),
    ).toBe(true)
    expect(wrapper.get('.v-field__required').attributes('aria-hidden')).toBe('true')
  })

  test('disabled uses the native fieldset attribute', () => {
    const wrapper = mountGroup({ disabled: true })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('data-disabled')).toBeDefined()
  })

  test('gives every group in an app its own name', () => {
    const Pair = defineComponent({
      render: () => [
        h(VRadioGroup, { label: 'A', options }),
        h(VRadioGroup, { label: 'B', options }),
      ],
    })
    const [first, second] = mount(Pair)
      .findAll('fieldset')
      .map((group) => group.get('input').attributes('name'))
    expect(first).not.toBe(second)
  })
})
