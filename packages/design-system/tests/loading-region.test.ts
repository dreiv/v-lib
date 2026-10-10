import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { defineComponent, h, nextTick, ref } from 'vue'
import { VLoadingRegion } from '../src/components/loading-region'

describe('VLoadingRegion', () => {
  test('keeps its content and is not busy by default', () => {
    const wrapper = mount(VLoadingRegion, {
      props: { label: 'Loading orders' },
      slots: { default: '<p>Orders</p>' },
    })
    expect(wrapper.get('p').text()).toBe('Orders')
    expect(wrapper.attributes('aria-busy')).toBeUndefined()
    expect(wrapper.find('svg').exists()).toBe(false)
    expect(wrapper.get('[role="status"]').text()).toBe('')
  })

  test('while loading it is busy, keeps the content and announces the label', () => {
    const wrapper = mount(VLoadingRegion, {
      props: { label: 'Loading orders', loading: true },
      slots: { default: '<p>Orders</p>' },
    })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.get('p').text()).toBe('Orders')
    expect(wrapper.get('[role="status"]').text()).toBe('Loading orders')
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
  })

  test('the status region stays in the DOM when loading ends', async () => {
    const loading = ref(true)
    const Host = defineComponent({
      render: () => h(VLoadingRegion, { label: 'x', loading: loading.value }),
    })
    const wrapper = mount(Host)
    const status = wrapper.get('[role="status"]').element
    loading.value = false
    await nextTick()
    expect(wrapper.get('[role="status"]').element).toBe(status)
    expect(wrapper.get('[role="status"]').text()).toBe('')
    expect(wrapper.get('.v-loading-region').attributes('aria-busy')).toBeUndefined()
  })
})
