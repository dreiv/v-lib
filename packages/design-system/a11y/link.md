# VLink

## Role

- Native `a`; every attribute is passed through. Without `href` (or a string `to`) it is not a link; use VButton for actions.
- `to` is optional and uses vue-router when installed. VLink never imports `vue-router`.

## Name source

- Slot content, or `aria-label`.
- With `target="_blank"` and no `aria-label`, visually hidden text from the injected `link.opensInNewWindow` string is appended ("<text> (opens in new window)"). The string carries its own punctuation. `aria-label` replaces it and must contain the visible text (2.5.3).

## Description source

- None by default; `aria-describedby` passed as an attribute.

## Keyboard commands

- Native: Tab focuses, Enter activates, Shift+Tab leaves. Focus is not moved or restored on navigation; that is the app's job.

## Focus entry

- Tab.

## Focus movement

- Native: none.

## Focus exit

- Tab or Shift+Tab.

## Focus restoration

- Not applicable; navigation leaves the document.

## Announcements

- New-window links via the accessible name. No live region.
- The exact active route gets `aria-current="page"`; a consumer-supplied value wins.

## Required consumer content

- Link text that makes sense out of context.
- `aria-label` only when "opens in new window" is wrong (e.g. a download), including the visible text.
- With a sticky header, set `scroll-padding-block-start` on the scroller (2.4.11).

## Router integration

```vue
<VLink to="/terms">terms of use</VLink>
<VLink :to="{ name: 'user', params: { id } }" replace>profile</VLink>
```

- Resolves `RouterLink` from the app and uses its `useLink`: one `a`, resolved `href`, click handling, `aria-current`. Without a router a string `to` becomes `href`. `href` is ignored when `to` is set.
- Ctrl/Cmd/Shift/Alt clicks, non-primary buttons, prevented defaults and `target="_blank"` are left to the browser.
- `click` is emitted before navigation; `preventDefault()` cancels it.
- `to` is typed `string | object`, so typed routes are not checked. vue-router is an optional peer (`^4.5.0 || ^5.0.0`).

## WCAG mapping

- 1.4.1 underlined at rest.
- 1.4.3 `accentInk` is clamped to 4.5:1 for any accent (see Limitations).
- 1.4.10 / 1.4.12 inline, wraps with the paragraph; `overflow-wrap: break-word` for long URLs.
- 1.4.11 focus ring and icon use the text ink.
- 2.4.4 link purpose; 2.4.7 3px outline with offset.
- 2.5.3 hidden text follows the visible text.
- 2.5.8 inline links are exempt; standalone use is not and has no enforced minimum. Use VButton for standalone link-styled actions.
- 4.1.2 native `a`, `aria-current`.

## Automated tests

- tests/link.test.ts: element, slot, attributes, `rel`, icon and new-window text, `aria-label`.
- tests/link-router.test.ts: href with and without a router, clicks, modifiers, `target`, `replace`, `aria-current`, cancelling, changing `to`, SSR, `externalIcon`, injected strings, `rel` merging. Run on vue-router 4.6.4 and 5.4.0 in jsdom.

## Manual tests

- [x] Multi-line link keeps underline on every line, icon on the last (Chromium 141). [ ] Firefox, Safari.
- [x] LinkText in emulated forced colors (Chromium 141). [ ] Real Windows High Contrast.
- [x] Ctrl/Shift/middle-click does not navigate in place (Chromium 141). [ ] Cmd-click on macOS, web history in a real app.
- [ ] Screen readers announce role, name and new-window text; `aria-current="page"` on the active route.
- [ ] Focus ring visible on every theme and accent.
- [ ] 200% zoom and 400% reflow with long text and the icon.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- External handling only for `target="_blank"`; no same-origin detection.
- No block variant with a minimum target size, no disabled state, no `:visited` styling.
- `aria-current` only for the exact route, not ancestors.
- Accent ink is `light-dark(oklch(from <mix> min(l, 0.48) c h), oklch(from <mix> max(l, 0.66) c h))`, with `<mix>` = `color-mix(in oklab, var(--v-color-surface-accent) 60%, CanvasText)`. It held 4.5:1 on the surface, subtle surface, hover and info tint for 3367 swept accents in light and dark. Only extreme accents are changed.
- Set `color-scheme` in CSS (e.g. `html[data-theme='dark'] { color-scheme: dark }`) or follow `prefers-color-scheme`. Vite 8's Lightning CSS rewrites `light-dark()` into toggles driven only by CSS `color-scheme`, so setting `style.colorScheme` from script leaves light values in dark mode. Script-driven consumers should set `build.cssTarget` / Lightning CSS targets to browsers with native `light-dark()`.
- No Storybook example of the routed case (no vue-router in apps/docs).

## Verification date

2026-10-14: automated tests plus Chromium 141 (headless) for wrapping, long URLs, 320px reflow, focus ring, forced-colors emulation and route clicks. Chromium 141 lacks `AccentColor`, so `--v-color-surface-accent` was set explicitly. Not done: Firefox, Safari, real Windows High Contrast, screen readers.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), vue-router 4.6.4 and 5.4.0; Reka UI not used.
