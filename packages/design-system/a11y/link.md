# VLink

## Semantics

- Native `a`; `href` and every other attribute (`target`, `rel`, `download`, ...) are passed through.
- Without an `href` the element is not a link and not focusable; use VButton for actions.

## Name and description

- Name from slot content, or `aria-label` passed as an attribute.
- Link text must make sense out of context; the component cannot check this.

## Keyboard

- Native: Tab focuses, Enter activates.

## States

- Underlined at rest, so the link does not rely on color alone; the underline thickens on hover.
- Focus ring comes from the base `:focus-visible` rule.
- Color is `--v-color-accent-ink`, which the contrast tests cover on the surface.

## Forced colors and zoom

- Color switches to `LinkText`.
- Inline: wraps with the surrounding text and is exempt from the minimum target size.

## Automated coverage

- tests/link.test.ts: element, slot, attribute forwarding.
- tokens contrast tests cover accent ink on the surface for every accent color.

## Known limitations

- A link that opens a new window must say so in its text or `aria-label`; the component adds no indicator.
- No router integration. Apps that need client-side navigation handle the click themselves.

## Manual verification

- [ ] Screen readers announce the link role and name.
- [ ] Underline visible and distinguishable in forced colors.
- [ ] Focus ring visible against the surrounding text on every theme and accent.
- [ ] 200% zoom and 400% reflow with long link text.
