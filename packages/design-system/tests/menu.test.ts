import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { defineComponent, h, nextTick } from 'vue'
import { VButton } from '../src/components/button'
import { VMenu, VMenuItem, VMenuSeparator } from '../src/components/menu'

const selected: string[] = []

const Host = defineComponent({
  render: () =>
    h(VMenu, null, {
      trigger: () => h('button', { type: 'button' }, 'Actions'),
      default: () => [
        h(VMenuItem, { onSelect: () => selected.push('rename') }, () => 'Rename'),
        h(VMenuItem, { disabled: true, onSelect: () => selected.push('archive') }, () => 'Archive'),
        h(VMenuSeparator),
        h(VMenuItem, { onSelect: () => selected.push('delete') }, () => 'Delete'),
      ],
    }),
})

let wrapper: VueWrapper | undefined

async function flush() {
  await nextTick()
  await nextTick()
  await nextTick()
}

async function open() {
  wrapper = mount(Host, { attachTo: document.body })
  await wrapper.get('button').trigger('keydown', { key: 'Enter' })
  await flush()
  return wrapper.get('button')
}

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  selected.length = 0
})

describe('VMenu', () => {
  test('renders only the trigger while closed', () => {
    wrapper = mount(Host, { attachTo: document.body })
    const trigger = wrapper.get('button')
    expect(trigger.attributes('aria-haspopup')).toBe('menu')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.body.querySelector('[role="menu"]')).toBeNull()
  })

  test('opens with the keyboard and exposes menu semantics', async () => {
    const trigger = await open()
    const menu = document.body.querySelector('[role="menu"]')!
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(menu.getAttribute('aria-labelledby')).toBe(trigger.attributes('id'))
    expect(
      [...menu.querySelectorAll('[role="menuitem"]')].map((item) => item.textContent?.trim()),
    ).toEqual(['Rename', 'Archive', 'Delete'])
    expect(menu.querySelectorAll('[role="separator"]')).toHaveLength(1)
  })

  test('selecting an item emits select and closes the menu', async () => {
    const trigger = await open()
    const item = document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')[0]!
    item.click()
    await flush()
    expect(selected).toEqual(['rename'])
    expect(document.body.querySelector('[role="menu"]')).toBeNull()
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  test('a disabled item is marked and cannot be selected', async () => {
    await open()
    const item = document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')[1]!
    expect(item.hasAttribute('data-disabled')).toBe(true)
    expect(item.getAttribute('aria-disabled')).toBe('true')
    item.click()
    await flush()
    expect(selected).toEqual([])
  })

  test('Escape closes the menu', async () => {
    await open()
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(document.body.querySelector('[role="menu"]')).toBeNull()
  })

  test('opening with the keyboard focuses the first item and arrows skip disabled items', async () => {
    await open()
    const items = document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')
    expect(document.activeElement).toBe(items[0])
    items[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await flush()
    expect(document.activeElement).toBe(items[2])
  })

  test('a VButton trigger receives the menu attributes', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(VMenu, null, {
            trigger: () => h(VButton, null, () => 'Actions'),
            default: () => h(VMenuItem, null, () => 'Rename'),
          }),
      }),
      { attachTo: document.body },
    )
    const trigger = wrapper.get('button')
    expect(trigger.classes()).toContain('v-button')
    expect(trigger.attributes('aria-haspopup')).toBe('menu')
    await trigger.trigger('keydown', { key: 'Enter' })
    await flush()
    expect(trigger.attributes('aria-expanded')).toBe('true')
  })
})
