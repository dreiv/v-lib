import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VNumberField } from '../src/components/number-field'

function spinbutton(wrapper: ReturnType<typeof mount>) {
  return wrapper.get('[role="spinbutton"]')
}

async function setValue(wrapper: ReturnType<typeof mount>, value: string) {
  const input = spinbutton(wrapper)
  await input.setValue(value)
  await input.trigger('blur')
}

describe('VNumberField', () => {
  test('renders a spinbutton labelled by the label', () => {
    const wrapper = mount(VNumberField, { props: { label: 'Quantity' } })
    const input = spinbutton(wrapper)
    expect(wrapper.get('label').attributes('for')).toBe(input.attributes('id'))
  })

  test('supports v-model', async () => {
    const wrapper = mount(VNumberField, { props: { label: 'Quantity', modelValue: 2 } })
    expect(spinbutton(wrapper).attributes('aria-valuenow')).toBe('2')
    await setValue(wrapper, '5')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([5])
  })

  test('clamps to min and max', () => {
    const wrapper = mount(VNumberField, {
      props: { label: 'Quantity', modelValue: 1, min: 1, max: 5 },
    })
    const input = spinbutton(wrapper)
    expect(input.attributes('aria-valuemin')).toBe('1')
    expect(input.attributes('aria-valuemax')).toBe('5')
    const [decrement] = wrapper.findAll('button')
    expect(decrement!.attributes('disabled')).toBeDefined()
  })

  test('names the stepper buttons after the field label by default', () => {
    const wrapper = mount(VNumberField, { props: { label: 'Quantity' } })
    const [decrement, increment] = wrapper.findAll('button')
    expect(decrement!.attributes('aria-label')).toBe('Decrease Quantity')
    expect(increment!.attributes('aria-label')).toBe('Increase Quantity')
  })

  test('accepts explicit stepper button labels', () => {
    const wrapper = mount(VNumberField, {
      props: {
        label: 'Quantity',
        incrementLabel: 'Add one more',
        decrementLabel: 'Remove one',
      },
    })
    const [decrement, increment] = wrapper.findAll('button')
    expect(decrement!.attributes('aria-label')).toBe('Remove one')
    expect(increment!.attributes('aria-label')).toBe('Add one more')
  })

  test('keeps the stepper buttons out of tab order, matching the native spinbutton pattern', () => {
    const wrapper = mount(VNumberField, { props: { label: 'Quantity' } })
    for (const button of wrapper.findAll('button')) {
      expect(button.attributes('tabindex')).toBe('-1')
    }
    expect(spinbutton(wrapper).attributes('tabindex')).toBe('0')
  })

  test('wires description and error to the spinbutton', () => {
    const wrapper = mount(VNumberField, {
      props: { label: 'Quantity', description: 'Hint', error: 'Invalid' },
    })
    const input = spinbutton(wrapper)
    expect(input.attributes('aria-invalid')).toBe('true')
    const describedby = input.attributes('aria-describedby')!.split(' ')
    expect(describedby).toHaveLength(2)
    expect(wrapper.get(`[id="${describedby[0]}"]`).text()).toBe('Hint')
    expect(wrapper.get(`[id="${describedby[1]}"]`).text()).toBe('Invalid')
  })

  test('required and disabled reach the spinbutton and the buttons', () => {
    const wrapper = mount(VNumberField, {
      props: { label: 'Quantity', required: true, disabled: true },
    })
    const input = spinbutton(wrapper)
    expect(input.attributes('aria-required')).toBe('true')
    expect(input.attributes('data-disabled')).toBeDefined()
    for (const button of wrapper.findAll('button')) {
      expect(button.attributes('disabled')).toBeDefined()
    }
  })

  test('id reaches the spinbutton and the label', () => {
    const wrapper = mount(VNumberField, { props: { label: 'Quantity', id: 'qty' } })
    expect(spinbutton(wrapper).attributes('id')).toBe('qty')
    expect(wrapper.get('label').attributes('for')).toBe('qty')
  })
})
