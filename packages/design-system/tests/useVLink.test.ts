import { describe, expect, it, vi } from 'vite-plus/test'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { defineComponent, h, ref } from 'vue'
import { useVLink, type UseVLinkOptions } from '../src/components/link/useVLink'

const Page = defineComponent({ render: () => h('div') })

type Options = Partial<UseVLinkOptions>
type TestRouter = Awaited<ReturnType<typeof setupRouter>>

async function setupRouter(path = '/') {
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

function run(options: Options = {}, router?: TestRouter) {
  let link!: ReturnType<typeof useVLink>
  const Host = defineComponent({
    setup() {
      link = useVLink({
        to: undefined,
        href: undefined,
        replace: undefined,
        target: undefined,
        rel: undefined,
        ...options,
      })
      return () => h('div')
    },
  })
  mount(Host, { global: { plugins: router ? [router] : [] } })
  return link
}

function click(init: MouseEventInit = {}) {
  return new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...init })
}

const hrefWithoutRouter: [Options, string | undefined][] = [
  [{ href: '/x' }, '/x'],
  [{ href: '' }, ''],
  [{ to: '/a' }, '/a'],
  [{ href: '/x', to: '/a' }, '/x'],
  [{ to: { name: 'b' } }, undefined],
  [{}, undefined],
]

const hrefWithRouter: [Options, string | undefined][] = [
  [{ to: '/a' }, '/a'],
  [{ to: '/a', href: '/x' }, '/a'],
  [{ to: { name: 'b', params: { id: '7' } } }, '/b/7'],
  [{ href: '/x' }, '/x'],
  [{}, undefined],
]

const relCases: [string | undefined, string | undefined, string | undefined][] = [
  [undefined, undefined, undefined],
  ['nofollow', undefined, 'nofollow'],
  ['nofollow', '_self', 'nofollow'],
  [undefined, '_blank', 'noopener noreferrer'],
  ['', '_blank', 'noopener noreferrer'],
  ['   ', '_blank', 'noopener noreferrer'],
  ['nofollow', '_blank', 'nofollow noopener'],
  ['  nofollow  ', '_blank', 'nofollow noopener'],
  ['ugc  nofollow', '_blank', 'ugc  nofollow noopener'],
  ['noopener', '_blank', 'noopener'],
  ['noreferrer', '_blank', 'noreferrer'],
  ['nofollow noreferrer', '_blank', 'nofollow noreferrer'],
  ['xnoopener', '_blank', 'xnoopener noopener'],
]

describe('useVLink without a router', () => {
  it.each(hrefWithoutRouter)('resolves %j to href %j', (options, expected) => {
    expect(run(options).href()).toBe(expected)
  })

  it('never reports a current page', () => {
    expect(run({ to: '/' }).current()).toBeUndefined()
  })

  it('navigate does nothing and does not throw', () => {
    const event = click()
    const link = run({ to: '/a' })
    expect(() => link.navigate(event)).not.toThrow()
    expect(event.defaultPrevented).toBe(false)
  })
})

describe('useVLink rel', () => {
  it.each(relCases)('turns rel %j with target %j into %j', (rel, target, expected) => {
    expect(run({ rel, target }).rel()).toBe(expected)
  })
})

