# VButton

## Role

- Native `button`, `type="button"` by default.

## Name source

- Slot content, or `aria-label` passed as an attribute.
- A pending button keeps its label in the DOM (visually transparent behind the spinner), so the name does not change.

## Description source

- None by default; `aria-describedby` passed as an attribute.

## Keyboard commands

- Native: Enter and Space activate, Tab focuses.

## Focus entry

- Tab.

## Focus movement

- Native: none.

## Focus exit

- Tab or Shift+Tab.

## Focus restoration

- Not applicable.

## Announcements

- `pending` sets `aria-disabled="true"` and `aria-busy="true"` (not native `disabled`). The button makes no live announcement, and the spinner is presentational (no role, no label) and scales with the button `size`, so progress is not announced.
- A consumer `aria-disabled` (`"true"` or `true`) also blocks clicks and form submission, independent of `pending`. The rendered attribute is read at click time, so `"false"` and `false` do not block.
- `aria-pressed` passed as an attribute renders a heavier fill and an inner ring, so the state does not depend on colour alone.

## Required consumer content

- Visible text or an `aria-label`; visible text should say what happens.
- A status message outside the button when `pending` matters (an always-present `role="status"` element, as in the SaveChanges story).
- `@v/design-system/styles` imported once; the `v-items-center`, `v-justify-center` and `v-gap-2` utilities come from it.

## WCAG mapping

- 4.1.2 Name, Role, Value: native element.
- 1.4.3 Contrast (Minimum):
  - Primary, danger, secondary: the label is `contrast-color()` of the fill (black or white, never below about 4.58:1 by the WCAG 2 formula).
  - Primary and danger: hover and press mix toward the opposite of the label, which only raises the ratio.
  - Secondary: hover and press mix the label into the fill, lowering a high starting ratio. Tokens tests assert 4.5:1 on the muted surface and one hover overlay.
  - Quiet: the label is `--v-color-text-accent`, asserted at 4.5:1 on the surface and under one hover overlay. Quiet mixes up to 3× the hover share (2.5× when `aria-pressed`), which is more than tested.
  - Tokens tests check token pairs, not the rendered button, so computed fills and labels are not asserted.
- 1.4.11 Non-text Contrast: the secondary border uses `--v-color-border`, asserted at 3:1. Primary, danger and quiet have a transparent border and are identified by their label; no automated check covers their fill against the page.
- 1.4.1 Use of Color: pressed adds an inner ring and a heavier fill.
- 1.4.10 Reflow, 1.4.12 Text Spacing: minimum (not fixed) block size; the label wraps (`overflow-wrap: anywhere`, balanced).
- 2.4.7 Focus Visible: base `:focus-visible` rule.
- 2.5.8 Target Size (Minimum): medium and large are at least 44px tall. Small is 2rem, with an invisible `::after` extending the hit area to medium height (both axes when narrower, e.g. icon-only).
- 2.3.3 Animation from Interactions: press scale only under `prefers-reduced-motion: no-preference`; other transitions use duration tokens, which reduced motion sets to zero.

## Browser requirements and modes

- Latest Chrome, Edge, Firefox and Safari only. Requires `contrast-color()` (Chrome/Edge 147, Firefox 146, Safari 26), oklch `color-mix()` and a registered `@property`.
- No fallback: without `contrast-color()` the declarations are invalid at computed-value time, so the label should fall back to the inherited text colour and the fill be dropped (expected from the CSS, not tested).
- Forced colors: `ButtonText` on `ButtonFace`. Variants differ by border: secondary 1px, primary 2px, danger 3px double; quiet is underlined. Hover and press use `Highlight`, pressed adds a `ButtonText` ring, disabled is `GrayText` with a dashed border.
- `prefers-contrast: more`: every variant except quiet gets a 2px `currentColor` border.
- Reduced motion: see 2.3.3.

## Automated tests

- tests/button.test.ts: element, type, default variant and size, data attributes, attribute forwarding (including `aria-pressed`), pending state (spinner, spinner size follows button size, no extra status role, label kept), click suppression and form submission (pending and consumer `aria-disabled` as string and boolean; `"false"`, `false` and idle buttons go through).
- Storybook a11y addon on the VButton stories.
- Button-only fixture: bundle contains only VButton and stays under budget (JS 42 kB gzip, CSS 2 kB gzip; measured 40.0 kB and 1.65 kB). The fixture does not import the global styles.

## Manual tests

- [ ] A focused button that becomes pending keeps focus.
- [ ] Where focus goes when a focused button becomes natively `disabled`, per browser.
- [ ] Screen readers announce the busy state, and progress via the outside status message.
- [ ] Real Windows High Contrast: four variants distinguishable, disabled dashed, pressed ring visible.
- [ ] `prefers-contrast: more`: non-quiet variants show a 2px border.
- [ ] Contrast of every variant (quiet at hover and pressed too) with Windows and macOS accent colors, light and dark.
- [ ] Built CSS still contains `contrast-color(`.
- [ ] A pending button at each size: the spinner is centred, the button keeps its size and the spinner stays visible in forced colors.
- [ ] Small buttons: extended hit area works; neighbours closer than about 12px overlap.
- [ ] 200% zoom and 400% reflow with a long label.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- A pending button uses `aria-disabled` rather than native `disabled`, so it stays focusable and in the tab order; screen-reader support for `aria-disabled` on buttons is inconsistent.
- No fallback for browsers without `contrast-color()`.
- Quiet hover and pressed contrast is not asserted by any test.
- Small-button hit areas can overlap a neighbour closer than about 12px; the later button in the DOM wins.
- The global styles must be loaded, or the label is not centred and gaps are missing.

## Verification date

Pending. Automated tests only; no manual verification done. Last reviewed against the CSS and tests on 2026-10-17.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
