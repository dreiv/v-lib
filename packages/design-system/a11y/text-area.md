# VTextArea

## Role

- Native `textarea` wrapped by VField; no ARIA roles added.
- `autocomplete` is a typed prop.
- `field-sizing: content` lets the box grow with what's typed, up to a
  `max-block-size` cap (then it scrolls internally). Where the property
  isn't supported, the field falls back to its original fixed min height
  plus a manual vertical resize handle (`@supports` guarded).

## Name source

- The VField label.

## Description source

- VField description and error.

## Keyboard commands

- Native multi-line behavior only. Tab moves focus out; no focus trap.
- No drag-to-resize affordance is exposed to the keyboard in browsers
  without `field-sizing` support, but the content-driven growth in
  supporting browsers removes most of the need to resize manually in the
  first place: the field expands as the person types.

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
- Growing the box via `field-sizing: content` is a layout change only; it is not announced, and doesn't need to be, since the content itself (what the person just typed) is already in the accessibility tree.

## Required consumer content

- A visible, meaningful `label`.
- The same error message passed to the field `error` prop and to VErrorSummary.

## WCAG mapping

- 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions: native label association.
- 3.3.1 Error Identification: the error is text, referenced by `aria-describedby`, with `aria-invalid`.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: covered by the tokens contrast tests.
- 1.4.10 Reflow: automatic growth is one-dimensional (block-size only) and capped at `max-block-size` with `overflow-y: auto`, so long content scrolls inside the field instead of forcing two-dimensional page scrolling.
- 2.1.1 Keyboard: content-driven growth means a keyboard-only user rarely needs to resize the field by hand to see what they've written; where `field-sizing` isn't supported, the pre-existing mouse-only resize handle remains a known limitation (see below).
- 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum): base `:focus-visible` rule; sticky overlays are the app's responsibility.
- 2.5.8 Target Size (Minimum): 44px medium control height.

## Automated tests

- tests/text-area.test.ts: labelling, v-model, placeholder and autocomplete, attribute forwarding, description and error wiring, required, disabled.
- Storybook a11y addon on the VTextArea stories.
- `field-sizing`/`max-block-size` are layout-only CSS and aren't asserted by jsdom-based unit tests; verify visually in Storybook or with the manual tests below.

## Manual tests

- [ ] Typing past the initial two rows grows the field instead of scrolling, in a browser that supports `field-sizing: content`.
- [ ] Pasting a very long block of text stops growing at `max-block-size` and scrolls inside the field, without the page gaining horizontal scroll.
- [ ] In a browser without `field-sizing` support, the manual vertical resize handle still works, with mouse and touch; keyboard users are not blocked from reading or editing the content.
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

- In browsers without `field-sizing: content` support, resize is manual and vertical-only, via mouse or touch drag.
- `max-block-size: 60vh` is a fixed cap; it isn't configurable per instance yet.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
