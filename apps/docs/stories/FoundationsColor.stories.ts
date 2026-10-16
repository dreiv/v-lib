import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { tokenPrefix, tokens } from '@v/design-tokens'
import {
  SchemePanels,
  TokenList,
  accents,
  contrastNotes,
  contrastPairs,
  describeColor,
  nonTextMinimum,
  overlay,
  schemes,
  tokensOf,
  ui,
  v,
} from './foundations-shared.ts'

const meta = { title: 'Foundations/Color' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Role {
  name: string
  note: string
  text?: boolean
  on?: string
  contrast?: string
}

const groups: { title: string; roles: Role[] }[] = [
  {
    title: 'Surfaces',
    roles: [
      { name: 'surface', note: 'Default page and component background.' },
      {
        name: 'surface-subtle',
        note: 'A quiet step away from the page, for grouped regions and containers.',
      },
    ],
  },
  {
    title: 'Text',
    roles: [
      { name: 'text', note: 'Default text color.', text: true },
      { name: 'text-muted', note: 'Secondary text such as hints and captions.', text: true },
    ],
  },
  {
    title: 'Lines',
    roles: [
      { name: 'border', note: 'Outline of controls and any boundary that must stay visible.' },
      {
        name: 'divider',
        note: 'Hairline separators between regions. Decorative only.',
        contrast: 'Not covered by a contrast test, so never use it to mark a control boundary.',
      },
    ],
  },
  {
    title: 'Accent',
    roles: [
      {
        name: 'accent',
        note: 'The accent color of the operating system. It differs per user, so use it for fills, and use accent-ink for text and focus.',
      },
      {
        name: 'accent-text',
        note: 'Text on an accent fill.',
        on: 'accent',
        contrast: 'Chosen by the operating system, so the token tests do not cover this pairing.',
      },
      {
        name: 'accent-ink',
        note: 'The accent, adjusted until it can carry text.',
        text: true,
        contrast:
          'Tested at 4.5:1 on surface for each system accent in the picker below, including under the hover and press overlays.',
      },
    ],
  },
  {
    title: 'Status',
    roles: [
      { name: 'info', note: 'Informational text and icons.', text: true },
      { name: 'success', note: 'Success text and icons.', text: true },
      { name: 'warning', note: 'Warning text and icons.', text: true },
      { name: 'danger', note: 'Error and destructive text and icons.', text: true },
      { name: 'info-surface', note: 'Tinted background for info messages.' },
      { name: 'success-surface', note: 'Tinted background for success messages.' },
      { name: 'warning-surface', note: 'Tinted background for warning messages.' },
      { name: 'danger-surface', note: 'Tinted background for error messages.' },
    ],
  },
  {
    title: 'Overlay and focus',
    roles: [
      {
        name: 'focus',
        note: 'Color of the focus indicator.',
        contrast: 'Tested at 3:1 on surface for each system accent in the picker below.',
      },
      {
        name: 'scrim',
        note: 'Dims the page behind modal content.',
        contrast: 'Not covered by a contrast test.',
      },
    ],
  },
]

const choices: [string, string][] = [
  ['surface', 'Page or component background.'],
  ['surface-subtle', 'A grouped or quiet region.'],
  ['text', 'Body text.'],
  ['text-muted', 'Hints, captions, and other secondary text.'],
  ['border', 'Outline of an input, checkbox, or card.'],
  ['divider', 'Separator between regions. Decorative only.'],
  ['accent', 'A fill that follows the system accent. Use accent-text for text on it.'],
  ['accent-ink', 'Accent-colored text or links.'],
  ['info', 'Status text or icon. success, warning, and danger work the same way.'],
  ['info-surface', 'Tinted message background. Each status has its own.'],
  ['focus', 'Focus indicator.'],
  ['scrim', 'Dimming behind a modal.'],
]

export const Choosing: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { TokenList },
    setup: () => ({
      labels: ['Token', 'Use it for'],
      rows: choices.map(([name, use]) => ({
        token: `${tokenPrefix}color-${name}`,
        value: use,
      })),
    }),
    template: `<TokenList :rows="rows" :labels="labels" />`,
  }),
}

export const Roles: Story = {
  tags: ['!dev'],
  render: () => ({
    setup() {
      const values = new Map(tokensOf('color').map((token) => [token.name, token.value]))
      const listed = new Set(
        groups.flatMap((group) => group.roles.map((role) => `${tokenPrefix}color-${role.name}`)),
      )
      const rows = groups.map((group) => ({
        title: group.title,
        roles: group.roles.map((role) => {
          const token = `${tokenPrefix}color-${role.name}`
          return {
            ...role,
            token,
            source: describeColor(values.get(token) ?? ''),
            notes: [...contrastNotes(role.name), ...(role.contrast ? [role.contrast] : [])],
          }
        }),
      }))
      return {
        schemes,
        ui,
        v,
        rows,
        columns: 'minmax(14rem, 1fr) repeat(2, minmax(8rem, 12rem))',
        unlisted: [...values.keys()].filter((name) => !listed.has(name)),
        unexplained: rows
          .flatMap((group) => group.roles)
          .filter((role) => !role.source)
          .map((role) => role.token),
      }
    },
    template: `
      <div>
        <div :style="{ ...ui.row(columns), borderBlockEnd: 'none', paddingBlock: 0 }">
          <span :style="ui.th">Token</span>
          <span v-for="scheme in schemes" :key="scheme" :style="ui.th">{{ scheme === 'light' ? 'Light' : 'Dark' }}</span>
        </div>
        <template v-for="group in rows" :key="group.title">
          <p :style="ui.group">{{ group.title }}</p>
          <div v-for="role in group.roles" :key="role.token" :style="ui.row(columns)">
            <div>
              <code :style="ui.code">{{ role.token }}</code>
              <p :style="ui.note">{{ role.note }}</p>
              <p v-if="role.source" :style="ui.note">{{ role.source }}</p>
              <p v-for="note in role.notes" :key="note" :style="ui.note">{{ note }}</p>
            </div>
            <div
              v-for="scheme in schemes"
              :key="scheme"
              :style="ui.cell(scheme)"
              role="img"
              :aria-label="role.name + ', ' + scheme + ' scheme'"
            >
              <span
                v-if="role.on"
                :style="{ ...ui.chip(v('color-' + role.on)), display: 'grid', placeItems: 'center', color: v('color-' + role.name), font: 'inherit', fontWeight: 700 }"
              >Aa</span>
              <template v-else>
                <span :style="ui.chip(v('color-' + role.name))" />
                <span v-if="role.text" :style="{ color: v('color-' + role.name), fontWeight: 700 }">Aa</span>
              </template>
            </div>
          </div>
        </template>
        <p v-if="unlisted.length" :style="ui.note">Not documented yet: {{ unlisted.join(', ') }}</p>
        <p v-if="unexplained.length" :style="ui.note">No plain-language description yet: {{ unexplained.join(', ') }}</p>
      </div>
    `,
  }),
}

