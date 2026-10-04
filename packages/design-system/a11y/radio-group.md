# VRadioGroup

## Semantics

- Native `fieldset` with `role="radiogroup"` and a `legend`, containing native `input[type=radio]` elements inside labels.
- All radios share one `name`: the `name` prop, or a generated id.
- `aria-invalid` is set on the group, where it is supported; it is not set on individual radios.

## Name and description

- Accessible name: legend text.
- Group description: description id, then error id, omitted when neither exists.
- Each radio is named by its option label.

## Keyboard

- Native: Tab enters the group, arrow keys move and select, Space selects the focused radio.

## States

- `required` is set on every radio; the group `disabled` uses the native fieldset attribute.
- Nothing is selected for a `null` model.
- Focus ring comes from the base `:focus-visible` rule.
- Each option row is at least the medium control height (44px).

## Forced colors and zoom

- Native radios follow forced colors.
- Legend, description and error use system colors through tokens.

## Automated coverage

- tests/radio-group.test.ts: structure, shared name, model, emitted value, description and error wiring, required, disabled, unique names per group.
- Storybook a11y addon on the VRadioGroup stories.

## Manual verification

- [ ] Screen readers announce legend, description, option position, checked state and error when entering the group.
- [ ] `role="radiogroup"` on a `fieldset` behaves the same as a plain fieldset in NVDA, JAWS and VoiceOver.
- [ ] Arrow-key behavior with a null model and with a preselected option.
- [ ] Forced colors: selected and unselected radios are distinguishable.
- [ ] 200% zoom and 400% reflow with long legends and option labels.
