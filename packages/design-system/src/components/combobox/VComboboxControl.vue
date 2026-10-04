<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui'
import { useFieldContext } from '../field/field.context'
import type { VComboboxOption } from './combobox.types'

const { options, placeholder } = defineProps<{
  options: VComboboxOption[]
  placeholder?: string
}>()

const model = defineModel<string | null>({ default: null })
const { id, describedby, invalid, required, disabled } = useFieldContext()

function displayValue(value: unknown) {
  return options.find((option) => option.value === value)?.label ?? ''
}
</script>

<template>
  <ComboboxRoot v-model="model" :disabled="disabled">
    <ComboboxAnchor
      class="v-field__control v-combobox__anchor"
      :data-invalid="invalid || undefined"
      :data-disabled="disabled || undefined"
    >
      <ComboboxInput
        :id="id"
        class="v-combobox__input"
        :placeholder="placeholder"
        :display-value="displayValue"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedby"
      />
      <ComboboxTrigger class="v-combobox__trigger" aria-label="Show options">
        <span aria-hidden="true">▾</span>
      </ComboboxTrigger>
    </ComboboxAnchor>
    <ComboboxPortal>
      <ComboboxContent class="v-combobox__content" position="popper" :side-offset="4">
        <ComboboxViewport>
          <ComboboxEmpty class="v-combobox__empty">No results</ComboboxEmpty>
          <ComboboxItem
            v-for="option in options"
            :key="option.value"
            class="v-combobox__item"
            :value="option.value"
          >
            {{ option.label }}
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
