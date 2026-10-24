import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VSpinner } from '../src/components/spinner'

const here = dirname(fileURLToPath(import.meta.url))
const css = readFileSync(resolve(here, '../src/components/spinner/spinner.css'), 'utf8')

describe('VSpinner', () => {
  test('is a status named by its label with a hidden decorative svg', () => {
    const wrapper = mount(VSpinner, { props: { label: 'Loading orders' } })
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.text()).toBe('Loading orders')
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
    expect(wrapper.get('svg').attributes('focusable')).toBe('false')
  })

  test('forwards attributes', () => {
    expect(mount(VSpinner, { props: { label: 'x' }, attrs: { id: 's' } }).attributes('id')).toBe(
      's',
    )
  })

  test('without a label it is presentational: no role, no hidden text', () => {
    const wrapper = mount(VSpinner)
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.find('.v-visually-hidden').exists()).toBe(false)
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
  })

  test('defaults to the medium size', () => {
    expect(mount(VSpinner).attributes('data-size')).toBe('medium')
  })

  test.each(['small', 'medium', 'large'] as const)(
    'exposes size=%s as a data attribute',
    (size) => {
      expect(mount(VSpinner, { props: { size } }).attributes('data-size')).toBe(size)
    },
  )

  test('size does not change the accessible name or role', () => {
    const wrapper = mount(VSpinner, { props: { label: 'Loading orders', size: 'large' } })
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.text()).toBe('Loading orders')
  })

  test('the ring is normalised with pathLength so the dash scales with size', () => {
    const circle = mount(VSpinner).get('circle').element
    expect(circle.getAttribute('pathLength')).toBe('100')
  })

  test('reduced motion replaces the rotation with a static ring that pulses', () => {
    const block = css.slice(css.indexOf('prefers-reduced-motion'))
    expect(block).toContain('v-pulse')
    expect(block).toContain('stroke-dasharray: none')
    expect(block).not.toMatch(/animation:\s*v-spin\b/)
  })

  test('a bare mark outside .v-spinner still has a size fallback', () => {
    expect(css).toMatch(/inline-size:\s*var\(--_size,\s*var\(--v-control-indicator-size\)\)/)
  })

  test('the pulse never drops below 0.5 opacity (keeps the mark visible)', () => {
    const pulse = /@keyframes v-pulse\s*\{[^}]*opacity:\s*([\d.]+)/.exec(css)
    expect(Number(pulse?.[1])).toBeGreaterThanOrEqual(0.5)
  })
})
