<script setup lang="ts">
import { ref } from 'vue'
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
  useFilter,
} from 'reka-ui'
import { VIconChevronDown } from '@v/icons'
import { useFieldContext } from '../field/field.context'
import { VHighlightedText } from '../../shared/highlighted-text'
import { useComboboxAnnouncement } from './useComboboxAnnouncement'
import type { VComboboxOption } from './combobox.types'

const {
  options,
  triggerLabel,
  emptyText,
  placeholder,
  resultsAnnouncement = (count: number) =>
    `${count} ${count === 1 ? 'result' : 'results'} available.`,
} = defineProps<{
  options: VComboboxOption[]
  triggerLabel: string
  emptyText: string
  placeholder?: string
  resultsAnnouncement?: (count: number) => string
}>()

const model = defineModel<string | null>({ default: null })
const { id, describedby, invalid, required, disabled } = useFieldContext()

const { contains } = useFilter()

const open = ref(false)
const searchTerm = ref('')

const { announcement } = useComboboxAnnouncement({
  searchTerm,
  open,
  options: () => options,
  emptyText,
  resultsAnnouncement,
  contains,
})

function displayValue(value: unknown) {
  return options.find((option) => option.value === value)?.label ?? ''
}
</script>

<template>
  <ComboboxRoot v-model="model" v-model:open="open" :disabled="disabled">
    <ComboboxAnchor
      class="v-field__control v-combobox__anchor v-items-center"
      :data-invalid="invalid || undefined"
      :data-disabled="disabled || undefined"
    >
      <ComboboxInput
        :id="id"
        v-model="searchTerm"
        class="v-combobox__input"
        :placeholder="placeholder"
        :display-value="displayValue"
        autocomplete="off"
        :required="required"
        :aria-required="required || undefined"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedby"
      />
      <ComboboxTrigger
        class="v-combobox__trigger v-items-center v-justify-center"
        :aria-label="triggerLabel"
      >
        <VIconChevronDown aria-hidden="true" />
      </ComboboxTrigger>
    </ComboboxAnchor>
    <ComboboxPortal>
      <ComboboxContent class="v-popup v-combobox__content" position="popper" :side-offset="4">
        <ComboboxViewport>
          <ComboboxEmpty class="v-popup__empty">{{ emptyText }}</ComboboxEmpty>
          <ComboboxItem
            v-for="option in options"
            :key="option.value"
            class="v-popup__item v-items-center"
            :value="option.value"
          >
            <VHighlightedText :text="option.label" :term="searchTerm" />
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
    <span class="v-visually-hidden" role="status" aria-live="polite">{{ announcement }}</span>
  </ComboboxRoot>
</template>
