# VCombobox

## Role

- Input with `role="combobox"`, `aria-expanded` and `aria-controls`; popup `role="listbox"`; options `role="option"`.
- The trigger is a button without its own role.

## Name source

- Input: the VField label.
- Trigger button: the required `triggerLabel` prop, set as `aria-label`.

## Description source

- VField description and error through `aria-describedby`; `aria-invalid` when `error` is set.

## Keyboard commands

- Provided by Reka UI: Arrow keys move through options, Enter selects, Escape closes, typing filters.

## Focus entry

- Tab to the input; the trigger button is also in the tab order.

## Focus movement

- DOM focus stays on the input; the highlighted option is exposed with `aria-activedescendant`.

## Focus exit

- Tab or Shift+Tab; the popup closes.

## Focus restoration

- Focus stays on the input when the popup closes.

## Announcements

- The highlighted option is announced through `aria-activedescendant`.
- The `emptyText` message is plain text in the popup and is not a live region.
- No result count is announced.

## Required consumer content

- `label`, `triggerLabel` and `emptyText`, all required so no language is hard coded.
- A localised `triggerLabel` and `emptyText` for each language.

## WCAG mapping

- 1.3.1, 3.3.2, 3.3.1, 4.1.2: field label, description and error wiring.
- 2.1.1 Keyboard: Reka UI.
- 2.4.7 Focus Visible: the ring is drawn once around the anchor with `:has(:focus-visible)`.
- 1.4.13 Content on Hover or Focus: not applicable, the popup is opened by an action.
- 2.5.8 Target Size (Minimum): trigger and options are at least 44px.
- 4.1.3 Status Messages: see the known limitations.

## Automated tests

- tests/combobox.test.ts: label association, combobox role, display value, description and error wiring, required, disabled, focus ring on the anchor, `triggerLabel`, `emptyText`.
- e2e/combobox.spec.ts (Chromium): filter, select, empty text, trigger keeps focus on the input, one ring around the anchor.
- Fixture combobox-only: bundle budget and absence checks.

## Manual tests

- [ ] Screen readers announce expanded state, option count and the active option.
- [ ] The empty message is discoverable when nothing matches.
- [ ] Focus ring is visible on the anchor in every theme and accent, including when the trigger is focused by keyboard.
- [ ] Keyboard-only run through open, filter, select and dismiss.
- [ ] Forced colors: anchor ring is `Highlight`, highlighted option is `Highlight` with `HighlightText`.
- [ ] 200% zoom and 400% reflow.
- [ ] Touch: popup position near the viewport edge and with the on-screen keyboard.
- [ ] The `:has()` focus ring when the trigger is clicked with the mouse.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Options are `{ value, label }` only; no groups, disabled options or custom rendering.
- No result count or empty state is announced to screen readers.
- Selecting requires choosing an option; free text is not a value (use VAutocomplete).

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI ~2.10.5 (2.10.5 installed).
