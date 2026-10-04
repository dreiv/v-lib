# VSelect

## Semantics

- Native `select` wrapped by VField; no ARIA roles added.
- The first `option` has an empty value and represents no selection (`null` model). Its text is the `placeholder` prop, or empty.

## Name and description

- Name from the VField label, description from VField description and error.
- Remaining attributes (`name`, `autocomplete`, ...) go to the select.

## Keyboard

- Native: arrow keys and typing change the selection, Space, Enter and Alt+Down open the list, Tab moves on.

## States

- `required` and `disabled` use the native attributes.
- `aria-invalid="true"` when `error` is non-empty; border switches to `--v-color-danger`.
- Focus ring comes from the base `:focus-visible` rule.
- Height is the 44px medium control height; the arrow and the option list are drawn by the user agent.

## Forced colors and zoom

- Border switches to `FieldText`, disabled to `GrayText`.
- Width is 100% of the container; long option labels are clipped by the native control and shown in full in the list.

## Automated coverage

- tests/select.test.ts: labelling, empty option, null and string model, emitted values, id, attribute forwarding, description and error wiring, required, disabled.
- Storybook a11y addon on the VSelect stories.

## Manual verification

- [ ] Screen readers announce label, required, description, invalid, error and the selected option.
- [ ] A blank empty option is announced acceptably when no `placeholder` is given.
- [ ] Forced colors: border and focus ring visible in all states.
- [ ] 200% zoom and 400% reflow with long labels and long option text.
- [ ] Mobile: the native picker opens on iOS and Android.
- [ ] Browser autofill for `autocomplete` values such as `country`.
