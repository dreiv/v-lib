<script setup lang="ts">
import { computed } from 'vue'
import { VIconAlertTriangle, VIconCircleCheck, VIconCircleX, VIconClose, VIconInfo } from '@v/icons'
import { VButton } from '../button'
import { useVStrings } from '../../strings'
import type { VAlertProps } from './alert.types'

const strings = useVStrings()

const {
  title,
  tone = 'info',
  live,
  dismissible = false,
  showIcon = false,
} = defineProps<VAlertProps>()
const open = defineModel<boolean>('open', { default: true })

const roles = { polite: 'status', assertive: 'alert' } as const
const role = computed(() => live && roles[live])

const icons = {
  info: VIconInfo,
  success: VIconCircleCheck,
  warning: VIconAlertTriangle,
  danger: VIconCircleX,
}
</script>

<template>
  <div v-if="open" class="v-alert" :data-tone="tone" :role="role">
    <div class="v-alert__header v-items-center v-gap-2">
      <component :is="icons[tone]" v-if="showIcon" />
      <p class="v-alert__title">{{ title }}</p>
      <VButton
        v-if="dismissible"
        class="v-alert__dismiss"
        variant="quiet"
        size="small"
        icon-only
        :aria-label="strings.alert.dismiss"
        @click="open = false"
      >
        <VIconClose />
      </VButton>
    </div>
    <div v-if="$slots.default" class="v-alert__body">
      <slot />
    </div>
  </div>
</template>
