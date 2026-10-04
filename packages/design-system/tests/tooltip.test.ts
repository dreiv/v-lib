import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { defineComponent, h, nextTick } from 'vue'
import { VIconButton } from '../src/components/icon-button'
import { VTooltip } from '../src/components/tooltip'

const host = defineComponent({
  setup: () => () =>
    h(VTooltip, { text: 'Close dialog' }, () => h(VIconButton, { 'aria-label': 'Close' })),
})

let wrapper: ReturnType<typeof mount> | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('VTooltip', () => {
  test('renders only the trigger while closed', () => {
    wrapper = mount(host, { attachTo: document.body })
    const button = wrapper.get('button')
    expect(button.attributes('aria-label')).toBe('Close')
    expect(button.attributes('data-state')).toBe('closed')
    expect(document.body.querySelector('.v-tooltip__content')).toBeNull()
  })

  test('opens on keyboard focus and describes the trigger', async () => {
    wrapper = mount(host, { attachTo: document.body })
    wrapper.get('button').element.dispatchEvent(new FocusEvent('focus'))
    await nextTick()
    await nextTick()
    const content = document.body.querySelector('.v-tooltip__content')
    expect(content?.textContent).toContain('Close dialog')
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('Close dialog')
    expect(wrapper.get('button').attributes('aria-describedby')).toBeTruthy()
  })

  test('closes on Escape', async () => {
    wrapper = mount(host, { attachTo: document.body })
    wrapper.get('button').element.dispatchEvent(new FocusEvent('focus'))
    await nextTick()
    await nextTick()
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(document.body.querySelector('.v-tooltip__content')).toBeNull()
  })
})
