# VCombobox

## Semantics

- Reka UI Combobox: input with `role="combobox"`, listbox popup, options with `role="option"`.
- Input is labelled by a native `label[for]`.
- Trigger button has `aria-label="Show options"`.

## Name and description

- Name from the VField label, description from VField description and error (describedby), `aria-invalid` when `error` is set.

## Keyboard

- Provided by Reka UI: Arrow keys move through options, Enter selects, Escape closes, typing filters.

## States

- `required` is set on the input; `disabled` is forwarded to Reka and marked on the anchor.
- Focus ring is drawn once around the whole anchor (input and trigger) with `:has(:focus-visible)`; inner controls draw no ring of their own.
- Highlighted option uses `data-highlighted`; empty state shows "No results".

## Forced colors and zoom

- Anchor ring switches to `Highlight`; highlighted option to `Highlight` and `HighlightText`.
- Popup width follows the trigger width.

## Automated coverage

- tests/combobox.test.ts: label association, combobox role, display value, description and error wiring, required, disabled, focus ring on the anchor.

## Manual verification

- [ ] Screen readers announce expanded state, option count and the active option.
- [ ] The trigger label "Show options" is localisable before release.
- [ ] Focus ring is visible on the anchor in every theme and accent, and also when the trigger button is focused by keyboard.
- [ ] Keyboard-only run through open, filter, select and dismiss.
- [ ] Forced colors and 200% zoom.
- [ ] Touch: popup position near the viewport edge and with the on-screen keyboard.
