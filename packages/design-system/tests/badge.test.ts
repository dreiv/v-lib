import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VBadge } from '../src/components/badge'
import { VTag } from '../src/components/tag'

describe('VBadge', () => {
  test('is a span with its text and no role', () => {
    const wrapper = mount(VBadge, { slots: { default: 'Paid' } })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.text()).toBe('Paid')
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  test('defaults to neutral and exposes the tone', () => {
    expect(mount(VBadge).attributes('data-tone')).toBe('neutral')
    expect(mount(VBadge, { props: { tone: 'warning' } }).attributes('data-tone')).toBe('warning')
  })

  test('forwards attributes', () => {
    expect(mount(VBadge, { attrs: { id: 'b' } }).attributes('id')).toBe('b')
  })
})

describe('VTag', () => {
  test('is a span with its text and no role', () => {
    const wrapper = mount(VTag, { slots: { default: 'Vue' } })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.text()).toBe('Vue')
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  test('forwards attributes', () => {
    expect(mount(VTag, { attrs: { id: 't' } }).attributes('id')).toBe('t')
  })
})