describe('useVLink with vue-router', () => {
  describe('href', () => {
    it.each(hrefWithRouter)('resolves %j to href %j', async (options, expected) => {
      const router = await setupRouter()
      expect(run(options, router).href()).toBe(expected)
    })
  })

  describe('current', () => {
    it('reports page only for the exact active route', async () => {
      const router = await setupRouter('/a')
      expect(run({ to: '/a' }, router).current()).toBe('page')
      expect(run({ to: '/' }, router).current()).toBeUndefined()
    })

    it('reports no current page without to', async () => {
      const router = await setupRouter('/')
      expect(run({ href: '/' }, router).current()).toBeUndefined()
    })
  })

  describe('navigate', () => {
    it('navigates on a plain click and prevents the default', async () => {
      const router = await setupRouter('/')
      const event = click()
      run({ to: '/a' }, router).navigate(event)
      await flushPromises()
      expect(event.defaultPrevented).toBe(true)
      expect(router.currentRoute.value.fullPath).toBe('/a')
    })

    it('does not navigate when the default was already prevented', async () => {
      const router = await setupRouter('/')
      const event = click()
      event.preventDefault()
      run({ to: '/a' }, router).navigate(event)
      await flushPromises()
      expect(router.currentRoute.value.fullPath).toBe('/')
    })

    it('does nothing without to', async () => {
      const router = await setupRouter('/')
      const push = vi.spyOn(router, 'push')
      const replace = vi.spyOn(router, 'replace')
      const event = click()
      run({ href: '/a' }, router).navigate(event)
      await flushPromises()
      expect(push).not.toHaveBeenCalled()
      expect(replace).not.toHaveBeenCalled()
      expect(event.defaultPrevented).toBe(false)
    })

    it('uses push by default', async () => {
      const router = await setupRouter('/')
      const push = vi.spyOn(router, 'push')
      const replace = vi.spyOn(router, 'replace')
      run({ to: '/a' }, router).navigate(click())
      await flushPromises()
      expect(push).toHaveBeenCalledTimes(1)
      expect(replace).not.toHaveBeenCalled()
    })

    it('uses replace when asked', async () => {
      const router = await setupRouter('/')
      const push = vi.spyOn(router, 'push')
      const replace = vi.spyOn(router, 'replace')
      run({ to: '/a', replace: true }, router).navigate(click())
      await flushPromises()
      expect(replace).toHaveBeenCalledTimes(1)
      expect(push).not.toHaveBeenCalled()
    })
  })
})

describe('useVLink reactivity', () => {
  it('accepts refs, getters and plain values', () => {
    const href = ref('/r')
    expect(run({ href }).href()).toBe('/r')
    expect(run({ href: () => '/g' }).href()).toBe('/g')
    expect(run({ href: '/p' }).href()).toBe('/p')
  })

  it('follows a changing href, target and rel', () => {
    const href = ref<string | undefined>('/one')
    const target = ref<string | undefined>(undefined)
    const rel = ref<string | undefined>('nofollow')
    const link = run({ href, target, rel })
    expect(link.href()).toBe('/one')
    expect(link.rel()).toBe('nofollow')
    href.value = '/two'
    target.value = '_blank'
    expect(link.href()).toBe('/two')
    expect(link.rel()).toBe('nofollow noopener')
    rel.value = undefined
    expect(link.rel()).toBe('noopener noreferrer')
  })

  it('follows a changing to with a router', async () => {
    const router = await setupRouter('/a')
    const to = ref<string | object | undefined>('/a')
    const link = run({ to }, router)
    expect(link.href()).toBe('/a')
    expect(link.current()).toBe('page')
    to.value = { name: 'b', params: { id: '3' } }
    expect(link.href()).toBe('/b/3')
    expect(link.current()).toBeUndefined()
    to.value = undefined
    expect(link.href()).toBeUndefined()
  })

  it('follows route changes', async () => {
    const router = await setupRouter('/')
    const link = run({ to: '/a' }, router)
    expect(link.current()).toBeUndefined()
    await router.push('/a')
    expect(link.current()).toBe('page')
    await router.push('/')
    expect(link.current()).toBeUndefined()
  })

  it('switches between routed and plain when to is added or removed', async () => {
    const router = await setupRouter('/')
    const to = ref<string | undefined>(undefined)
    const link = run({ to, href: '/x' }, router)
    expect(link.href()).toBe('/x')
    to.value = '/a'
    expect(link.href()).toBe('/a')
    to.value = undefined
    expect(link.href()).toBe('/x')
  })
})
