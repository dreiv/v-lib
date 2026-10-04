# VTextArea

## Semantics

- Native `textarea` wrapped by VField; no ARIA roles added.
- `autocomplete` is a typed prop.

## Name and description

- Name from the VField label, description from VField description and error.
- Remaining attributes (`name`, `rows`, `maxlength`, ...) go to the textarea.

## Keyboard

- Native multi-line behavior only. Tab moves focus out; no focus trap.

## States

- `required` and `disabled` use the native attributes.
- `aria-invalid="true"` when `error` is non-empty; border switches to `--v-color-danger`.
- Focus ring comes from the base `:focus-visible` rule.
- Vertical resize only, so the control cannot grow wider than its container.

## Forced colors and zoom

- Border switches to `FieldText`, disabled to `GrayText`.
- Minimum height is two medium control heights; text reflows at 200% and 400% zoom.

## Automated coverage

- tests/text-area.test.ts: labelling, v-model, placeholder and autocomplete, attribute forwarding, description and error wiring, required, disabled.
- Storybook a11y addon on the VTextArea stories.

## Manual verification

- [ ] Screen readers announce label, required, description, invalid and error.
- [ ] Resize handle usable with mouse and touch; keyboard users are not blocked.
- [ ] Forced colors: border visible in all states, focus ring visible.
- [ ] 200% zoom and 400% reflow with long labels, errors and content.
- [ ] Mobile: on-screen keyboard does not hide the error or the field.
