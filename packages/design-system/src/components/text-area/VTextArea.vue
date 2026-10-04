<script setup lang="ts">
import { VField } from '../field'
import VTextAreaControl from './VTextAreaControl.vue'
import type { VTextAreaProps } from './text-area.types'

defineOptions({ inheritAttrs: false })

const {
  label,
  description,
  error,
  required = false,
  disabled = false,
  placeholder,
  autocomplete,
} = defineProps<VTextAreaProps>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <VField
    :label="label"
    :description="description"
    :error="error"
    :required="required"
    :disabled="disabled"
  >
    <VTextAreaControl
      v-model="model"
      v-bind="$attrs"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
  </VField>
</template>
