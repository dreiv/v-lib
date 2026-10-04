# VButton

## Semantics

- Native `button`, `type="button"` by default.

## Name and description

- Name from slot content or `aria-label` passed as an attribute.

## Keyboard

- Native: Enter and Space activate, Tab focuses.

## States

- `disabled` uses the native attribute.
- `pending` sets `disabled` and `aria-busy="true"`.
- Focus ring comes from the base `:focus-visible` rule.

## Forced colors and zoom

- Border switches to `ButtonText`, disabled to `GrayText`.
- Minimum height follows the control height tokens (44px at medium).

## Automated coverage

- tests/button.test.ts: element, type, data attributes, attribute forwarding, pending.

## Manual verification

- [ ] Focus handling when a focused button becomes pending (disabled) in each browser.
- [ ] Screen readers announce busy state.
- [ ] Forced colors: all variants distinguishable and bordered.
- [ ] Contrast of every variant with Windows and macOS accent colors.
