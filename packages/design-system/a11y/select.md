# VSelect

## Role

- Native `select` wrapped by VField; no ARIA roles added.
- The first `option` has an empty value and represents no selection (`null` model); its text is the `placeholder` prop or empty.

## Name source

- The VField label.

## Description source

- VField description and error.

## Keyboard commands

- Native: arrow keys and typing change the selection, Space, Enter and Alt+Down open the list, Tab moves on.

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
- The selected option is announced by the user agent.

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

- tests/select.test.ts: labelling, empty option, null and string model, emitted values, id, attribute forwarding, description and error wiring, required, disabled.
- Storybook a11y addon on the VSelect stories.

## Manual tests

- [ ] A blank empty option is announced acceptably when no `placeholder` is given.
- [ ] Mobile: the native picker opens on iOS and Android.
- [ ] Browser autofill for `autocomplete` values such as `country`.
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

- The arrow and the option list are drawn by the user agent and cannot be styled.
- Long option labels are clipped by the native control.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
