import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { tokenPrefix } from '@v/design-tokens'
import { VIconAlertTriangle, VIconCircleAlert, VIconCircleCheck, VIconInfo } from '@v/icons'
import { SchemePanels, Tile, accents, hovered, source, tokensOf, v } from './foundations-shared.ts'

const meta = { title: 'Foundations/Color' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

type Kind = 'surface' | 'scrim' | 'accent' | 'text' | 'line'

interface Role {
  kind: Kind
  name: string
  note: string
  covers?: string[]
}

const groups: { title: string; roles: Role[] }[] = [
  {
    title: 'Surfaces',
    roles: [
      {
        kind: 'surface',
        name: 'surface',
        note: 'Default background. Follows the system canvas color.',
      },
      {
        kind: 'surface',
        name: 'surface-muted',
        note: 'A quiet step away from the page, for grouped regions.',
      },
      {
        kind: 'surface',
        name: 'surface-raised',
        note: 'Cards, menus, popovers, and dialogs. The same as surface in light mode, a step lighter in dark mode.',
      },
      {
        kind: 'surface',
        name: 'surface-selected',
        note: 'Marks the chosen option, row, or tab: 12% of the accent over surface. Pair it with a non-color cue such as a check mark.',
      },
      {
        kind: 'scrim',
        name: 'surface-scrim',
        note: 'Dims the page behind modal content.',
      },
      {
        kind: 'accent',
        name: 'surface-accent',
        covers: ['text-on-accent'],
        note: 'The operating system accent color, with text-on-accent on top. It differs per user and the operating system picks the text color, so the token tests do not cover this pairing.',
      },
    ],
  },
  {
    title: 'Text',
    roles: [
      { kind: 'text', name: 'text', note: 'Default text color.' },
      {
        kind: 'text',
        name: 'text-muted',
        note: 'Secondary text such as hints and captions.',
      },
      {
        kind: 'text',
        name: 'text-accent',
        note: 'The accent, darkened in light mode and lightened in dark mode until it can carry text. Tested at 4.5:1.',
      },
    ],
  },
  {
    title: 'Lines',
    roles: [
      {
        kind: 'line',
        name: 'border',
        note: 'Outline of controls. Tested at 3:1 against surface.',
      },
      {
        kind: 'line',
        name: 'border-danger',
        note: 'Outline of an invalid control. The same color as text-danger, so it keeps 3:1 against surface.',
      },
      {
        kind: 'line',
        name: 'border-muted',
        note: 'Hairline dividers between regions. Not covered by the contrast tests, so use it for decoration only.',
      },
    ],
  },
]

const statuses = [
  {
    name: 'info',
    icon: VIconInfo,
    title: 'Heads up',
    message: 'Your trial ends in three days.',
    note: 'Neutral information.',
  },
  {
    name: 'success',
    icon: VIconCircleCheck,
    title: 'Saved',
    message: 'Your changes are now live.',
    note: 'A completed action.',
  },
  {
    name: 'warning',
    icon: VIconAlertTriangle,
    title: 'Storage almost full',
    message: 'You have used 85% of your quota.',
    note: 'Something that needs attention soon, but is not yet an error.',
  },
  {
    name: 'danger',
    icon: VIconCircleAlert,
    title: 'Payment failed',
    message: 'Check your card details and try again.',
    note: 'An error, or an action that cannot be undone.',
  },
]

const rolesSource = `
.card {
  background: var(--v-color-surface-raised);
  color: var(--v-color-text);
  border: var(--v-border-width) solid var(--v-color-border);
}

.card small {
  color: var(--v-color-text-muted);
}

.card[aria-selected='true'] {
  background: var(--v-color-surface-selected);
}

.link {
  color: var(--v-color-text-accent);
}

.backdrop {
  background: var(--v-color-surface-scrim);
}
`

export const Roles: Story = {
  tags: ['!dev'],
  parameters: source(rolesSource, 'css'),
  render: () => ({
    components: { Tile },
    setup() {
      const values = new Map(tokensOf('color').map((token) => [token.name, token.value]))
      const name = (role: string) => `${tokenPrefix}color-${role}`
      const documented = new Set(
        [
          ...groups.flatMap((group) =>
            group.roles.flatMap((role) => [role.name, ...(role.covers ?? [])]),
          ),
          ...statuses.flatMap((status) => [`surface-${status.name}`, `text-${status.name}`]),
        ].map(name),
      )
      return {
        v,
        groups: groups.map((group) => ({
          title: group.title,
          roles: group.roles.map((role) => ({
            ...role,
            token: name(role.name),
            value: values.get(name(role.name)) ?? '',
          })),
        })),
        undocumented: [...values.keys()].filter((token) => !documented.has(token)),
      }
    },
    template: `
      <div>
        <template v-for="group in groups" :key="group.title">
          <p class="fd-group">{{ group.title }}</p>
          <div class="fd-tiles">
            <Tile
              v-for="role in group.roles"
              :key="role.token"
              :token="role.token"
              :note="role.note"
              :value="role.value"
            >
              <div v-if="role.kind === 'surface'" class="fd-fill" :style="{ background: v('color-' + role.name) }">
                <strong>Aa</strong>
                <span class="fd-muted">Secondary text</span>
              </div>
              <div v-else-if="role.kind === 'scrim'" class="fd-fill">
                <strong>Aa</strong>
                <span class="fd-muted">Page content</span>
                <span class="fd-scrim" aria-hidden="true" :style="{ background: v('color-' + role.name) }" />
              </div>
              <div v-else-if="role.kind === 'accent'" class="fd-fill fd-fill--accent">
                <strong>Aa</strong>
                <span>Text on the accent</span>
              </div>
              <div v-else-if="role.kind === 'text'" class="fd-fill" :style="{ color: v('color-' + role.name) }">
                <strong>Aa</strong>
                <span>Sample text</span>
              </div>
              <div v-else-if="role.name === 'border-muted'" class="fd-fill">
                <div class="fd-divider">
                  <span>Section one</span>
                  <hr :style="{ borderColor: v('color-' + role.name) }" />
                  <span>Section two</span>
                </div>
              </div>
              <div v-else class="fd-fill">
                <div class="fd-edge" :style="{ borderColor: v('color-' + role.name) }">
                  <span>{{ role.name === 'border-danger' ? 'Invalid field' : 'Text field' }}</span>
                </div>
              </div>
            </Tile>
          </div>
        </template>
        <p v-if="undocumented.length" class="fd-note">Not documented yet: {{ undocumented.join(', ') }}</p>
      </div>
    `,
  }),
}

const statusSource = `
<div class="notice" role="status">
  <VIconInfo />
  <p><strong>Heads up</strong> Your trial ends in three days.</p>
</div>

<style>
/* Swap info for success, warning, or danger. Use role="alert" for danger. */
.notice {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--v-space-3);
  padding: var(--v-space-3);
  background: var(--v-color-surface-info);
  color: var(--v-color-text);
}

.notice svg,
.notice strong {
  color: var(--v-color-text-info);
}
</style>
`

export const Status: Story = {
  tags: ['!dev'],
  parameters: source(statusSource),
  render: () => ({
    components: { Tile },
    setup: () => ({ statuses }),
    template: `
      <div class="fd-tiles" :style="{ '--fd-tile': '26rem' }">
        <Tile
          v-for="status in statuses"
          :key="status.name"
          :token="'surface-' + status.name + ' + text-' + status.name"
          :note="status.note"
        >
          <div class="fd-status" :data-status="status.name">
            <component :is="status.icon" class="fd-status-icon" aria-hidden="true" />
            <p>
              <span class="fd-status-title">{{ status.title }}</span><br />
              {{ status.message }}
            </p>
          </div>
        </Tile>
      </div>
    `,
  }),
}

const selectionSource = `
<ul role="listbox" aria-label="Fruit">
  <li role="option" aria-selected="false">Apple</li>
  <li role="option" aria-selected="true">Banana</li>
</ul>

<style>
.option[aria-selected='true'] {
  background: var(--v-color-surface-selected);
}

/* Highlighted: where the keyboard or pointer is. A share of text over the surface. */
.option:hover {
  background: color-mix(in oklab, var(--v-color-text) var(--v-state-hover), var(--v-color-surface));
}

.option[aria-selected='true']:hover {
  background: color-mix(
    in oklab,
    var(--v-color-text) var(--v-state-hover),
    var(--v-color-surface-selected)
  );
}
</style>
`

export const Selection: Story = {
  tags: ['!dev'],
  parameters: source(selectionSource),
  render: () => ({
    components: { Tile },
    setup: () => ({
      options: [
        { label: 'Apple', note: 'Neither', highlighted: false, selected: false },
        { label: 'Banana', note: 'Selected', highlighted: false, selected: true },
        { label: 'Cherry', note: 'Highlighted', highlighted: true, selected: false },
        { label: 'Date', note: 'Selected and highlighted', highlighted: true, selected: true },
      ],
    }),
    template: `
      <div class="fd-tiles" :style="{ '--fd-tile': '28rem' }">
        <Tile
          token="surface-selected + state-hover"
          note="Highlighted is transient and sits on top of whatever surface the option has. Selected persists."
        >
          <div class="fd-pad">
            <ul role="listbox" aria-label="Fruit" class="fd-listbox">
              <li
                v-for="option in options"
                :key="option.label"
                role="option"
                class="fd-option"
                :aria-selected="option.selected"
                :data-highlighted="option.highlighted || undefined"
              >
                <span class="fd-check" aria-hidden="true">{{ option.selected ? '✓' : '' }}</span>
                <span>{{ option.label }}</span>
                <span class="fd-option-note">{{ option.note }}</span>
              </li>
            </ul>
          </div>
        </Tile>
      </div>
    `,
  }),
}

const textMin = 4.5
const nonTextMin = 3

const statusNames = statuses.map((status) => status.name)
const textRoles = ['text', 'text-muted', ...statusNames.map((name) => `text-${name}`)]
const lineRoles = ['border', 'border-danger']

const backdrops = [
  ...['surface', 'surface-muted', 'surface-raised'].map((name) => ({
    name,
    text: textRoles,
    lines: lineRoles,
  })),
  { name: 'surface-selected', text: ['text', 'text-muted'], lines: [] as string[] },
  ...statusNames.map((name) => ({
    name: `surface-${name}`,
    text: ['text', 'text-muted', `text-${name}`],
    lines: [] as string[],
  })),
].map((backdrop) => ({
  ...backdrop,
  note: backdrop.lines.length
    ? `Text reaches ${textMin}:1 and borders reach ${nonTextMin}:1.`
    : `Text reaches ${textMin}:1.`,
}))

const hoverBackdrops = ['surface', 'surface-muted', 'surface-raised', 'surface-selected'].map(
  (name) => ({ name, background: hovered('text', name) }),
)

const contrastSource = `
/* Every pair on this page is asserted in packages/tokens/tests/tokens.test.ts. */
.alert {
  background: var(--v-color-surface-danger);
  color: var(--v-color-text-danger);
}

.alert small {
  color: var(--v-color-text-muted);
}

.field[aria-invalid='true'] {
  border: var(--v-border-width) solid var(--v-color-border-danger);
}
`

export const ContrastPairs: Story = {
  tags: ['!dev'],
  parameters: source(contrastSource, 'css'),
  render: () => ({
    components: { Tile },
    setup: () => ({ backdrops, hoverBackdrops, v, textMin }),
    template: `
      <div class="fd-tiles" :style="{ '--fd-tile': '18rem' }">
        <Tile
          v-for="backdrop in backdrops"
          :key="backdrop.name"
          :token="'on ' + backdrop.name"
          :note="backdrop.note"
        >
          <div class="fd-pairs" :style="{ background: v('color-' + backdrop.name) }">
            <span
              v-for="role in backdrop.text"
              :key="role"
              class="fd-pair"
              :style="{ color: v('color-' + role) }"
            >Aa <small>{{ role }}</small></span>
            <span v-for="role in backdrop.lines" :key="role" class="fd-pair fd-pair--line">
              <span class="fd-swatch" role="presentation" :style="{ borderColor: v('color-' + role) }" />
              <small>{{ role }}</small>
            </span>
          </div>
        </Tile>
        <Tile
          token="text under state-hover"
          :note="'The hover overlay laid over each surface. Text still reaches ' + textMin + ':1.'"
        >
          <div class="fd-pairs">
            <span
              v-for="backdrop in hoverBackdrops"
              :key="backdrop.name"
              class="fd-pair fd-pair--chip"
              :style="{ background: backdrop.background }"
            >Aa <small>on {{ backdrop.name }}</small></span>
          </div>
        </Tile>
      </div>
    `,
  }),
}

const accentSource = `
.link {
  color: var(--v-color-text-accent);
}

.option[aria-selected='true'] {
  background: var(--v-color-surface-selected);
}

.chip:focus-visible {
  outline: var(--v-focus-ring);
  outline-offset: var(--v-focus-offset);
}
`

export const AccentColors: Story = {
  tags: ['!dev'],
  parameters: source(accentSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup: () => ({ accent: ref(''), accents }),
    template: `
      <div>
        <label class="fd-picker">
          Accent color
          <select v-model="accent">
            <option v-for="item in accents" :key="item.name" :value="item.value">{{ item.name }}</option>
          </select>
        </label>
        <SchemePanels :accent="accent">
          <div class="fd-stack">
            <div class="fd-switch">
              <span class="fd-accent-chip" />
              <code class="fd-code">surface-accent</code>
            </div>
            <p class="fd-accent-text">Accent text: readable text in the accent hue</p>
            <ul role="listbox" aria-label="Accent example" class="fd-listbox">
              <li class="fd-option" role="option" aria-selected="true">
                <span class="fd-check" aria-hidden="true">✓</span>
                <span>Selected option</span>
                <small class="fd-muted fd-option-note">Secondary text</small>
              </li>
            </ul>
            <span class="fd-focus-sample">Focus ring</span>
          </div>
        </SchemePanels>
      </div>
    `,
  }),
}
