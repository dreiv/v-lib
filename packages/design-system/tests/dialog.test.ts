import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vite-plus/test'
import { defineComponent, h, nextTick, ref } from 'vue'
import { VDialog } from '../src/components/dialog'

const open = ref(false)

function hostWith(props: Record<string, unknown> = {}, slots: Record<string, () => unknown> = {}) {
  return defineComponent({
    render: () =>
      h('div', [
        h('button', { type: 'button', id: 'opener' }, 'Open'),
        h(
          VDialog,
          {
            title: 'Delete project',
            closeLabel: 'Close',
            open: open.value,
            'onUpdate:open': (value: boolean) => (open.value = value),
            ...props,
          },
          { default: () => h('p', 'This cannot be undone.'), ...slots },
        ),
      ]),
  })
}

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
  vi.restoreAllMocks()
})

describe('VDialog', () => {
  test('renders nothing while closed', () => {
    wrapper = mount(hostWith(), { attachTo: document.body })
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  test('is a dialog named by its title and described by its description', async () => {
    wrapper = mount(hostWith({ description: 'All files are removed.' }), {
      attachTo: document.body,
    })
    open.value = true
    await flush()
    const dialog = document.body.querySelector('[role="dialog"]')!
    const title = document.getElementById(dialog.getAttribute('aria-labelledby')!)!
    const description = document.getElementById(dialog.getAttribute('aria-describedby')!)!
    expect(title.textContent?.trim()).toBe('Delete project')
    expect(title.tagName).toBe('H2')
    expect(description.textContent?.trim()).toBe('All files are removed.')
    expect(dialog.textContent).toContain('This cannot be undone.')
  })

  test('without a description it has no aria-describedby and no warning', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    wrapper = mount(hostWith(), { attachTo: document.body })
    open.value = true
    await flush()
    expect(document.body.querySelector('[role="dialog"]')!.hasAttribute('aria-describedby')).toBe(
      false,
    )
    expect(warn).not.toHaveBeenCalled()
  })

  test('the close button is named by closeLabel and closes the dialog', async () => {
    wrapper = mount(hostWith({ closeLabel: 'Închide' }), { attachTo: document.body })
    open.value = true
    await flush()
    const close = document.body.querySelector<HTMLButtonElement>('button[aria-label="Închide"]')!
    expect(close).not.toBeNull()
    close.click()
    await flush()
    expect(open.value).toBe(false)
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  test('renders the footer slot only when it is given', async () => {
    wrapper = mount(hostWith(), { attachTo: document.body })
    open.value = true
    await flush()
    expect(document.body.querySelector('.v-dialog__footer')).toBeNull()
    wrapper.unmount()
    open.value = false
    wrapper = mount(hostWith({}, { footer: () => h('button', { type: 'button' }, 'Delete') }), {
      attachTo: document.body,
    })
    open.value = true
    await flush()
    expect(document.body.querySelector('.v-dialog__footer')?.textContent).toContain('Delete')
  })

  test('Escape closes the dialog and focus returns to the element that opened it', async () => {
    wrapper = mount(hostWith(), { attachTo: document.body })
    const opener = document.getElementById('opener')!
    opener.focus()
    open.value = true
    await flush()
    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')!
    expect(dialog.contains(document.activeElement)).toBe(true)
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(open.value).toBe(false)
    expect(document.activeElement).toBe(opener)
  })
})

describe('VDialog opened from a menu', () => {
  test('focus returns to the menu trigger when the menu item that opened it is gone', async () => {
    const trigger = document.createElement('button')
    trigger.id = 'menu-trigger'
    document.body.append(trigger)
    const menu = document.createElement('div')
    menu.setAttribute('role', 'menu')
    menu.setAttribute('aria-labelledby', 'menu-trigger')
    const item = document.createElement('button')
    menu.append(item)
    document.body.append(menu)

    wrapper = mount(hostWith(), { attachTo: document.body })
    item.focus()
    open.value = true
    await flush()
    menu.remove()
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(open.value).toBe(false)
    expect(document.activeElement).toBe(trigger)
    trigger.remove()
  })
})
