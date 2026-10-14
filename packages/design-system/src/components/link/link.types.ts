import type { Ref } from 'vue'

export interface VLinkProps {
  to?: string | object
  href?: string
  replace?: boolean
  target?: string
  rel?: string
  ariaLabel?: string
  externalIcon?: boolean
}

export interface RouterLinkState {
  href: Readonly<Ref<string>>
  isExactActive: Readonly<Ref<boolean>>
  navigate: (event?: MouseEvent) => unknown
}

export interface RouterLinkComponent {
  useLink?: (options: {
    to: Readonly<Ref<unknown>>
    replace: Readonly<Ref<boolean>>
  }) => RouterLinkState
}
