# VRadioGroup

## Role

- Native `fieldset` with `role="radiogroup"` and a `legend`, containing native radios inside labels.
- All radios share one `name`: the `name` prop or a generated id.
- `aria-invalid` is set on the group, not on individual radios.

## Name source

- Group: legend text.
- Each radio: its option label.

## Description source

- Group: description id, then error id, omitted when neither exists.
- The `id` prop (or a generated id) is set on the first radio so a VErrorSummary link can focus the group.

## Keyboard commands

- Native: Tab enters the group, arrow keys move and select, Space selects the focused radio.

## Focus entry

- Tab focuses the checked radio, or the first radio when nothing is selected.

## Focus movement

- Arrow keys.

## Focus exit

- Tab or Shift+Tab.

## Focus restoration

- Not applicable.

## Announcements

- Legend, description, option position, checked state and error are read when entering the group.

## Required consumer content

- A `label` (the legend).
- The same error message passed to the field `error` prop and to VErrorSummary.

## WCAG mapping

- 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions: native label association.
- 3.3.1 Error Identification: the error is text, referenced by `aria-describedby`, with `aria-invalid`.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: covered by the tokens contrast tests.
- 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum): base `:focus-visible` rule; sticky overlays are the app’s responsibility.
- 2.5.8 Target Size (Minimum): 44px medium control height.

## Automated tests

- tests/radio-group.test.ts: structure, shared name, model, emitted value, description and error wiring, required, disabled, unique names per group.
- Storybook a11y addon on the VRadioGroup stories.

## Manual tests

- [ ] `role="radiogroup"` on a `fieldset` behaves the same as a plain fieldset in NVDA, JAWS and VoiceOver.
- [ ] Arrow-key behavior with a null model and with a preselected option.
- [ ] Forced colors: selected and unselected radios are distinguishable.
- [ ] 200% zoom and 400% reflow with long legends and option labels.
- [ ] Screen readers announce label, required, description, invalid state and error on focus.
- [ ] An error that appears while the control is focused is announced.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Options are `{ value, label }` only.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
