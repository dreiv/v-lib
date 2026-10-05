# VAutocomplete

## Role

- Input with `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded` and `aria-controls`; popup `role="listbox"`; suggestions `role="option"`.
- There is no trigger button.
- The value is the text in the input, whether or not it matches a suggestion.

## Name source

- The VField label.

## Description source

- VField description and error through `aria-describedby`; `aria-invalid` when `error` is set.

## Keyboard commands

- Provided by Reka UI: typing opens the list and filters it, Arrow keys move through suggestions, Enter selects, Escape closes.

## Focus entry

- Tab.

## Focus movement

- DOM focus stays on the input; the highlighted suggestion is exposed with `aria-activedescendant`.

## Focus exit

- Tab or Shift+Tab; the list closes.

## Focus restoration

- Focus stays on the input when the list closes.

## Announcements

- The highlighted suggestion is announced through `aria-activedescendant`.
- The list is hidden when nothing matches; no count or empty message is announced.

## Required consumer content

- A `label`.
- An `autocomplete` token on the input when the field collects personal data; the default is `off`.

## WCAG mapping

- 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions: native label association.
- 3.3.1 Error Identification: the error is text, referenced by `aria-describedby`, with `aria-invalid`.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: covered by the tokens contrast tests.
- 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum): base `:focus-visible` rule; sticky overlays are the app’s responsibility.
- 2.5.8 Target Size (Minimum): 44px medium control height.
- 1.3.5 Identify Input Purpose: pass `autocomplete` as an attribute; it overrides the default `off`.
- 2.1.1 Keyboard: Reka UI.
- 4.1.3 Status Messages: see the known limitations.

## Automated tests

- e2e/autocomplete.spec.ts (Chromium): suggestions, keyboard pick, typed text kept, no list when nothing matches.
- tests/autocomplete.test.ts: label association, combobox role, model as free text, filtering, choosing a suggestion, no match, attribute forwarding, description and error wiring, required, disabled, id.

## Manual tests

- [ ] Screen readers announce expanded state and the active suggestion.
- [ ] Keyboard-only run through type, move, select and dismiss.
- [ ] IME composition (Japanese, Chinese) does not open or filter prematurely.
- [ ] Focus ring is visible on the anchor in every theme and accent.
- [ ] Forced colors and 200% zoom.
- [ ] Touch: list position near the viewport edge and with the on-screen keyboard.
- [ ] Screen readers announce label, required, description, invalid state and error on focus.
- [ ] An error that appears while the control is focused is announced.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Suggestions are plain strings, filtered by Reka UI (case and diacritics insensitive contains).
- No remote search, custom filter, groups or virtualization.
- Browser autocomplete is off by default so the two lists do not overlap.
- No result count is announced to screen readers.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI ~2.10.5 (2.10.5 installed).
