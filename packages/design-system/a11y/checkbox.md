# VCheckbox

## Semantics

- Native `input[type=checkbox]` inside its `label`, so the whole row is the click target.
- Description and error are `p` elements referenced by `aria-describedby`.
- The required asterisk is `aria-hidden`; requiredness comes from the native `required` attribute.

## Name and description

- Accessible name: label text.
- Accessible description: description id, then error id, omitted when neither exists.
- Remaining attributes (`name`, `value`, ...) go to the input.

## Keyboard

- Native: Space toggles, Tab focuses.

## States

- `required` and `disabled` use the native attributes.
- `aria-invalid="true"` when `error` is non-empty; the error is conveyed as text, not color alone.
- Focus ring comes from the base `:focus-visible` rule.
- Indicator size is `--v-control-indicator`; the row is at least the medium control height (44px).

## Forced colors and zoom

- The native control and `accent-color` are rendered by the user agent and follow forced colors.
- Label wraps; description and error stay aligned to the label at any width.

## Automated coverage

- tests/checkbox.test.ts: structure, v-model, attribute forwarding, description and error wiring, required, disabled.
- Storybook a11y addon on the VCheckbox stories.

## Manual verification

- [ ] Screen readers announce name, checked state, required, description and error.
- [ ] Checked and unchecked states are distinguishable in forced colors and with every accent color.
- [ ] Focus ring is visible against the row on all themes.
- [ ] 200% zoom and 400% reflow with long labels.
- [ ] Touch: the whole row toggles the control.
