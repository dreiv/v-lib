<script setup lang="ts">
import { computed } from 'vue'
import { VIconExternalLink } from '@v/icons'
import { useVStrings } from '../../strings'

const strings = useVStrings()

const props = defineProps<{
  target?: string
  rel?: string
  ariaLabel?: string
}>()

const isExternal = computed(() => props.target === '_blank')
const computedRel = computed(() =>
  isExternal.value ? (props.rel ?? 'noopener noreferrer') : props.rel,
)
</script>

<template>
  <a class="v-link" :target="target" :rel="computedRel" :aria-label="ariaLabel">
    <slot />
    <template v-if="isExternal">
      <VIconExternalLink class="v-link__icon" aria-hidden="true" />
      <span v-if="!ariaLabel" class="v-visually-hidden">{{
        ' (' + strings.link.opensInNewWindow + ')'
      }}</span>
    </template>
  </a>
</template>
