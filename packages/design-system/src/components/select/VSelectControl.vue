<script setup lang="ts">
import { computed } from 'vue'
import { useFieldContext } from '../field/field.context'
import type { VSelectOption, VSelectOptionGroup } from './select.types'

defineOptions({ inheritAttrs: false })

const { options, placeholder = '' } = defineProps<{
  options: (VSelectOption | VSelectOptionGroup)[]
  placeholder?: string
}>()

const model = defineModel<string | null>({ default: null })
const { id, describedby, invalid, required, disabled } = useFieldContext()

const value = computed({
  get: () => model.value ?? '',
  set: (next) => {
    model.value = next === '' ? null : next
  },
})

function isGroup(entry: VSelectOption | VSelectOptionGroup): entry is VSelectOptionGroup {
  return 'options' in entry
}
</script>

<template>
  <span class="v-select-wrap">
    <select
      :id="id"
      v-model="value"
      v-bind="$attrs"
      class="v-field__control v-select"
      :required="required"
      :disabled="disabled"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedby"
    >
      <option value="">{{ placeholder }}</option>
      <template v-for="entry in options" :key="isGroup(entry) ? entry.label : entry.value">
        <optgroup v-if="isGroup(entry)" :label="entry.label">
          <option v-for="option in entry.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </optgroup>
        <option v-else :value="entry.value">{{ entry.label }}</option>
      </template>
    </select>
  </span>
</template>
