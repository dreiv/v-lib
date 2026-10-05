<script setup lang="ts">
import { computed } from 'vue'
import type { VAlertProps } from './alert.types'

const { title, tone = 'info', live } = defineProps<VAlertProps>()

const role = computed(() => {
  if (live === 'assertive') return 'alert'
  if (live === 'polite') return 'status'
  return undefined
})
</script>

<template>
  <div class="v-alert" :data-tone="tone" :role="role">
    <p class="v-alert__title">{{ title }}</p>
    <div v-if="$slots.default" class="v-alert__body">
      <slot />
    </div>
  </div>
</template>
