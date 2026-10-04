<script setup lang="ts">
import { useId } from 'vue'
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
import type { VComboboxProps } from './combobox.types'

const { label, options, placeholder, disabled = false } = defineProps<VComboboxProps>()

const model = defineModel<string | null>({ default: null })
const id = useId()

function displayValue(value: unknown) {
  return options.find((option) => option.value === value)?.label ?? ''
}
</script>

<template>
  <div class="v-combobox">
    <label class="v-combobox__label" :for="id">{{ label }}</label>
    <ComboboxRoot v-model="model" :disabled="disabled">
      <ComboboxAnchor class="v-combobox__anchor">
        <ComboboxInput
          :id="id"
          class="v-combobox__input"
          :placeholder="placeholder"
          :display-value="displayValue"
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
  </div>
</template>
