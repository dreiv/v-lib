import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent } from 'vue'
import { VButton } from '@v/design-system/button'
import { tokenPrefix, tokens } from '@v/design-tokens'
import utilitiesCss from '../../../packages/design-system/src/styles/utilities.css?raw'
import { Example, px, tokensOf, ui, v } from './foundations-shared.ts'

const meta = {
  title: 'Foundations/Layout Utilities',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const rules = [...utilitiesCss.matchAll(/\.(v-[a-z0-9-]+)\s*\{([^}]*)\}/g)].map((match) => ({
  name: match[1]!,
  declarations: match[2]!
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean),
}))

const defined = new Set(rules.map((rule) => rule.name))

const gapPattern = /^v-gap-(.+)$/

const gapSteps = rules.flatMap((rule) => gapPattern.exec(rule.name)?.[1] ?? [])

const usage: Record<string, string> = {
  'v-stack': 'Lays children out in a column.',
  'v-inline': 'Lays children out in a row.',
  'v-wrap': 'Lets a row flow onto new lines. Add it to v-inline.',
  'v-items-start': 'Aligns children to the start of the cross axis.',
  'v-items-center': 'Centers children on the cross axis.',
  'v-items-end': 'Aligns children to the end of the cross axis.',
  'v-items-stretch': 'Stretches children across the cross axis. This is the default.',
  'v-justify-start': 'Packs children at the start of the main axis.',
  'v-justify-center': 'Centers children on the main axis.',
  'v-justify-end': 'Packs children at the end of the main axis.',
  'v-justify-between': 'Spreads children out, with the first and last at the edges.',
  'v-container': 'Centers page content, caps its width, and keeps a gutter on both sides.',
  'v-visually-hidden': 'Hides an element from view and keeps it available to screen readers.',
}

const groupOf = (name: string) => {
  if (name === 'v-stack' || name === 'v-inline') return 'Direction'
  if (name === 'v-wrap') return 'Wrapping'
  if (gapPattern.test(name)) return 'Gap'
  if (name.startsWith('v-items-')) return 'Align items'
  if (name.startsWith('v-justify-')) return 'Justify content'
  if (name === 'v-container') return 'Container'
  return 'Visually hidden'
}

const groupOrder = [
  'Direction',
  'Wrapping',
  'Gap',
  'Align items',
  'Justify content',
  'Container',
  'Visually hidden',
]

const reference = groupOrder.map((title) => {
  const members = rules.filter((rule) => groupOf(rule.name) === title)
  if (title === 'Gap') {
    const entries = members.length
      ? [
          {
            name: `.v-gap-{${gapSteps.join(', ')}}`,
            css: 'gap: var(--v-space-{step})',
            note: 'One class per step of the space scale. See the gap scale below.',
          },
        ]
      : []
    return { title, entries }
  }
  const entries = members.map((rule) => ({
    name: `.${rule.name}`,
    css: rule.declarations.join('; '),
    note: usage[rule.name] ?? '',
  }))
  return { title, entries }
})

const undocumented = rules
  .map((rule) => rule.name)
  .filter((name) => !gapPattern.test(name) && !(name in usage))

const stale = Object.keys(usage).filter((name) => !defined.has(name))

const ClassTable = defineComponent({
  name: 'ClassTable',
  setup() {
    return {
      ui,
      reference,
      undocumented,
      stale,
      columns: 'minmax(10rem, 1fr) minmax(14rem, 2fr) minmax(12rem, 2fr)',
      noteStyle: { margin: 0, font: '0.8125rem/1.4 system-ui, sans-serif', opacity: 0.8 },
    }
  },
  template: `
    <div>
      <div :style="{ ...ui.row(columns), borderBlockEnd: 'none', paddingBlock: 0 }">
        <span :style="ui.th">Class</span>
        <span :style="ui.th">CSS</span>
        <span :style="ui.th">Use</span>
      </div>
      <template v-for="group in reference" :key="group.title">
        <p :style="ui.group">{{ group.title }}</p>
        <div v-for="entry in group.entries" :key="entry.name" :style="ui.row(columns)">
          <code :style="ui.code">{{ entry.name }}</code>
          <code :style="ui.code">{{ entry.css }}</code>
          <p :style="noteStyle">{{ entry.note }}</p>
        </div>
      </template>
      <p v-if="undocumented.length" :style="ui.note">Not documented yet: {{ undocumented.join(', ') }}</p>
      <p v-if="stale.length" :style="ui.note">No longer in utilities.css: {{ stale.join(', ') }}</p>
    </div>
  `,
})