export const Status: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      v,
      tones: [
        { tone: 'info', label: 'Information' },
        { tone: 'success', label: 'Success' },
        { tone: 'warning', label: 'Warning' },
        { tone: 'danger', label: 'Error' },
      ],
      backdrops: [
        { key: 'surface', label: 'On surface' },
        { key: 'surface-subtle', label: 'On subtle surface' },
        { key: 'tone-surface', label: 'On tinted surface' },
      ],
      fill: (tone: string, key: string) =>
        key === 'tone-surface' ? v(`color-${tone}-surface`) : v(`color-${key}`),
    }),
    template: `
      <SchemePanels>
        <div class="v-stack v-gap-4">
          <div
            v-for="item in tones"
            :key="item.tone"
            :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))', gap: v('space-2') }"
          >
            <div
              v-for="backdrop in backdrops"
              :key="backdrop.key"
              :style="{
                background: fill(item.tone, backdrop.key),
                border: v('border-width') + ' solid ' + v('color-border'),
                borderRadius: v('radius-1'),
                padding: v('space-3'),
              }"
            >
              <p :style="{ margin: 0, color: v('color-' + item.tone), fontWeight: v('font-weight-bold') }">{{ item.label }}</p>
              <p :style="{ margin: 0, color: v('color-text-muted') }">{{ backdrop.label }}</p>
            </div>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

const hoverMix = overlay('text', tokens.opacity.hover, 'surface')

export const ContrastPairs: Story = {
  tags: ['!dev'],
  render: () => ({
    setup: () => ({
      schemes,
      ui,
      v,
      nonTextMinimum,
      columns: 'minmax(12rem, 1fr) 5rem repeat(2, minmax(8rem, 12rem))',
      rows: contrastPairs.map((pair) => ({
        ...pair,
        key: `${pair.foreground}-${pair.background}`,
        surface: pair.background === 'hover-mix' ? hoverMix : v(`color-${pair.background}`),
      })),
    }),
    template: `
      <div>
        <div :style="{ ...ui.row(columns), borderBlockEnd: 'none', paddingBlock: 0 }">
          <span :style="ui.th">Foreground on background</span>
          <span :style="ui.th">Minimum</span>
          <span v-for="scheme in schemes" :key="scheme" :style="ui.th">{{ scheme === 'light' ? 'Light' : 'Dark' }}</span>
        </div>
        <div v-for="row in rows" :key="row.key" :style="ui.row(columns)">
          <code :style="ui.code">{{ row.foreground }} on {{ row.background }}</code>
          <span>{{ row.minimum }}:1</span>
          <div v-for="scheme in schemes" :key="scheme" :style="{ ...ui.cell(scheme), background: row.surface }">
            <span
              v-if="row.minimum === nonTextMinimum"
              role="img"
              :aria-label="row.foreground + ' border on ' + row.background + ', ' + scheme"
              :style="{ inlineSize: '100%', blockSize: v('space-6'), border: '2px solid ' + v('color-' + row.foreground), borderRadius: v('radius-1') }"
            />
            <span v-else :style="{ color: v('color-' + row.foreground), fontWeight: v('font-weight-bold') }">Aa Sample text</span>
          </div>
        </div>
      </div>
    `,
  }),
}

export const AccentColors: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({ accent: ref(''), accents, ui, v }),
    template: `
      <div>
        <label :style="ui.field">
          Accent color
          <select v-model="accent">
            <option v-for="item in accents" :key="item.name" :value="item.value">{{ item.name }}</option>
          </select>
        </label>
        <SchemePanels :accent="accent">
          <div :style="{ display: 'grid', gap: v('space-3'), justifyItems: 'start' }">
            <div :style="{ display: 'flex', alignItems: 'center', gap: v('space-3') }">
              <span :style="ui.chip(v('color-accent'))" />
              <code :style="ui.code">accent</code>
            </div>
            <p :style="{ margin: 0, color: v('color-accent-ink'), fontWeight: v('font-weight-bold') }">
              Accent ink: readable text in the accent hue
            </p>
            <span
              :style="{
                padding: v('space-2') + ' ' + v('space-3'),
                borderRadius: v('radius-1'),
                outline: v('focus-ring'),
                outlineOffset: v('focus-offset'),
              }"
            >Focus ring</span>
          </div>
        </SchemePanels>
      </div>
    `,
  }),
}
