import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { defineComponent, h, nextTick, ref } from 'vue'
import { VPopover } from '../src/components/popover'

const open = ref(false)

const Host = defineComponent({
  render: () =>
    h(
      VPopover,
      {
        label: 'Filters',
        open: open.value,
        'onUpdate:open': (value: boolean) => (open.value = value),
      },
      {
        trigger: () => h('button', { type: 'button' }, 'Filters'),
        default: () => h('button', { type: 'button', id: 'inside' }, 'Apply'),
      },
    ),
})

let wrapper: VueWrapper | undefined

async function flush() {
  await nextTick()
  await nextTick()
  await nextTick()
}

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  open.value = false
})

describe('VPopover', () => {
  test('renders only the trigger while closed', () => {
    wrapper = mount(Host, { attachTo: document.body })
    const trigger = wrapper.get('button')
    expect(trigger.attributes('aria-haspopup')).toBe('dialog')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  test('opens on click, named by label, and moves focus inside', async () => {
    wrapper = mount(Host, { attachTo: document.body })
    const trigger = wrapper.get('button')
    await trigger.trigger('click')
    await flush()
    const content = document.body.querySelector('[role="dialog"]')!
    expect(open.value).toBe(true)
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(trigger.attributes('aria-controls')).toBe(content.id)
    expect(content.getAttribute('aria-label')).toBe('Filters')
    expect(content.textContent).toContain('Apply')
    expect(content.contains(document.activeElement)).toBe(true)
  })

  test('Escape closes it and returns focus to the trigger', async () => {
    wrapper = mount(Host, { attachTo: document.body })
    const trigger = wrapper.get('button')
    trigger.element.focus()
    await trigger.trigger('click')
    await flush()
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(open.value).toBe(false)
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    expect(document.activeElement).toBe(trigger.element)
  })

  test('can be opened from the outside', async () => {
    wrapper = mount(Host, { attachTo: document.body })
    open.value = true
    await flush()
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
  })
})
