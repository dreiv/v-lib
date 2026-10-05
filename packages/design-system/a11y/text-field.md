# VTextField

## Role

- Native `input` with `type` limited to text, email, password, search, tel, url.
- `autocomplete` is a typed prop to support WCAG 1.3.5.

## Name source

- The VField label.

## Description source

- VField description and error.

## Keyboard commands

- Native text input behavior only.

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
- An `autocomplete` token on fields that collect personal data.

## WCAG mapping

- 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions: native label association.
- 3.3.1 Error Identification: the error is text, referenced by `aria-describedby`, with `aria-invalid`.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: covered by the tokens contrast tests.
- 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum): base `:focus-visible` rule; sticky overlays are the app’s responsibility.
- 2.5.8 Target Size (Minimum): 44px medium control height.
- 1.3.5 Identify Input Purpose: typed `autocomplete` prop.

## Automated tests

- tests/text-field.test.ts: labelling, v-model, type and autocomplete, attribute forwarding, description and error wiring, required, disabled.
- Tokens contrast tests for text, muted text, border and danger on the surface.

## Manual tests

- [ ] Password managers and browser autofill recognise email, password and similar fields.
- [ ] Mobile: correct on-screen keyboard per type.
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

- The placeholder is never the only label.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
