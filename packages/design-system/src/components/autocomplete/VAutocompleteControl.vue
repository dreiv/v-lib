<script setup lang="ts">
import {
  AutocompleteAnchor,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompletePortal,
  AutocompleteRoot,
  AutocompleteViewport,
} from 'reka-ui'
import { useFieldContext } from '../field/field.context'

defineOptions({ inheritAttrs: false })

const { suggestions, placeholder } = defineProps<{
  suggestions: string[]
  placeholder?: string
}>()

const model = defineModel<string>({ default: '' })
const { id, describedby, invalid, required, disabled } = useFieldContext()
</script>

<template>
  <AutocompleteRoot v-model="model" :disabled="disabled">
    <AutocompleteAnchor
      class="v-field__control v-combobox__anchor"
      :data-invalid="invalid || undefined"
      :data-disabled="disabled || undefined"
    >
      <AutocompleteInput
        autocomplete="off"
        v-bind="$attrs"
        :id="id"
        class="v-combobox__input"
        :placeholder="placeholder"
        :required="required"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedby"
      />
    </AutocompleteAnchor>
    <AutocompletePortal>
      <AutocompleteContent
        class="v-popup v-combobox__content"
        position="popper"
        hide-when-empty
        :side-offset="4"
      >
        <AutocompleteViewport>
          <AutocompleteItem
            v-for="suggestion in suggestions"
            :key="suggestion"
            class="v-popup__item"
            :value="suggestion"
          >
            {{ suggestion }}
          </AutocompleteItem>
        </AutocompleteViewport>
      </AutocompleteContent>
    </AutocompletePortal>
  </AutocompleteRoot>
</template>
