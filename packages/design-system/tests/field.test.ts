import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { describe, expect, test } from 'vite-plus/test'
import { VField, useFieldContext } from '../src/components/field'

const Control = defineComponent({
  setup() {
    const { id, describedby, invalid, required, disabled } = useFieldContext()
    return () =>
      h('input', {
        id: id.value,
        'aria-describedby': describedby.value,
        'aria-invalid': invalid.value || undefined,
        required: required.value,
        disabled: disabled.value,
      })
  },
})

function mountField(props: Record<string, unknown> = {}) {
  return mount(VField, {
    props: { label: 'Email', ...props },
    slots: { default: () => h(Control) },
  })
}

describe('VField', () => {
  test('associates the label with the control', () => {
    const wrapper = mountField()
    expect(wrapper.get('label').attributes('for')).toBe(wrapper.get('input').attributes('id'))
  })

  test('has no describedby or invalid state by default', () => {
    const input = mountField().get('input')
    expect(input.attributes('aria-describedby')).toBeUndefined()
    expect(input.attributes('aria-invalid')).toBeUndefined()
  })

  test('describes the control with the description', () => {
    const wrapper = mountField({ description: 'Used for receipts' })
    const description = wrapper.get('.v-field__description')
    expect(wrapper.get('input').attributes('aria-describedby')).toBe(description.attributes('id'))
    expect(description.text()).toBe('Used for receipts')
  })

  test('describes the control with the error and marks it invalid', () => {
    const wrapper = mountField({ error: 'Required' })
    const error = wrapper.get('.v-field__error')
    const input = wrapper.get('input')
    expect(input.attributes('aria-describedby')).toBe(error.attributes('id'))
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.attributes('data-invalid')).toBeDefined()
  })

  test('lists the description before the error', () => {
    const wrapper = mountField({ description: 'Hint', error: 'Wrong' })
    const ids = [
      wrapper.get('.v-field__description').attributes('id'),
      wrapper.get('.v-field__error').attributes('id'),
    ]
    expect(wrapper.get('input').attributes('aria-describedby')).toBe(ids.join(' '))
  })

  test('ignores an empty error', () => {
    const wrapper = mountField({ error: '' })
    expect(wrapper.find('.v-field__error').exists()).toBe(false)
    expect(wrapper.get('input').attributes('aria-invalid')).toBeUndefined()
  })

  test('required marks the control and hides the asterisk from assistive tech', () => {
    const wrapper = mountField({ required: true })
    expect(wrapper.get('input').attributes('required')).toBeDefined()
    expect(wrapper.get('.v-field__required').attributes('aria-hidden')).toBe('true')
  })

  test('disabled reaches the control', () => {
    const wrapper = mountField({ disabled: true })
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('data-disabled')).toBeDefined()
  })

  test('gives every field in an app its own ids', () => {
    const Pair = defineComponent({
      render: () => [
        h(VField, { label: 'A' }, () => h(Control)),
        h(VField, { label: 'B' }, () => h(Control)),
      ],
    })
    const [first, second] = mount(Pair)
      .findAll('input')
      .map((input) => input.attributes('id'))
    expect(first).not.toBe(second)
  })

  test('the context throws outside VField', () => {
    expect(() => mount(Control)).toThrow('useFieldContext must be used inside VField')
  })

  test('uses an explicit id for the control and derives the message ids from it', () => {
    const wrapper = mountField({ id: 'email', description: 'Hint', error: 'Wrong' })
    expect(wrapper.get('input').attributes('id')).toBe('email')
    expect(wrapper.get('label').attributes('for')).toBe('email')
    expect(wrapper.get('.v-field__description').attributes('id')).toBe('email-description')
    expect(wrapper.get('.v-field__error').attributes('id')).toBe('email-error')
    expect(wrapper.get('input').attributes('aria-describedby')).toBe(
      'email-description email-error',
    )
  })

  test('follows a changing id', async () => {
    const id = ref('first')
    const Host = defineComponent({
      render: () => h(VField, { label: 'Email', error: 'Wrong', id: id.value }, () => h(Control)),
    })
    const wrapper = mount(Host)
    id.value = 'second'
    await nextTick()
    expect(wrapper.get('input').attributes('id')).toBe('second')
    expect(wrapper.get('.v-field__error').attributes('id')).toBe('second-error')
  })
})
