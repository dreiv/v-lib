<script setup lang="ts">
import { computed } from 'vue'
import { highlightMatch } from '../highlight-match'

const { text, term } = defineProps<{
  text: string
  term: string
}>()

const parts = computed(() => highlightMatch(text, term))
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <mark v-if="part.highlight" class="v-highlighted-text__match">{{ part.text }}</mark>
    <template v-else>{{ part.text }}</template>
  </template>
</template>
