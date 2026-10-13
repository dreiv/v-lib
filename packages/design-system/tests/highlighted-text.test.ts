import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vite-plus/test'
import { VHighlightedText } from '../src/shared/highlighted-text'

describe('VHighlightedText', () => {
  test('renders plain text when term is empty', () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'Romania', term: '' } })
    expect(wrapper.text()).toBe('Romania')
    expect(wrapper.find('mark').exists()).toBe(false)
  })

  test('renders plain text when term is only whitespace', () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'Romania', term: '   ' } })
    expect(wrapper.find('mark').exists()).toBe(false)
  })

  test('wraps the matching substring in a mark', () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'Romania', term: 'man' } })
    const mark = wrapper.get('mark')
    expect(mark.text()).toBe('man')
    expect(mark.classes()).toContain('v-highlighted-text__match')
    expect(wrapper.text()).toBe('Romania')
  })

  test('matches case-insensitively but preserves the original casing', () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'Romania', term: 'ROMAN' } })
    expect(wrapper.get('mark').text()).toBe('Roman')
  })

  test('renders plain text when there is no match', () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'Romania', term: 'xyz' } })
    expect(wrapper.find('mark').exists()).toBe(false)
    expect(wrapper.text()).toBe('Romania')
  })

  test('highlights only the first occurrence', () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'banana', term: 'an' } })
    expect(wrapper.findAll('mark')).toHaveLength(1)
    expect(wrapper.text()).toBe('banana')
  })

  test('highlights the full text when the term matches it entirely', () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'Romania', term: 'Romania' } })
    expect(wrapper.get('mark').text()).toBe('Romania')
  })

  test('updates the highlight when props change', async () => {
    const wrapper = mount(VHighlightedText, { props: { text: 'Romania', term: 'Rom' } })
    expect(wrapper.get('mark').text()).toBe('Rom')
    await wrapper.setProps({ term: 'nia' } as any)
    expect(wrapper.get('mark').text()).toBe('nia')
  })
})
