import { mount, type VueWrapper } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { afterEach, describe, expect, test } from 'vite-plus/test'
import { VErrorSummary } from '../src/components/error-summary'
import { VCheckbox } from '../src/components/checkbox'
import { VRadioGroup } from '../src/components/radio-group'
import { VTextField } from '../src/components/text-field'

const errors = [
  { id: 'email', message: 'Enter an email address.' },
  { id: 'plan', message: 'Choose a plan.' },
]

const mounted: VueWrapper[] = []

function track<T extends VueWrapper>(wrapper: T) {
  mounted.push(wrapper)
  return wrapper
}

function mountSummary(props: Record<string, unknown> = {}) {
  return track(
    mount(VErrorSummary, {
      props: { heading: 'There is a problem', errors, ...props },
      attachTo: document.body,
    }),
  )
}

function click(element: Element) {
  const event = new MouseEvent('click', { bubbles: true, cancelable: true })
  element.dispatchEvent(event)
  return event
}

afterEach(() => {
  while (mounted.length > 0) mounted.pop()!.unmount()
})

describe('VErrorSummary', () => {
  test('renders nothing without errors', () => {
    expect(mountSummary({ errors: [] }).find('section').exists()).toBe(false)
  })

  test('renders a section named by its heading', () => {
    const wrapper = mountSummary()
    const heading = wrapper.get('h2')
    expect(heading.text()).toBe('There is a problem')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe(heading.attributes('id'))
    expect(heading.attributes('tabindex')).toBe('-1')
  })

  test('renders one link per error pointing at the field id', () => {
    const links = mountSummary().findAll('a')
    expect(links.map((link) => link.text())).toEqual(['Enter an email address.', 'Choose a plan.'])
    expect(links.map((link) => link.attributes('href'))).toEqual(['#email', '#plan'])
  })

  test('following a link focuses the text field with that id', () => {
    track(mount(VTextField, { props: { label: 'Email', id: 'email' }, attachTo: document.body }))
    const link = mountSummary().get('a')
    const event = click(link.element)
    expect(event.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(document.getElementById('email'))
    expect(document.activeElement?.tagName).toBe('INPUT')
  })

  test('following a link focuses the first radio of a radio group', () => {
    track(
      mount(VRadioGroup, {
        props: {
          label: 'Plan',
          id: 'plan',
          options: [
            { value: 'free', label: 'Free' },
            { value: 'team', label: 'Team' },
          ],
        },
        attachTo: document.body,
      }),
    )
    click(mountSummary().findAll('a')[1]!.element)
    expect(document.activeElement).toBe(document.getElementById('plan'))
  })

  test('following a link focuses a checkbox with that id', () => {
    track(mount(VCheckbox, { props: { label: 'Terms', id: 'terms' }, attachTo: document.body }))
    click(
      mountSummary({ errors: [{ id: 'terms', message: 'Accept the terms.' }] }).get('a').element,
    )
    expect(document.activeElement).toBe(document.getElementById('terms'))
  })

  test('leaves the default behavior when the target does not exist', () => {
    const event = click(mountSummary().get('a').element)
    expect(event.defaultPrevented).toBe(false)
  })

  test('focus() moves focus to the heading', async () => {
    const wrapper = mountSummary()
    await (wrapper.vm as unknown as { focus: () => Promise<void> }).focus()
    expect(document.activeElement).toBe(wrapper.get('h2').element)
  })

  test('focus() waits for the summary to appear', async () => {
    const items = ref<typeof errors>([])
    const summary = ref<{ focus: () => Promise<void> } | null>(null)
    const Host = defineComponent({
      render: () =>
        h(VErrorSummary, { ref: summary, heading: 'There is a problem', errors: items.value }),
    })
    const wrapper = track(mount(Host, { attachTo: document.body }))
    items.value = errors
    await summary.value!.focus()
    await nextTick()
    expect(document.activeElement).toBe(wrapper.get('h2').element)
  })

  test('field error ids stay independent of the summary links', () => {
    const field = track(
      mount(VTextField, {
        props: { label: 'Email', id: 'email', error: 'Enter an email address.' },
        attachTo: document.body,
      }),
    )
    const summary = mountSummary()
    expect(field.get('.v-field__error').attributes('id')).toBe('email-error')
    expect(summary.get('a').attributes('href')).toBe('#email')
  })
})