const Chip = defineComponent({
  name: 'Chip',
  props: { tall: { type: Boolean, default: false } },
  setup(props) {
    return {
      style: () => ({
        padding: props.tall ? `${v('space-4')} ${v('space-3')}` : `${v('space-2')} ${v('space-3')}`,
        background: v('color-surface-muted'),
        border: `${v('border-width')} solid ${v('color-border')}`,
        borderRadius: v('radius-sm'),
        whiteSpace: 'nowrap',
      }),
    }
  },
  template: `<span :style="style()"><slot /></span>`,
})

const guide = {
  border: `${v('border-width')} dashed ${v('color-border-muted')}`,
  padding: v('space-2'),
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
  gap: v('space-4'),
  alignItems: 'start',
}

export const Reference: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { ClassTable },
    template: `<ClassTable />`,
  }),
}

export const Stack: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example, Chip },
    setup: () => ({
      grid,
      plain: '<div class="v-stack v-gap-3">\n  …\n</div>',
      start: '<div class="v-stack v-items-start v-gap-3">\n  …\n</div>',
    }),
    template: `
      <div :style="grid">
        <Example label="Children stretch by default" :code="plain">
          <div class="v-stack v-gap-3">
            <Chip>One</Chip>
            <Chip>Two</Chip>
            <Chip>Three</Chip>
          </div>
        </Example>
        <Example label="With v-items-start" :code="start">
          <div class="v-stack v-items-start v-gap-3">
            <Chip>One</Chip>
            <Chip>Two</Chip>
            <Chip>Three</Chip>
          </div>
        </Example>
      </div>
    `,
  }),
}

export const Inline: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example, Chip },
    setup: () => ({
      grid,
      plain: '<div class="v-inline v-gap-3">\n  …\n</div>',
      center: '<div class="v-inline v-items-center v-gap-3">\n  …\n</div>',
    }),
    template: `
      <div :style="grid">
        <Example label="Children stretch to the tallest by default" :code="plain">
          <div class="v-inline v-gap-3">
            <Chip>One</Chip>
            <Chip tall>Two</Chip>
            <Chip>Three</Chip>
          </div>
        </Example>
        <Example label="With v-items-center" :code="center">
          <div class="v-inline v-items-center v-gap-3">
            <Chip>One</Chip>
            <Chip tall>Two</Chip>
            <Chip>Three</Chip>
          </div>
        </Example>
      </div>
    `,
  }),
}

export const Wrap: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example, Chip },
    setup: () => ({
      grid,
      guide,
      labels: ['Design', 'Engineering', 'Research', 'Accessibility'],
      plain: '<div class="v-inline v-gap-2">\n  …\n</div>',
      wrapped: '<div class="v-inline v-wrap v-gap-2">\n  …\n</div>',
    }),
    template: `
      <div :style="grid">
        <Example label="Without v-wrap: the row overflows its container" :code="plain">
          <div :style="{ ...guide, inlineSize: '16rem' }">
            <div class="v-inline v-gap-2">
              <Chip v-for="label in labels" :key="label">{{ label }}</Chip>
            </div>
          </div>
        </Example>
        <Example label="With v-wrap: the row flows onto new lines" :code="wrapped">
          <div :style="{ ...guide, inlineSize: '16rem' }">
            <div class="v-inline v-wrap v-gap-2">
              <Chip v-for="label in labels" :key="label">{{ label }}</Chip>
            </div>
          </div>
        </Example>
      </div>
    `,
  }),
}

export const GapScale: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Chip },
    setup: () => ({
      ui,
      columns: 'minmax(9rem, 12rem) 1fr',
      rows: tokensOf('space').map((token) => {
        const step = token.name.slice(`${tokenPrefix}space-`.length)
        return {
          step,
          className: `v-gap-${step}`,
          token: token.name,
          size: `${token.value} · ${px(token.value)}`,
          exists: defined.has(`v-gap-${step}`),
        }
      }),
    }),
    template: `
      <div>
        <div v-for="row in rows" :key="row.step" :style="ui.row(columns)">
          <div>
            <code :style="ui.code">.{{ row.className }}</code>
            <p :style="ui.note">{{ row.token }} · {{ row.size }}</p>
            <p v-if="!row.exists" :style="ui.note">Missing from utilities.css.</p>
          </div>
          <div :class="['v-inline', row.className]">
            <Chip>A</Chip>
            <Chip>B</Chip>
          </div>
        </div>
      </div>
    `,
  }),
}

const alignments = ['start', 'center', 'end', 'stretch']

export const AlignItems: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example, Chip },
    setup: () => ({
      grid,
      guide,
      alignments,
      v,
      code: (align: string) => `<div class="v-inline v-items-${align} v-gap-3">\n  …\n</div>`,
    }),
    template: `
      <div :style="grid">
        <Example v-for="align in alignments" :key="align" :label="'v-items-' + align" :code="code(align)">
          <div :class="['v-inline', 'v-gap-3', 'v-items-' + align]" :style="{ ...guide, blockSize: v('space-16') }">
            <Chip>Short</Chip>
            <Chip tall>Taller</Chip>
          </div>
        </Example>
      </div>
    `,
  }),
}

