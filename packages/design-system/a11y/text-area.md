# VTextArea

## Role

- Native `textarea` wrapped by VField; no ARIA roles added.
- `autocomplete` is a typed prop.

## Name source

- The VField label.

## Description source

- VField description and error.

## Keyboard commands

- Native multi-line behavior only. Tab moves focus out; no focus trap.

## Focus entry

- Tab.

## Focus movement

- Native: none.

## Focus exit

- Tab or Shift+Tab.

## Focus restoration

- Not applicable.

## Announcements

- Label, required state, description, invalid state and error are read from the native attributes when the control gains focus.
- A new error while the control is focused is not announced by `aria-describedby` alone.

## Required consumer content

- A visible, meaningful `label`.
- The same error message passed to the field `error` prop and to VErrorSummary.

## WCAG mapping

- 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions: native label association.
- 3.3.1 Error Identification: the error is text, referenced by `aria-describedby`, with `aria-invalid`.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: covered by the tokens contrast tests.
- 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum): base `:focus-visible` rule; sticky overlays are the app’s responsibility.
- 2.5.8 Target Size (Minimum): 44px medium control height.

## Automated tests

- tests/text-area.test.ts: labelling, v-model, placeholder and autocomplete, attribute forwarding, description and error wiring, required, disabled.
- Storybook a11y addon on the VTextArea stories.

## Manual tests

- [ ] Resize handle usable with mouse and touch; keyboard users are not blocked.
- [ ] Mobile: the on-screen keyboard does not hide the error or the field.
- [ ] Screen readers announce label, required, description, invalid state and error on focus.
- [ ] An error that appears while the control is focused is announced.
- [ ] Forced colors: border and focus ring visible in all states.
- [ ] 200% zoom and 400% reflow with long labels and errors.
- [ ] Keyboard: Tab order, focus ring visible on every theme and accent.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Vertical resize only.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
