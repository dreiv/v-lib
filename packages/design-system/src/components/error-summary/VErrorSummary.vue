<script setup lang="ts">
import { nextTick, useId, useTemplateRef } from 'vue'
import type { VErrorSummaryProps } from './error-summary.types'

const { heading, errors } = defineProps<VErrorSummaryProps>()

const headingId = useId()
const headingElement = useTemplateRef<HTMLHeadingElement>('headingElement')

async function focus() {
  await nextTick()
  headingElement.value?.focus()
}

function follow(event: MouseEvent, id: string) {
  const target = document.getElementById(id)
  if (!target) return
  event.preventDefault()
  target.focus()
}

defineExpose({ focus })
</script>

<template>
  <section v-if="errors.length > 0" class="v-error-summary" :aria-labelledby="headingId">
    <h2 :id="headingId" ref="headingElement" class="v-error-summary__heading" tabindex="-1">
      {{ heading }}
    </h2>
    <ul class="v-error-summary__list">
      <li v-for="error in errors" :key="error.id" class="v-error-summary__item">
        <a class="v-error-summary__link" :href="`#${error.id}`" @click="follow($event, error.id)">
          {{ error.message }}
        </a>
      </li>
    </ul>
  </section>
</template>
