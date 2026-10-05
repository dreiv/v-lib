import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VContainer } from '../src/components/container'
import { VInline } from '../src/components/inline'
import { VStack } from '../src/components/stack'

describe.each([
  ['VStack', VStack, 'v-stack', '4'],
  ['VInline', VInline, 'v-inline', '3'],
] as const)('%s', (_name, component, className, defaultGap) => {
  test('is a div with the slot and the default gap', () => {
    const wrapper = mount(component, { slots: { default: '<span>a</span><span>b</span>' } })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain(className)
    expect(wrapper.attributes('data-gap')).toBe(defaultGap)
    expect(wrapper.findAll('span')).toHaveLength(2)
  })

  test('takes a space token step as the gap', () => {
    expect(mount(component, { props: { gap: 8 } }).attributes('data-gap')).toBe('8')
    expect(mount(component, { props: { gap: 16 } }).attributes('data-gap')).toBe('16')
  })

  test('renders the element named by as', () => {
    expect(mount(component, { props: { as: 'section' } }).element.tagName).toBe('SECTION')
    expect(mount(component, { props: { as: 'nav' } }).element.tagName).toBe('NAV')
  })

  test('forwards attributes including aria-label', () => {
    const wrapper = mount(component, { props: { as: 'nav' }, attrs: { 'aria-label': 'Main' } })
    expect(wrapper.attributes('aria-label')).toBe('Main')
  })
})

describe('VContainer', () => {
  test('is a div with the slot', () => {
    const wrapper = mount(VContainer, { slots: { default: 'content' } })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('v-container')
    expect(wrapper.text()).toBe('content')
  })

  test('renders the element named by as', () => {
    expect(mount(VContainer, { props: { as: 'main' } }).element.tagName).toBe('MAIN')
  })
})
