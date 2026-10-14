import { describe, expect, it, vi } from 'vite-plus/test'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import VLink from '../src/components/link/VLink.vue'
import type { VLinkProps } from '../src/components/link/link.types'
import { V_STRINGS, defaultStrings } from '../src/strings'

const Page = defineComponent({ render: () => h('div') })
const EXTERNAL = 'https://example.com'

type TestRouter = Awaited<ReturnType<typeof setup>>

async function setup(path = '/') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Page },
      { path: '/a', component: Page },
      { path: '/b/:id', name: 'b', component: Page },
    ],
  })
  await router.push(path)
  await router.isReady()
  return router
}

function mountLink(
  props: Partial<VLinkProps>,
  router?: TestRouter,
  extra: Record<string, unknown> = {},
) {
  return mount(VLink, {
    props,
    slots: { default: 'label' },
    global: { plugins: router ? [router] : [] },
    ...extra,
  })
}

function click(wrapper: ReturnType<typeof mountLink>, init: MouseEventInit = {}) {
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...init })
  wrapper.element.dispatchEvent(event)
  return event
}

describe('VLink without a router', () => {
  it.each([
    [{ href: '/x' }, '/x'],
    [{ to: '/a' }, '/a'],
  ])('renders %j as href %j on an anchor', (props, expected) => {
    const wrapper = mountLink(props)
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe(expected)
  })

  it('renders no href when to is an object', () => {
    expect(mountLink({ to: { name: 'b' } }).attributes('href')).toBeUndefined()
  })

  it('does not prevent default navigation', () => {
    expect(click(mountLink({ to: '/a' })).defaultPrevented).toBe(false)
  })

  it('emits click', () => {
    const wrapper = mountLink({ href: '/x' })
    click(wrapper)
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})

describe('VLink with vue-router', () => {
  it.each([
    [{ to: '/a' }, '/a'],
    [{ to: { name: 'b', params: { id: '7' } } }, '/b/7'],
  ])('renders %j as href %j', async (props, expected) => {
    const router = await setup()
    expect(mountLink(props, router).attributes('href')).toBe(expected)
  })

  it('follows a changing to', async () => {
    const router = await setup()
    const wrapper = mountLink({ to: '/a' }, router)
    await wrapper.setProps({ to: '/b/2' } as any)
    expect(wrapper.attributes('href')).toBe('/b/2')
  })

  it('navigates on plain left click and prevents the browser default', async () => {
    const router = await setup()
    const wrapper = mountLink({ to: '/a' }, router)
    const event = click(wrapper)
    await flushPromises()
    expect(event.defaultPrevented).toBe(true)
    expect(router.currentRoute.value.fullPath).toBe('/a')
  })

  it.each([
    ['ctrl', { ctrlKey: true }],
    ['meta', { metaKey: true }],
    ['shift', { shiftKey: true }],
    ['alt', { altKey: true }],
    ['middle button', { button: 1 }],
    ['right button', { button: 2 }],
  ])('leaves %s clicks to the browser', async (_name, init) => {
    const router = await setup()
    const wrapper = mountLink({ to: '/a' }, router)
    const event = click(wrapper, init)
    await flushPromises()
    expect(event.defaultPrevented).toBe(false)
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('lets a click listener veto navigation with preventDefault', async () => {
    const router = await setup()
    const wrapper = mountLink({ to: '/a' }, router, {
      attrs: { onClick: (event: MouseEvent) => event.preventDefault() },
    })
    click(wrapper)
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('does not navigate when target is _blank', async () => {
    const router = await setup()
    const wrapper = mountLink({ to: '/a', target: '_blank' }, router)
    const event = click(wrapper)
    await flushPromises()
    expect(event.defaultPrevented).toBe(false)
    expect(router.currentRoute.value.fullPath).toBe('/')
  })

  it('passes the replace prop on to the router', async () => {
    const router = await setup()
    const push = vi.spyOn(router, 'push')
    const replace = vi.spyOn(router, 'replace')
    click(mountLink({ to: '/a', replace: true }, router))
    await flushPromises()
    expect(replace).toHaveBeenCalledTimes(1)
    expect(push).not.toHaveBeenCalled()
  })

  it('sets aria-current only while exactly active and follows navigation', async () => {
    const router = await setup('/a')
    const wrapper = mountLink({ to: '/a' }, router)
    expect(wrapper.attributes('aria-current')).toBe('page')
    await router.push('/')
    await flushPromises()
    expect(wrapper.attributes('aria-current')).toBeUndefined()
  })

  it('lets an explicit aria-current win', async () => {
    const router = await setup('/a')
    const wrapper = mountLink({ to: '/a' }, router, { attrs: { 'aria-current': 'step' } })
    expect(wrapper.attributes('aria-current')).toBe('step')
  })

  it('keeps plain href links working inside a routed app', async () => {
    const router = await setup()
    const wrapper = mountLink({ href: EXTERNAL }, router)
    const event = click(wrapper)
    await flushPromises()
    expect(wrapper.attributes('href')).toBe(EXTERNAL)
    expect(event.defaultPrevented).toBe(false)
    expect(router.currentRoute.value.fullPath).toBe('/')
  })
})

describe('VLink external behaviour', () => {
  it('adds icon, hidden text and rel for target _blank', () => {
    const wrapper = mountLink({ href: EXTERNAL, target: '_blank' })
    expect(wrapper.find('.v-link__icon').exists()).toBe(true)
    expect(wrapper.find('.v-visually-hidden').text()).toBe(defaultStrings.link.opensInNewWindow)
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('separates the hidden text from the label', () => {
    const wrapper = mountLink({ href: EXTERNAL, target: '_blank' })
    expect(wrapper.element.textContent).toBe(`label ${defaultStrings.link.opensInNewWindow}`)
  })

  it('merges a custom rel for new-window links', () => {
    const wrapper = mountLink({ href: EXTERNAL, target: '_blank', rel: 'nofollow' })
    expect(wrapper.attributes('rel')).toBe('nofollow noopener')
  })

  it('shows nothing external for same-window links', () => {
    const wrapper = mountLink({ href: '/x' })
    expect(wrapper.find('.v-link__icon').exists()).toBe(false)
    expect(wrapper.find('.v-visually-hidden').exists()).toBe(false)
    expect(wrapper.attributes('rel')).toBeUndefined()
  })

  it('passes rel through untouched for same-window links', () => {
    expect(mountLink({ href: '/x', rel: 'nofollow' }).attributes('rel')).toBe('nofollow')
  })

  it('can hide the icon and keeps the hidden text', () => {
    const wrapper = mountLink({ href: EXTERNAL, target: '_blank', externalIcon: false })
    expect(wrapper.find('.v-link__icon').exists()).toBe(false)
    expect(wrapper.find('.v-visually-hidden').exists()).toBe(true)
  })

  it('lets aria-label own the name', () => {
    const wrapper = mountLink({ href: EXTERNAL, target: '_blank', ariaLabel: 'Report' })
    expect(wrapper.attributes('aria-label')).toBe('Report')
    expect(wrapper.find('.v-visually-hidden').exists()).toBe(false)
  })

  it('uses injected translations', () => {
    const wrapper = mountLink({ href: EXTERNAL, target: '_blank' }, undefined, {
      global: {
        provide: {
          [V_STRINGS as symbol]: {
            ...defaultStrings,
            link: { opensInNewWindow: '(se deschide într-o fereastră nouă)' },
          },
        },
      },
    })
    expect(wrapper.find('.v-visually-hidden').text()).toBe('(se deschide într-o fereastră nouă)')
  })
})

describe('VLink on the server', () => {
  it('renders the resolved href and aria-current without a browser', async () => {
    const router = await setup('/a')
    const app = createSSRApp({
      render: () => h(VLink, { to: '/a', target: '_blank' }, () => 'label'),
    })
    app.use(router)
    const html = await renderToString(app)
    expect(html).toContain('href="/a"')
    expect(html).toContain('aria-current="page"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('renders without a router installed', async () => {
    const app = createSSRApp({ render: () => h(VLink, { to: '/a' }, () => 'label') })
    expect(await renderToString(app)).toContain('href="/a"')
  })
})
