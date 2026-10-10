export const tokenPrefix = '--v-'

export const layers = ['v.reset', 'v.tokens', 'v.base', 'v.components', 'v.utilities'] as const

export const colorScheme = 'light dark'

export type TokenValue = string

export interface TokenGroup {
  [key: string]: TokenValue | TokenGroup
}

const inkSteps = [6, 8, 18, 45, 60] as const

const ink = (step: (typeof inkSteps)[number]) => `var(${tokenPrefix}ref-ink-${step})`

const lightDark = (light: string, dark: string) => `light-dark(${light}, ${dark})`

const tint = (color: string) =>
  `color-mix(in oklab, ${color} var(${tokenPrefix}ref-tone-tint), var(${tokenPrefix}color-surface))`

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
    base: '1.5',
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
    1: '0.25rem',
    2: '0.5rem',
  },
  border: {
    width: '1px',
  },
  control: {
    height: {
      xs: '1.5rem',
      small: '2rem',
      medium: '2.75rem',
      large: '3.25rem',
    },
    indicator: '1.25rem',
  },
  ref: {
    ink: Object.fromEntries(
      inkSteps.map((step) => [step, `color-mix(in oklab, CanvasText ${step}%, Canvas)`]),
    ),
    toneTint: '12%',
  },
  color: {
    surface: 'Canvas',
    surfaceSubtle: ink(6),
    text: 'CanvasText',
    textMuted: ink(60),
    border: ink(45),
    divider: ink(18),
    hover: ink(8),
    accent: 'AccentColor',
    accentText: 'AccentColorText',
    accentInk: 'color-mix(in oklab, AccentColor 60%, CanvasText)',
    danger: lightDark('oklch(50% 0.19 27)', 'oklch(75% 0.14 20)'),
    info: `var(${tokenPrefix}color-accent-ink)`,
    success: lightDark('oklch(50% 0.14 150)', 'oklch(78% 0.15 150)'),
    warning: lightDark('oklch(52% 0.12 70)', 'oklch(82% 0.14 85)'),
    dangerText: lightDark('oklch(100% 0 0)', 'oklch(20% 0.05 25)'),
    infoSurface: tint(`var(${tokenPrefix}color-info)`),
    successSurface: tint(`var(${tokenPrefix}color-success)`),
    warningSurface: tint(`var(${tokenPrefix}color-warning)`),
    dangerSurface: tint(`var(${tokenPrefix}color-danger)`),
    focus: `var(${tokenPrefix}color-accent-ink)`,
    scrim: lightDark('rgb(0 0 0 / 40%)', 'rgb(0 0 0 / 60%)'),
  },
  elevation: {
    color: lightDark('rgb(0 0 0 / 12%)', 'rgb(0 0 0 / 55%)'),
    1: `0 2px 8px var(${tokenPrefix}elevation-color)`,
    2: `0 4px 16px var(${tokenPrefix}elevation-color)`,
  },
  focus: {
    width: '3px',
    offset: '2px',
    ring: `var(${tokenPrefix}focus-width) solid var(${tokenPrefix}color-focus)`,
  },
  duration: {
    fast: '120ms',
    base: '200ms',
    spin: '900ms',
    pulse: '1.6s',
  },
  opacity: {
    hover: '0.06',
    press: '0.08',
    disabled: '0.45',
  },
  scale: {
    press: '0.97',
  },
  container: {
    inline: '72rem',
  },
  easing: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
    base: '0.01ms',
    spin: '0s',
  },
} satisfies TokenGroup
