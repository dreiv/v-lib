export const tokenPrefix = '--v-'

export const layers = ['v.reset', 'v.tokens', 'v.base', 'v.components', 'v.utilities'] as const

export const colorScheme = 'light dark'

export type TokenValue = string

export interface TokenGroup {
  [key: string]: TokenValue | TokenGroup
}

const v = (name: string) => `var(${tokenPrefix}${name})`

const lightDark = (light: string, dark: string) => `light-dark(${light}, ${dark})`

const mix = (color: string, amount: string, base: string) =>
  `color-mix(in oklab, ${color} ${amount}, ${base})`

const surface = v('color-surface')

const text = v('color-text')

const neutral = (amount: string) => mix(text, amount, surface)

const tint = (color: string) => mix(color, '12%', surface)

const accentMix = mix(v('color-surface-accent'), '60%', text)

const accentLight = `oklch(from ${accentMix} min(l, 0.48) c h)`

const accentDark = `oklch(from ${accentMix} max(l, 0.66) c h)`

export const tokens = {
  font: {
    sans: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
    weight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.65',
  },
  space: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    16: '4rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
  },
  border: {
    width: '1px',
  },
  control: {
    height: {
      xs: '1.5rem',
      sm: '2rem',
      md: '2.75rem',
      lg: '3.25rem',
    },
    indicatorSize: '1.25rem',
  },
  color: {
    surface: 'Canvas',
    surfaceMuted: neutral('6%'),
    surfaceRaised: lightDark(surface, neutral('8%')),
    surfaceOverlay: lightDark(surface, neutral('10%')),
    surfaceScrim: lightDark('rgb(0 0 0 / 40%)', 'rgb(0 0 0 / 60%)'),
    surfaceAccent: 'AccentColor',
    surfaceInfo: tint(v('color-text-info')),
    surfaceSuccess: tint(v('color-text-success')),
    surfaceWarning: tint(v('color-text-warning')),
    surfaceDanger: tint(v('color-text-danger')),
    text: 'CanvasText',
    textMuted: neutral('60%'),
    textAccent: lightDark(accentLight, accentDark),
    textOnAccent: 'AccentColorText',
    textInfo: lightDark('oklch(50% 0.16 250)', 'oklch(78% 0.16 250)'),
    textSuccess: lightDark('oklch(50% 0.14 150)', 'oklch(78% 0.15 150)'),
    textWarning: lightDark('oklch(52% 0.12 70)', 'oklch(82% 0.14 85)'),
    textDanger: lightDark('oklch(50% 0.19 27)', 'oklch(75% 0.14 20)'),
    border: lightDark(neutral('45%'), neutral('48%')),
    borderMuted: neutral('18%'),
  },
  shadow: {
    color: lightDark('rgb(0 0 0 / 12%)', 'rgb(0 0 0 / 55%)'),
    raised: `0 2px 8px ${v('shadow-color')}`,
    overlay: `0 4px 16px ${v('shadow-color')}`,
  },
  focus: {
    color: v('color-text-accent'),
    width: '3px',
    offset: '2px',
    ring: `${v('focus-width')} solid ${v('focus-color')}`,
  },
  state: {
    hover: '8%',
    disabledOpacity: '0.6',
    pressScale: '0.97',
  },
  duration: {
    fast: '120ms',
    normal: '200ms',
  },
  easing: {
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  container: {
    maxInline: '72rem',
  },
  z: {
    sticky: '100',
    modal: '1000',
    popover: '1100',
    toast: '1200',
    tooltip: '1300',
  },
} satisfies TokenGroup

export const reducedMotion = {
  duration: {
    fast: '0.01ms',
    normal: '0.01ms',
  },
} satisfies TokenGroup
