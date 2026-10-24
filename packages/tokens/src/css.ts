import {
  colorScheme,
  layers,
  reducedMotion,
  tokenPrefix,
  tokens,
  type TokenGroup,
  type TokenValue,
} from './tokens.ts'

export interface Token {
  name: string
  value: TokenValue
}

function kebab(key: string) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

export function flatten(group: TokenGroup, path: string[] = []): Token[] {
  return Object.entries(group).flatMap(([key, value]) => {
    const next = [...path, key]
    if (typeof value === 'string') {
      return [{ name: `${tokenPrefix}${next.map(kebab).join('-')}`, value }]
    }
    return flatten(value, next)
  })
}

function declarations(group: TokenGroup, indent: string, path: string[] = []) {
  return flatten(group, path)
    .map(({ name, value }) => `${indent}${name}: ${value};`)
    .join('\n')
}

export function toCss() {
  const root = [
    `    color-scheme: ${colorScheme};`,
    ...Object.entries(tokens).map(([key, value]) => declarations(value, '    ', [key])),
  ].join('\n\n')

  return [
    `@layer ${layers.join(', ')};`,
    '',
    `@layer ${layers[1]} {`,
    '  :root {',
    root,
    '  }',
    '',
    '  @media (prefers-reduced-motion: reduce) {',
    '    :root {',
    declarations(reducedMotion, '      '),
    '    }',
    '  }',
    '}',
    '',
  ].join('\n')
}
