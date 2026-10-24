import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { flatten, reducedMotion, tokenPrefix, tokens, type TokenGroup } from '@v/design-tokens'
import { SchemePanels, TokenList, percent, source, tokensOf } from './foundations-shared.ts'

const meta = { title: 'Foundations/Motion and states' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const durationUsage: Record<string, string> = {
  fast: 'Immediate feedback such as hover and press.',
  normal: 'State changes such as expanding, entering, and leaving.',
}

const durationKey = (name: string) => name.slice(`${tokenPrefix}duration-`.length)

const reducedNotes: Record<string, string> = {
  fast: 'Transitions complete at once.',
  normal: 'Transitions complete at once.',
}

const durationsSource = `
.panel {
  transition: translate var(--v-duration-normal) var(--v-easing-out);
}

.button:hover {
  transition: background var(--v-duration-fast) var(--v-easing-out);
}
`

export const Durations: Story = {
  tags: ['!dev'],
  parameters: source(durationsSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup() {
      const moved = ref(false)
      const reduced = ref(false)
      const vars = computed(() =>
        reduced.value
          ? Object.fromEntries(
              flatten(reducedMotion as TokenGroup).map((token) => [token.name, token.value]),
            )
          : {},
      )
      return {
        moved,
        reduced,
        vars,
        easingName: `${tokenPrefix}easing-out`,
        durations: tokensOf('duration').map((token) => ({
          ...token,
          usage: durationUsage[durationKey(token.name)] ?? '',
        })),
      }
    },
    template: `
      <SchemePanels system :vars="vars">
        <div class="fd-stack">
          <div class="v-inline v-wrap v-items-center v-gap-4">
            <button type="button" :aria-pressed="moved" @click="moved = !moved">
              {{ moved ? 'Move back' : 'Move' }}
            </button>
            <label class="fd-switch">
              <input v-model="reduced" type="checkbox" />
              Simulate reduced motion
            </label>
          </div>
          <div v-for="item in durations" :key="item.name">
            <code class="fd-code">{{ item.name }}</code>
            <code class="fd-value">{{ item.value }}</code>
            <p class="fd-note">{{ item.usage }}</p>
            <div class="fd-track" :data-moved="moved" :style="{ '--fd-duration': 'var(' + item.name + ')' }">
              <span class="fd-dot" />
            </div>
          </div>
          <div>
            <code class="fd-code">{{ easingName }}</code>
            <p class="fd-note">Every demo above uses this curve: quick at first, then easing gently to rest.</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

const reducedSource = `
@media (prefers-reduced-motion: reduce) {
  :root {
    --v-duration-fast: 0.01ms;
    --v-duration-normal: 0.01ms;
  }
}
`

export const ReducedMotion: Story = {
  tags: ['!dev'],
  parameters: source(reducedSource, 'css'),
  render: () => ({
    components: { TokenList },
    setup() {
      const all = flatten(tokens as TokenGroup)
      const changed = flatten(reducedMotion as TokenGroup).map((token) => {
        const original = all.find((item) => item.name === token.name)
        return {
          token: token.name,
          value: `${original?.value ?? ''} to ${token.value}`,
          note: reducedNotes[durationKey(token.name)] ?? '',
        }
      })
      return { rows: changed, labels: ['Token', 'With reduced motion', 'Effect'] }
    },
    template: `<TokenList :rows="rows" :labels="labels" />`,
  }),
}

const statesSource = `
.row:hover {
  background: color-mix(in oklab, var(--v-color-text) var(--v-state-hover), var(--v-color-surface));
}

.control:disabled {
  opacity: var(--v-state-disabled-opacity);
}

.control:active {
  transform: scale(var(--v-state-press-scale));
}
`

export const States: Story = {
  tags: ['!dev'],
  parameters: source(statesSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      states: [
        {
          label: 'Hover',
          modifier: 'hover',
          token: `${tokenPrefix}state-hover`,
          note: `${tokens.state.hover} of the text color laid over the surface.`,
        },
        {
          label: 'Disabled',
          modifier: 'disabled',
          token: `${tokenPrefix}state-disabled-opacity`,
          note: `The whole control drops to ${percent(tokens.state.disabledOpacity)} opacity. Disabled controls are exempt from the contrast minimums.`,
        },
        {
          label: 'Pressed size',
          modifier: 'pressed',
          token: `${tokenPrefix}state-press-scale`,
          note: `The control shrinks to ${percent(tokens.state.pressScale)} of its size while pressed.`,
        },
      ],
    }),
    template: `
      <SchemePanels>
        <div class="fd-stack">
          <div v-for="state in states" :key="state.token">
            <div class="fd-state" :class="'fd-state--' + state.modifier">{{ state.label }}</div>
            <code class="fd-code">{{ state.token }}</code>
            <p class="fd-note">{{ state.note }}</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
