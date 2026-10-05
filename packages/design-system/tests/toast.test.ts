import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { nextTick } from 'vue'
import { VToastRegion, useToast } from '../src/components/toast'

const props = {
  label: 'Notifications ({hotkey})',
  announcementLabel: 'Notification',
  closeLabel: 'Close',
}

let wrapper: VueWrapper | undefined

async function flush() {
  await nextTick()
  await nextTick()
  await nextTick()
}

function mountRegion(extra: Record<string, unknown> = {}) {
  wrapper = mount(VToastRegion, { props: { ...props, ...extra }, attachTo: document.body })
  return wrapper
}

afterEach(async () => {
  const { dismiss } = useToast()
  for (let id = 1; id < 50; id++) dismiss(id)
  await flush()
  wrapper?.unmount()
  wrapper = undefined
})

describe('VToastRegion', () => {
  test('renders a labelled region with no toasts', () => {
    mountRegion()
    const region = document.body.querySelector('[role="region"]')!
    expect(region.getAttribute('aria-label')).toBe('Notifications (F8)')
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(0)
  })

  test('show renders the title and description', async () => {
    mountRegion()
    useToast().show({ title: 'Saved', description: 'Your changes are stored.' })
    await flush()
    const toast = document.body.querySelector('.v-toast')!
    expect(toast.querySelector('.v-toast__title')?.textContent).toBe('Saved')
    expect(toast.querySelector('.v-toast__description')?.textContent?.trim()).toBe(
      'Your changes are stored.',
    )
  })

  test('announces politely, prefixed by announcementLabel', async () => {
    mountRegion({ announcementLabel: 'Notificare' })
    useToast().show({ title: 'Saved', description: 'Stored.', duration: Infinity })
    await new Promise((resolve) => setTimeout(resolve, 150))
    const polite = document.body.querySelector('[aria-live="polite"]')!
    expect(polite.textContent).toContain('Notificare')
    expect(polite.textContent).toContain('Saved')
    expect(document.body.querySelector('[aria-live="assertive"]')).toBeNull()
  })

  test('omits the description element when none is given', async () => {
    mountRegion()
    useToast().show({ title: 'Saved' })
    await flush()
    expect(document.body.querySelector('.v-toast__description')).toBeNull()
  })

  test('the close button is named by closeLabel and removes the toast', async () => {
    mountRegion({ closeLabel: 'Închide' })
    useToast().show({ title: 'Saved', duration: Infinity })
    await flush()
    const close = document.body.querySelector<HTMLButtonElement>('button[aria-label="Închide"]')!
    close.click()
    await flush()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(0)
  })

  test('Escape on a focused toast dismisses it', async () => {
    mountRegion()
    useToast().show({ title: 'Saved', duration: Infinity })
    await flush()
    const toast = document.body.querySelector<HTMLElement>('.v-toast')!
    toast.focus()
    toast.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(0)
  })

  test('dismiss removes a toast by id', async () => {
    mountRegion()
    const { show, dismiss } = useToast()
    const id = show({ title: 'Saved', duration: Infinity })
    await flush()
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(1)
    dismiss(id)
    await flush()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(0)
  })

  test('a toast closes by itself after its duration', async () => {
    mountRegion()
    useToast().show({ title: 'Saved', duration: 60 })
    await flush()
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(1)
    await new Promise((resolve) => setTimeout(resolve, 200))
    await flush()
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(0)
  })

  test('without a duration a short toast stays open past the old five second default', async () => {
    mountRegion()
    useToast().show({ title: 'Saved' })
    await flush()
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(document.body.querySelectorAll('.v-toast')).toHaveLength(1)
  })

  test('shows several toasts in order', async () => {
    mountRegion()
    const { show } = useToast()
    show({ title: 'First', duration: Infinity })
    show({ title: 'Second', duration: Infinity })
    await flush()
    expect(
      [...document.body.querySelectorAll('.v-toast__title')].map((title) => title.textContent),
    ).toEqual(['First', 'Second'])
  })
})
