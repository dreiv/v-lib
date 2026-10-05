import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VAlert } from '../src/components/alert'

describe('VAlert', () => {
  test('renders the title and the body', () => {
    const wrapper = mount(VAlert, {
      props: { title: 'Payment failed' },
      slots: { default: 'Check your card details.' },
    })
    expect(wrapper.get('.v-alert__title').text()).toBe('Payment failed')
    expect(wrapper.get('.v-alert__body').text()).toBe('Check your card details.')
  })

  test('omits the body without content', () => {
    expect(
      mount(VAlert, { props: { title: 'Saved' } })
        .find('.v-alert__body')
        .exists(),
    ).toBe(false)
  })

  test('defaults to info and exposes the tone as a data attribute', () => {
    expect(mount(VAlert, { props: { title: 'x' } }).attributes('data-tone')).toBe('info')
    expect(mount(VAlert, { props: { title: 'x', tone: 'danger' } }).attributes('data-tone')).toBe(
      'danger',
    )
  })

  test('has no live role by default', () => {
    expect(mount(VAlert, { props: { title: 'x' } }).attributes('role')).toBeUndefined()
  })

  test('polite is a status and assertive is an alert', () => {
    expect(mount(VAlert, { props: { title: 'x', live: 'polite' } }).attributes('role')).toBe(
      'status',
    )
    expect(mount(VAlert, { props: { title: 'x', live: 'assertive' } }).attributes('role')).toBe(
      'alert',
    )
  })

  test('forwards attributes to the root', () => {
    const wrapper = mount(VAlert, { props: { title: 'x' }, attrs: { id: 'a', 'data-test': '1' } })
    expect(wrapper.attributes('id')).toBe('a')
    expect(wrapper.attributes('data-test')).toBe('1')
  })
})
