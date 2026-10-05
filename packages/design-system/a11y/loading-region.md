# VLoadingRegion

## Role

- A `div` that has `aria-busy="true"` while `loading`.
- Inside it a `span` with `role="status"` that is always in the DOM and holds the label text only while loading.

## Name source

- The required `label` prop, as hidden text in the status.

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

- The label is announced politely when `loading` becomes true, because the status region already exists.
- Nothing is announced when loading ends; the app announces the result itself if it matters.

## Required consumer content

- A `label` in the page language ("Loading orders").
- Content that stays valid while it is dimmed.

## WCAG mapping

- 4.1.3 Status Messages: persistent status region.
- 1.1.1 Non-text Content: label for the mark.
- 2.3.3 Animation from Interactions: the mark stops under `prefers-reduced-motion`.

## Automated tests

- tests/spinner.test.ts: content kept, busy state, persistent status, label announced, cleared when loading ends.

## Manual tests

- [ ] The label is announced when loading starts, in NVDA, JAWS and VoiceOver.
- [ ] Screen readers that ignore `aria-busy` still read the stale content; check the result is acceptable.
- [ ] The dimmed content has enough contrast while loading.
- [ ] Forced colors and reduced motion.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- The content stays focusable and operable while loading; the app disables actions that must not run.
- No skeleton or progress variants.
- `aria-busy` is ignored by several screen readers.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
