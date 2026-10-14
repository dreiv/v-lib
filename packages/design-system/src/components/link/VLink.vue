<script setup lang="ts">
import { VIconExternalLink } from '@v/icons'
import { useVStrings } from '../../strings'
import type { VLinkProps } from './link.types'
import { useVLink } from './useVLink'

const { to, href, replace, target, rel, ariaLabel, externalIcon = true } = defineProps<VLinkProps>()

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const strings = useVStrings()

const link = useVLink({
  to: () => to,
  href: () => href,
  replace: () => replace,
  target: () => target,
  rel: () => rel,
})

function onClick(event: MouseEvent) {
  emit('click', event)
  link.navigate(event)
}
</script>

<template>
  <a
    class="v-link"
    :href="link.href()"
    :target="target"
    :rel="link.rel()"
    :aria-label="ariaLabel"
    :aria-current="link.current()"
    @click="onClick"
  >
    <slot />
    <template v-if="target === '_blank'">
      <VIconExternalLink v-if="externalIcon" class="v-link__icon" />
      <span v-if="!ariaLabel" class="v-visually-hidden">{{
        ' ' + strings.link.opensInNewWindow
      }}</span>
    </template>
  </a>
</template>
