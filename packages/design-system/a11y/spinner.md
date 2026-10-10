# VSpinner

## Role

- A `span` with `role="status"` containing a decorative svg and a visually hidden label.

## Name source

- The required `label` prop, as hidden text.

## Description source

- None.

## Keyboard commands

- None; the component is not interactive.

## Focus entry

- Not focusable.

## Focus movement

- Not applicable.

## Focus exit

- Not applicable.

## Focus restoration

- Not applicable.

## Announcements

- The label is announced politely when the spinner is inserted; support for live regions that appear with their content already inside varies.
- The svg is `aria-hidden`.

## Required consumer content

- A `label` in the page language that says what is loading ("Loading orders").

## Usage guidance

- Do not conditionally mount `VSpinner` on its own (`v-if`) to signal a loading state. A fresh `role="status"` node that appears already populated is exactly the "varies" case noted above: some AT never announce it because the region wasn't being observed before the content showed up. Use `VLoadingRegion` instead — it keeps the `role="status"` node in the DOM the whole time and only toggles its text and `aria-busy`, which is what 4.1.3 actually requires.
- `label` is optional on `VSpinner` only for the decorative mark rendered inside a region that already owns the status announcement itself (e.g. inside `VLoadingRegion`). A standalone, always-visible `VSpinner` should still get a `label`.

## WCAG mapping

- 1.1.1 Non-text Content: text alternative through the label.
- 2.2.2 Pause, Stop, Hide: a loading indicator is essential to the activity it reports.
- 1.4.11 Non-text Contrast: accent ink on the surface, tokens contrast tests.
- 2.3.3 Animation from Interactions: the rotation stops under `prefers-reduced-motion`.
- 4.1.3 Status Messages: the `role="status"` node, kept persistently mounted via `VLoadingRegion` for appear/disappear cases, exposes the message without moving focus.

## Automated tests

- tests/spinner.test.ts: role, label, hidden svg, attribute forwarding.
- Tokens tests: the spin duration is defined and overridden for reduced motion.

## Manual tests

- [ ] The label is announced when the spinner appears, in NVDA, JAWS and VoiceOver.
- [ ] With reduced motion on, the mark is static and still visible.
- [ ] Forced colors: the mark is visible.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- One size.
- The visually hidden class comes from the global styles; import `@v/design-system/styles` once in the app.
- A spinner does not show progress.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
