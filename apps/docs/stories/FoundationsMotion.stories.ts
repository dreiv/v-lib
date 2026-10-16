import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { flatten, reducedMotion, tokenPrefix, tokens, type TokenGroup } from '@v/design-tokens'
import { SchemePanels, TokenList, overlay, percent, tokensOf, ui, v } from './foundations-shared.ts'

const meta = { title: 'Foundations/Motion and states' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const durationUsage: Record<string, string> = {
  fast: 'Immediate feedback such as hover and press.',
  base: 'State changes such as expanding, entering, and leaving.',
}

const durationKey = (name: string) => name.slice(`${tokenPrefix}duration-`.length)

const reducedNotes: Record<string, string> = {
  fast: 'Transitions complete at once.',
  base: 'Transitions complete at once.',
}

export const Durations: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup() {
      const moved = ref(false)
      const dot = (name: string) => ({
        inlineSize: v('space-4'),
        blockSize: v('space-4'),
        background: v('color-accent-ink'),
        borderRadius: v('radius-1'),
        translate: moved.value ? '13rem 0' : '0 0',
        transition: `translate var(${name}) ${v('easing-standard')}`,
      })
      return {
        v,
        ui,
        dot,
        moved,
        easingName: `${tokenPrefix}easing-standard`,
        durations: tokensOf('duration').map((token) => ({
          ...token,
          usage: durationUsage[durationKey(token.name)] ?? '',
          demo: ['fast', 'base'].includes(durationKey(token.name)),
        })),
        track: {
          display: 'flex',
          alignItems: 'center',
          inlineSize: '14rem',
          maxInlineSize: '100%',
          marginBlockStart: v('space-2'),
          border: `${v('border-width')} solid ${v('color-divider')}`,
          borderRadius: v('radius-1'),
        },
      }
    },
    template: `
      <SchemePanels system>
        <div :style="{ display: 'grid', gap: v('space-4') }">
          <button type="button" :aria-pressed="moved" style="justify-self: start" @click="moved = !moved">
            {{ moved ? 'Move back' : 'Move' }}
          </button>
          <div v-for="item in durations" :key="item.name">
            <code :style="ui.code">{{ item.name }}: {{ item.value }}</code>
            <p :style="ui.note">{{ item.usage }}</p>
            <div v-if="item.demo" :style="track"><span :style="dot(item.name)" /></div>
          </div>
          <div>
            <code :style="ui.code">{{ easingName }}</code>
            <p :style="ui.note">Every demo above uses this curve: quick at first, then easing gently to rest.</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

export const ReducedMotion: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { TokenList },
    setup() {
      const all = flatten(tokens as TokenGroup)
      const changed = flatten(reducedMotion as TokenGroup).map((token) => {
        const original = all.find((item) => item.name === token.name)
        const key = durationKey(token.name)
        return {
          token: token.name,
          value: `${original?.value ?? ''} to ${token.value}`,
          note: reducedNotes[key] ?? '',
        }
      })
      return { rows: changed, labels: ['Token', 'With reduced motion', 'Effect'] }
    },
    template: `<TokenList :rows="rows" :labels="labels" />`,
  }),
}

const box = {
  padding: `${v('space-3')} ${v('space-4')}`,
  border: `${v('border-width')} solid ${v('color-border')}`,
  borderRadius: v('radius-1'),
}

export const States: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      ui,
      states: [
        {
          label: 'Hover and press',
          token: `${tokenPrefix}state-mix`,
          note: `${percent(tokens.state.mix)} of the text color laid over the surface.`,
          style: { ...box, background: overlay('text', tokens.state.mix, 'surface') },
        },
        {
          label: 'Disabled',
          token: `${tokenPrefix}opacity-disabled`,
          note: `The whole control drops to ${percent(tokens.opacity.disabled)} opacity. Disabled controls are exempt from the contrast minimums.`,
          style: { ...box, opacity: v('opacity-disabled') },
        },
        {
          label: 'Pressed size',
          token: `${tokenPrefix}scale-press`,
          note: `The control shrinks to ${percent(tokens.scale.press)} of its size while pressed.`,
          style: { ...box, display: 'inline-block', transform: `scale(${v('scale-press')})` },
        },
      ],
    }),
    template: `
      <SchemePanels>
        <div class="v-stack v-gap-4 v-items-start">
          <div v-for="state in states" :key="state.token">
            <div :style="state.style">{{ state.label }}</div>
            <code :style="ui.code">{{ state.token }}</code>
            <p :style="ui.note">{{ state.note }}</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
