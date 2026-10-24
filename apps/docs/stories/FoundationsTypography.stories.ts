import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix } from '@v/design-tokens'
import { SchemePanels, px, source, tokensOf } from './foundations-shared.ts'

const meta = { title: 'Foundations/Typography' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const sample = 'Pack my box with five dozen liquor jugs'

const families = [
  {
    name: `${tokenPrefix}font-sans`,
    note: "The platform's UI font, then Apple's system font, Segoe UI, and the browser's generic sans-serif.",
  },
  {
    name: `${tokenPrefix}font-mono`,
    note: "The platform's monospace font, then SF Mono, Menlo, Consolas, Liberation Mono, and the generic monospace.",
  },
]

const weightUsage: Record<string, string> = {
  regular: 'Body text.',
  medium: 'Labels and light emphasis.',
  bold: 'Headings, titles, and strong emphasis.',
}

const sizeUsage: Record<string, string> = {
  xs: 'Captions and dense metadata.',
  sm: 'Secondary text and compact controls.',
  md: 'Body text. The default size of the page.',
  lg: 'Lead text and small headings.',
  xl: 'Section headings.',
  '2xl': 'Page headings.',
}

const familiesSource = `
body {
  font-family: var(--v-font-sans);
  font-weight: var(--v-font-weight-regular);
}

code {
  font-family: var(--v-font-mono);
}

th {
  font-weight: var(--v-font-weight-bold);
}
`

export const Families: Story = {
  tags: ['!dev'],
  parameters: source(familiesSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      sample,
      families,
      weights: tokensOf('font', 'weight').map((token) => ({
        ...token,
        usage: weightUsage[token.name.slice(`${tokenPrefix}font-weight-`.length)] ?? '',
      })),
    }),
    template: `
      <SchemePanels system>
        <div class="fd-rows" :style="{ '--fd-columns': 'minmax(11rem, 1fr) 2fr' }">
          <div v-for="family in families" :key="family.name" class="fd-row">
            <div>
              <code class="fd-code">{{ family.name }}</code>
              <p class="fd-note">{{ family.note }}</p>
            </div>
            <p class="fd-sample" :style="{ fontFamily: 'var(' + family.name + ')' }">{{ sample }}</p>
          </div>
          <div v-for="weight in weights" :key="weight.name" class="fd-row">
            <div>
              <code class="fd-code">{{ weight.name }}: {{ weight.value }}</code>
              <p class="fd-note">{{ weight.usage }}</p>
            </div>
            <p class="fd-sample" :style="{ fontWeight: 'var(' + weight.name + ')' }">{{ sample }}</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

const sizesSource = `
h1 {
  font-size: var(--v-font-size-2xl);
  line-height: var(--v-line-height-tight);
}

small {
  font-size: var(--v-font-size-sm);
}
`

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: source(sizesSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      sample,
      sizes: tokensOf('font', 'size').map((token) => ({
        ...token,
        px: px(token.value),
        usage: sizeUsage[token.name.slice(`${tokenPrefix}font-size-`.length)] ?? '',
      })),
    }),
    template: `
      <SchemePanels system>
        <div class="fd-rows" :style="{ '--fd-columns': 'minmax(11rem, 1fr) 2fr' }">
          <div v-for="size in sizes" :key="size.name" class="fd-row">
            <div>
              <code class="fd-code">{{ size.name }}</code>
              <code class="fd-value">{{ size.value }} · {{ size.px }} at the default root size</code>
              <p class="fd-note">{{ size.usage }}</p>
            </div>
            <p class="fd-sample" :style="{ fontSize: 'var(' + size.name + ')', lineHeight: 'var(--v-line-height-tight)' }">{{ sample }}</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

const lineHeightsSource = `
p {
  line-height: var(--v-line-height-normal);
}

h1 {
  line-height: var(--v-line-height-tight);
}

.article {
  line-height: var(--v-line-height-relaxed);
}
`

export const LineHeights: Story = {
  tags: ['!dev'],
  parameters: source(lineHeightsSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      heights: tokensOf('lineHeight'),
      text: 'Spacing between lines changes how long passages read. Wider line spacing helps people who track lines with difficulty, and tighter spacing suits headings that wrap onto two lines.',
    }),
    template: `
      <SchemePanels system>
        <div class="fd-cols">
          <div v-for="height in heights" :key="height.name">
            <code class="fd-code">{{ height.name }}: {{ height.value }}</code>
            <p class="fd-prose" :style="{ lineHeight: 'var(' + height.name + ')' }">{{ text }}</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
