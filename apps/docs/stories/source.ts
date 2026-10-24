/**
 * Static source for the "Show code" button of a docs block.
 *
 * Stories here render through `template` strings that carry docs-only scaffolding, so the source
 * Storybook generates from them is that scaffolding. This points the block at the snippet a
 * reader would actually copy.
 */
export const source = (code: string, language = 'html') => ({
  docs: { source: { code: code.trim(), language } },
})
