import { resolveDynamicComponent, toRef, toValue, type MaybeRefOrGetter } from 'vue'
import type { RouterLinkComponent } from './link.types'

export interface UseVLinkOptions {
  to: MaybeRefOrGetter<string | object | undefined>
  href: MaybeRefOrGetter<string | undefined>
  replace: MaybeRefOrGetter<boolean | undefined>
  target: MaybeRefOrGetter<string | undefined>
  rel: MaybeRefOrGetter<string | undefined>
}

export function useVLink(options: UseVLinkOptions) {
  const routerLink = resolveDynamicComponent('RouterLink') as unknown as
    | RouterLinkComponent
    | string
  const router =
    typeof routerLink === 'object' && typeof routerLink.useLink === 'function'
      ? routerLink.useLink({
          to: toRef(() => toValue(options.to) ?? ''),
          replace: toRef(() => toValue(options.replace) ?? false),
        })
      : undefined

  const isRouted = () => router !== undefined && toValue(options.to) != null

  function href() {
    if (router && isRouted()) return router.href.value
    const explicit = toValue(options.href)
    if (explicit !== undefined) return explicit
    const to = toValue(options.to)
    return typeof to === 'string' ? to : undefined
  }

  function current() {
    return router && isRouted() && router.isExactActive.value ? 'page' : undefined
  }

  function rel() {
    const value = toValue(options.rel)
    if (toValue(options.target) !== '_blank') return value
    const trimmed = value?.trim()
    if (!trimmed) return 'noopener noreferrer'
    return /\bno(opener|referrer)\b/.test(trimmed) ? trimmed : `${trimmed} noopener`
  }

  function navigate(event: MouseEvent) {
    if (router && isRouted()) router.navigate(event)
  }

  return { href, current, rel, navigate }
}
