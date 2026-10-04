<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import type { VTooltipProps } from './tooltip.types'

const { text } = defineProps<VTooltipProps>()
</script>

<template>
  <TooltipProvider :delay-duration="500">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="v-tooltip__content" :side-offset="6">{{ text }}</TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
