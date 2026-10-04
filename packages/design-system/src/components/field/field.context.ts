import { inject, provide, type InjectionKey } from 'vue'
import type { VFieldContext } from './field.types'

const key: InjectionKey<VFieldContext> = Symbol('v-field')

export function provideFieldContext(context: VFieldContext) {
  provide(key, context)
}

export function useFieldContext() {
  const context = inject(key, null)
  if (!context) throw new Error('useFieldContext must be used inside VField')
  return context
}
