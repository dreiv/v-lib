# VLink

## Role

- Native `a`; `href` and every other attribute are passed through.
- Without an `href` the element is not a link and not focusable; use VButton for actions.

## Name source

- Slot content, or `aria-label` passed as an attribute.
- When `target="_blank"` and no `aria-label` is given, visually-hidden text (`.v-visually-hidden`)
  is appended to the accessible name so it reads "<link text> (opens in new window)". An explicit
  `aria-label` always wins and suppresses this text.

## Description source

- None.

## Keyboard commands

- Native: Tab focuses, Enter activates.

## Focus entry

- Tab.

## Focus movement

- Native: none.

## Focus exit

- Tab or Shift+Tab.

## Focus restoration

- Not applicable.

## Announcements

- `target="_blank"` is announced through the generated or supplied accessible name (see Name
  source). No live region is used.

## Required consumer content

- Link text that makes sense out of context; the component cannot check this.
- Nothing extra for new-window links — set `target="_blank"` and the indicator and announcement
  are automatic. Pass `aria-label` yourself only when the default "opens in new window" phrasing
  is wrong for the link (e.g. a file download).

## Router integration

VLink has no router dependency and does not accept a `to` prop. Compose it with `RouterLink`'s
`custom` + `v-slot` API instead:

```vue
<RouterLink to="/terms" custom v-slot="{ href, navigate }">
  <VLink :href="href" @click="onNavigate($event, navigate)">terms of use</VLink>
</RouterLink>
```

The `navigate` function the `custom` slot hands back has no click guard — unlike a plain, non-custom
`<RouterLink>`. Bound directly to `@click`, it hijacks Ctrl/Cmd/Shift/middle-click into an SPA
navigation instead of letting the browser open a new tab, which breaks a behaviour users expect
from every other link on the page. Guard it yourself before calling `navigate()`:

```ts
function onNavigate(event: MouseEvent, navigate: (event: MouseEvent) => void) {
  const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  if (event.defaultPrevented || modified || event.button !== 0) return
  navigate(event)
}
```

This guard is currently written out per call site, not exported from the package. If it ends up
copy-pasted into several components, it's a candidate for a small shared `@v/design-system` export
later.

This pattern is documented here and in the VLink Storybook docs page, but there is no live,
executable Storybook story for it: `vue-router` is not currently a dependency of `apps/docs`.

## WCAG mapping

- 1.4.1 Use of Color: underlined at rest.
- 2.4.4 Link Purpose (In Context).
- 1.4.3 Contrast (Minimum): accent ink on the surface, tokens contrast tests.
- 2.5.8 Target Size (Minimum): inline links are exempt. This exemption only holds while VLink is
  used inline in text; a standalone/block usage (nav item, card) is not exempt and currently has
  no enforced minimum target size. Use VButton for standalone link-styled actions until VLink gets
  a block variant.

## Automated tests

- tests/link.test.ts: element, slot, attribute forwarding, default/overridden `rel`, external icon
  and new-window text presence, `aria-label` override behaviour.
- Tokens contrast tests for accent ink on the surface.
- Router composition (the guard above) is documentation only; not covered by any automated test,
  since it lives entirely in consumer code rather than in VLink itself.

## Manual tests

- [ ] Screen readers announce the link role and name, including the new-window suffix.
- [ ] Underline and icon visible and distinguishable in forced colors.
- [ ] Focus ring visible against the surrounding text on every theme and accent.
- [ ] 200% zoom and 400% reflow with long link text and the external icon.
- [ ] Ctrl/Cmd/Shift/middle-click on a router-composed VLink opens a new tab instead of navigating
      in place (manual, against a real app — no local example exists yet).

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- External handling triggers only on `target="_blank"`; a cross-origin link without `target` is
  not flagged, and nothing currently detects same-origin vs cross-origin.
- No block/standalone variant with an enforced minimum target size (see WCAG mapping above).
- No built-in router integration; see "Router integration" above for the composition pattern and
  its click-guard requirement. No live Storybook example yet (no `vue-router` dependency in
  apps/docs).

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
