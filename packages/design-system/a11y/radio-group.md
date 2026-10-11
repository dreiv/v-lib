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
- The error message carries `role="alert"` so it is announced the moment it appears, even if focus is already inside the group and `aria-describedby` alone would not re-trigger a read.

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

## Focus indicator

- The ring is drawn on the whole option row (`.v-radio-group__option:has(:focus-visible)`), not on the radio circle itself. A ring placed directly on a `border-radius: 50%` control is itself rounded by the browser's outline-follows-border-radius behavior, which produces a ring hugging a filled dot — a bullseye. Ringing the row instead gives a bigger, unambiguous indicator and also visually communicates the true (larger) click target.

## Announcements

- Legend, description, option position, checked state and error are read when entering the group.

## Required consumer content

- A `label` (the legend).
- The same error message passed to the field `error` prop and to VErrorSummary.

## WCAG mapping

- 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions: native label association.
- 3.3.1 Error Identification: the error is text, referenced by `aria-describedby`, with `aria-invalid`.
- 4.1.3 Status Messages: error text has `role="alert"` so a newly-appearing error is announced without requiring a focus change.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: the radio's border and fill now come directly from `--v-color-border` and `--v-color-accent-ink` (via `appearance: none` + custom styling), the same tokens the contrast test suite checks, rather than being left to the browser's unchecked-state default. In `forced-colors` mode the custom styling is dropped (`appearance: auto`) and the control reverts to the OS-rendered radio.
- 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum): focus ring on the option row via `:has(:focus-visible)`.
- 2.5.8 Target Size (Minimum): 44px medium control height, full-width label as the actual hit target (the visible 20px circle is smaller, but the clickable area is not).

## Automated tests

- tests/radio-group.test.ts: structure, shared name, model, emitted value, description and error wiring, error `role="alert"`, required, disabled, unique names per group.
- Storybook a11y addon on the VRadioGroup stories.

## Manual tests

- [ ] `role="radiogroup"` on a `fieldset` behaves the same as a plain fieldset in NVDA, JAWS and VoiceOver.
- [ ] Arrow-key behavior with a null model and with a preselected option.
- [ ] Forced colors: selected and unselected radios are distinguishable, and the row-level focus ring is still visible (it relies on `--v-color-focus`, which resolves to system colors but has not been checked in this mode).
- [ ] 200% zoom and 400% reflow with long legends and option labels.
- [ ] Screen readers announce label, required, description, invalid state and error on focus.
- [x] An error that appears while the control is focused is announced — fixed via `role="alert"`; still worth a manual pass per AT/browser combo since `role="alert"` support has known quirks (e.g. some VoiceOver/Safari versions).
- [ ] `:has()` focus-ring selector renders in the team's actual supported-browser matrix (broad modern support, but confirm against your baseline).

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
