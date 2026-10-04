# VTextField

## Semantics

- Native `input` with `type` limited to text, email, password, search, tel, url.
- Wrapped by VField; no ARIA roles added.
- `autocomplete` is a typed prop to support WCAG 1.3.5.

## Name and description

- Name from the VField label, description from VField description and error.
- Remaining attributes (`name`, `maxlength`, `inputmode`, ...) go to the input.

## Keyboard

- Native text input behavior only.

## States

- `required` and `disabled` use the native attributes.
- `aria-invalid="true"` when `error` is non-empty; border switches to `--v-color-danger`.
- Focus ring comes from the base `:focus-visible` rule.
- Placeholder uses `--v-color-text-muted` and is never the only label.

## Forced colors and zoom

- Border switches to `FieldText`, disabled to `GrayText`.
- Width is 100% of the container; height is the 44px medium control height.

## Automated coverage

- tests/text-field.test.ts: labelling, v-model, type and autocomplete, attribute forwarding, description and error wiring, required, disabled.
- tokens contrast tests cover text, muted text, border and danger on the surface.

## Manual verification

- [ ] Screen readers announce label, required, description, invalid and error.
- [ ] Password managers and browser autofill recognise email, password and similar fields.
- [ ] Forced colors: border visible in all states, focus ring visible.
- [ ] 200% zoom and 400% reflow with long labels and errors.
- [ ] Keyboard: Tab order, focus ring visible on every theme and accent.
- [ ] Mobile: correct on-screen keyboard per type.
