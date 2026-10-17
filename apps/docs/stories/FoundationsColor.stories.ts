import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VAlert } from '@v/design-system/alert'
import { tokenPrefix } from '@v/design-tokens'
import { SchemePanels, accents, hovered, schemes, tokensOf, ui, v } from './foundations-shared.ts'

const meta = { title: 'Foundations/Color' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Role {
  name: string
  note: string
  text?: boolean
  on?: string
}

const groups: { title: string; roles: Role[] }[] = [
  {
    title: 'Surfaces',
    roles: [
      { name: 'surface', note: 'Default background. Follows the system canvas color.' },
      { name: 'surface-muted', note: 'A quiet step away from the page, for grouped regions.' },
      {
        name: 'surface-raised',
        note: 'Cards and other raised elements. The same as surface in light mode, a step lighter in dark mode.',
      },
      {
        name: 'surface-overlay',
        note: 'Menus, popovers, and dialogs. The same as surface in light mode, a little lighter again than raised in dark mode.',
      },
      { name: 'surface-scrim', note: 'Dims the page behind modal content.' },
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
      { name: 'border', note: 'Outline of controls. Tested at 3:1 against surface.' },
      {
        name: 'border-muted',
        note: 'Hairline separators between regions. Not covered by the contrast tests, so use it for decoration only.',
      },
    ],
  },
  {
    title: 'Accent',
    roles: [
      {
        name: 'surface-accent',
        note: 'The operating system accent color. It differs per user, so use text-accent for text and focus.',
      },
      {
        name: 'text-on-accent',
        note: 'Text on an accent fill. Chosen by the operating system, so the token tests do not cover this pairing.',
        on: 'surface-accent',
      },
      {
        name: 'text-accent',
        note: 'The accent, darkened in light mode and lightened in dark mode until it can carry text. Tested at 4.5:1.',
        text: true,
      },
    ],
  },
  {
    title: 'Status text and icons',
    roles: [
      { name: 'text-info', note: 'Informational text and icons.', text: true },
      { name: 'text-success', note: 'Success text and icons.', text: true },
      { name: 'text-warning', note: 'Warning text and icons.', text: true },
      { name: 'text-danger', note: 'Error and destructive text and icons.', text: true },
    ],
  },
  {
    title: 'Status surfaces',
    roles: [
      { name: 'surface-info', note: 'Tinted background for info messages.' },
      { name: 'surface-success', note: 'Tinted background for success messages.' },
      { name: 'surface-warning', note: 'Tinted background for warning messages.' },
      { name: 'surface-danger', note: 'Tinted background for error messages.' },
    ],
  },
]

export const Roles: Story = {
  tags: ['!dev'],
  render: () => ({
    setup() {
      const values = new Map(tokensOf('color').map((token) => [token.name, token.value]))
      const documented = new Set(
        groups.flatMap((group) => group.roles.map((role) => `${tokenPrefix}color-${role.name}`)),
      )
      return {
        schemes,
        ui,
        v,
        columns: 'minmax(14rem, 1fr) repeat(2, minmax(8rem, 12rem))',
        rows: groups.map((group) => ({
          title: group.title,
          roles: group.roles.map((role) => ({
            ...role,
            token: `${tokenPrefix}color-${role.name}`,
            value: values.get(`${tokenPrefix}color-${role.name}`) ?? '',
          })),
        })),
        undocumented: [...values.keys()].filter((name) => !documented.has(name)),
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
              <code :style="ui.value">{{ role.value }}</code>
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
        <p v-if="undocumented.length" :style="ui.note">
          Not documented yet: {{ undocumented.join(', ') }}
        </p>
      </div>
    `,
  }),
}

export const Status: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels, VAlert },
    setup: () => ({
      v,
      tones: [
        { tone: 'info', title: 'Review in progress', body: 'A reviewer will follow up shortly.' },
        { tone: 'success', title: 'Changes saved', body: 'Your draft is up to date.' },
        {
          tone: 'warning',
          title: 'Storage is almost full',
          body: 'Free up space before it runs out.',
        },
        { tone: 'danger', title: 'Payment failed', body: 'Update your payment method to retry.' },
      ] as const,
    }),
    template: `
      <SchemePanels>
        <div :style="{ display: 'grid', gap: v('space-3') }">
          <VAlert v-for="item in tones" :key="item.tone" :tone="item.tone" :title="item.title" show-icon>
            {{ item.body }}
          </VAlert>
        </div>
      </SchemePanels>
    `,
  }),
}

const textMin = 4.5
const nonTextMin = 3
const stateHover = hovered('text', 'surface')

const pairs = [
  ['text', 'surface', textMin],
  ['text', 'surface-muted', textMin],
  ['text', 'state-hover', textMin],
  ['text-muted', 'surface', textMin],
  ['text-muted', 'surface-muted', textMin],
  ['text-muted', 'surface-info', textMin],
  ['text-muted', 'surface-success', textMin],
  ['text-muted', 'surface-warning', textMin],
  ['text-muted', 'surface-danger', textMin],
  ['border', 'surface', nonTextMin],
  ['text-danger', 'surface', textMin],
  ['text-danger', 'surface-muted', textMin],
  ['text-danger', 'surface-danger', textMin],
  ['text-success', 'surface', textMin],
  ['text-success', 'surface-muted', textMin],
  ['text-success', 'surface-success', textMin],
  ['text-warning', 'surface', textMin],
  ['text-warning', 'surface-muted', textMin],
  ['text-warning', 'surface-warning', textMin],
  ['text-info', 'surface', textMin],
  ['text-info', 'surface-muted', textMin],
  ['text-info', 'surface-info', textMin],
] as const

export const ContrastPairs: Story = {
  tags: ['!dev'],
  render: () => ({
    setup: () => ({
      schemes,
      ui,
      v,
      columns: 'minmax(12rem, 1fr) 5rem repeat(2, minmax(8rem, 12rem))',
      rows: pairs.map(([fg, bg, min]) => ({
        fg,
        bg,
        min,
        key: `${fg}-${bg}`,
        background: bg === 'state-hover' ? stateHover : v(`color-${bg}`),
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
          <code :style="ui.code">{{ row.fg }} on {{ row.bg }}</code>
          <span>{{ row.min }}:1</span>
          <div v-for="scheme in schemes" :key="scheme" :style="{ ...ui.cell(scheme), background: row.background }">
            <span
              v-if="row.min === 3"
              role="img"
              :aria-label="row.fg + ' border on ' + row.bg + ', ' + scheme"
              :style="{ inlineSize: '100%', blockSize: '1.5rem', border: '2px solid ' + v('color-' + row.fg), borderRadius: v('radius-sm') }"
            />
            <span v-else :style="{ color: v('color-' + row.fg), fontWeight: 700 }">Aa Sample text</span>
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
        <label :style="{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBlockEnd: '1rem', font: '0.875rem/1.4 system-ui, sans-serif' }">
          Accent color
          <select v-model="accent">
            <option v-for="item in accents" :key="item.name" :value="item.value">{{ item.name }}</option>
          </select>
        </label>
        <SchemePanels :accent="accent">
          <div :style="{ display: 'grid', gap: v('space-3'), justifyItems: 'start' }">
            <div :style="{ display: 'flex', alignItems: 'center', gap: v('space-3') }">
              <span :style="ui.chip(v('color-surface-accent'))" />
              <code :style="ui.code">surface-accent</code>
            </div>
            <p :style="{ margin: 0, color: v('color-text-accent'), fontWeight: v('font-weight-bold') }">
              Accent text: readable text in the accent hue
            </p>
            <span
              :style="{
                padding: v('space-2') + ' ' + v('space-3'),
                borderRadius: v('radius-sm'),
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
