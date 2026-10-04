<script setup lang="ts">
import { VField } from '../field'
import VSelectControl from './VSelectControl.vue'
import type { VSelectProps } from './select.types'

defineOptions({ inheritAttrs: false })

const {
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  options,
  placeholder,
} = defineProps<VSelectProps>()

const model = defineModel<string | null>({ default: null })
</script>

<template>
  <VField
    :id="id"
    :label="label"
    :description="description"
    :error="error"
    :required="required"
    :disabled="disabled"
  >
    <VSelectControl v-model="model" v-bind="$attrs" :options="options" :placeholder="placeholder" />
  </VField>
</template>