const justifications = ['start', 'center', 'end', 'between']

export const JustifyContent: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example, Chip },
    setup: () => ({
      grid,
      guide,
      justifications,
      code: (justify: string) => `<div class="v-inline v-justify-${justify} v-gap-3">\n  …\n</div>`,
    }),
    template: `
      <div :style="grid">
        <Example v-for="justify in justifications" :key="justify" :label="'v-justify-' + justify" :code="code(justify)">
          <div :class="['v-inline', 'v-gap-3', 'v-justify-' + justify]" :style="guide">
            <Chip>A</Chip>
            <Chip>B</Chip>
          </div>
        </Example>
      </div>
    `,
  }),
}

export const Composed: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example, Chip, VButton },
    setup: () => ({
      v,
      toolbar:
        '<div class="v-inline v-justify-between v-items-center v-gap-4">\n  <strong>Inventory</strong>\n  <div class="v-inline v-gap-2">…</div>\n</div>',
      actions: '<div class="v-inline v-justify-end v-gap-2">\n  …\n</div>',
      section:
        '<section class="v-stack v-gap-4">\n  <h3>…</h3>\n  <p>…</p>\n  <div class="v-inline v-wrap v-gap-2">…</div>\n</section>',
      tags: ['Design', 'Engineering', 'Research', 'Accessibility'],
    }),
    template: `
      <div class="v-stack v-gap-4">
        <Example label="Toolbar" :code="toolbar">
          <div class="v-inline v-justify-between v-items-center v-gap-4">
            <strong>Inventory</strong>
            <div class="v-inline v-gap-2">
              <VButton variant="secondary">Sort</VButton>
              <VButton variant="secondary">Filter</VButton>
            </div>
          </div>
        </Example>
        <Example label="Action row" :code="actions">
          <div class="v-inline v-justify-end v-gap-2">
            <VButton variant="secondary">Cancel</VButton>
            <VButton variant="primary">Save</VButton>
          </div>
        </Example>
        <Example label="Section" :code="section">
          <section class="v-stack v-gap-4">
            <h3 :style="{ margin: 0, fontSize: v('font-size-lg'), lineHeight: v('line-height-tight') }">Release notes</h3>
            <p :style="{ margin: 0 }">Everything that changed in this version, grouped by area.</p>
            <div class="v-inline v-wrap v-gap-2">
              <Chip v-for="tag in tags" :key="tag">{{ tag }}</Chip>
            </div>
          </section>
        </Example>
      </div>
    `,
  }),
}

export const Container: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example },
    setup: () => ({
      ui,
      guide,
      v,
      maxName: `${tokenPrefix}container-max-inline`,
      max: `${tokens.container.maxInline} · ${px(tokens.container.maxInline)}`,
      gutterName: `${tokenPrefix}space-4`,
      gutter: `${tokens.space[4]} · ${px(tokens.space[4])}`,
      code: '<div class="v-container">\n  …\n</div>',
    }),
    template: `
      <div class="v-stack v-gap-4">
        <Example label="v-container" :code="code">
          <div :style="guide">
            <div class="v-container">
              <div :style="{ padding: v('space-4'), background: v('color-surface-muted'), border: v('border-width') + ' solid ' + v('color-border'), borderRadius: v('radius-sm') }">
                Content is centered, capped at the maximum width, and kept clear of the edges.
              </div>
            </div>
          </div>
        </Example>
        <div>
          <code :style="ui.code">{{ maxName }}: {{ max }}</code>
          <p :style="ui.note">The widest the content gets. On narrower screens the content takes the full width.</p>
        </div>
        <div>
          <code :style="ui.code">{{ gutterName }}: {{ gutter }}</code>
          <p :style="ui.note">The gutter on each side, so text never touches the screen edge.</p>
        </div>
      </div>
    `,
  }),
}

export const VisuallyHidden: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { Example },
    setup: () => ({
      ui,
      code: '<button type="button">\n  <span aria-hidden="true">+</span>\n  <span class="v-visually-hidden">Add item</span>\n</button>',
    }),
    template: `
      <Example label="An icon-only button with a text name" :code="code">
        <div class="v-stack v-items-start v-gap-2">
          <button type="button">
            <span aria-hidden="true">+</span>
            <span class="v-visually-hidden">Add item</span>
          </button>
          <p :style="ui.note">Sighted users see a plus sign. A screen reader announces “Add item, button”.</p>
        </div>
      </Example>
    `,
  }),
}
