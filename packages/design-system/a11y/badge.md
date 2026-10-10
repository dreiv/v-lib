# VBadge

## Role

- A `span` with no role. It is purely a styled container: `display:
inline-flex` with a gap, ready to lay out whatever you put in its default
  slot (text, a decorative icon, an interactive control) in a row.
- VBadge never inspects or wraps its slot content. If you put an interactive
  element (e.g. a remove button) inside it, that element keeps its own
  semantics — VBadge does not add a role, an event contract, or any
  accessibility behavior on its behalf, and does not size or color it
  either.

## Name source

- Its text.

## Description source

- None.

## Keyboard commands

- The badge itself: none; it is not interactive.
- Anything you put inside it (a button, a link): whatever that element
  natively provides.

## Focus entry

- The badge itself is not focusable. If you put a focusable element inside
  it, it participates in the page's normal tab order like any other inline
  content.

## Focus movement / exit / restoration

- Not applicable to the badge. If you put something removable inside it and
  your app removes the badge on click, moving focus somewhere sensible
  afterward is your responsibility.

## Announcements

- None. VBadge is not a live region; nothing it renders is announced on its
  own.

## Required consumer content

- Text that says the status in words ("Paid", "Overdue"); tone is shown by
  border color, a tinted background and matching text color, but the
  wording alone must carry the meaning (1.4.1).
- Short text.
- A decorative icon placed in the slot is never a substitute for the text
  above.

### Consumer responsibility

VBadge only exposes a single default slot and lays its children out in a
row. Anything interactive you put inside it (a button, a link, a checkbox)
is entirely your responsibility to make accessible and to size/color —
`badge.css` has no rules that reach into a composed-in component's classes
or data attributes.

## Tone

Border, background and text all read off the same tone: `--v-color-{tone}`
for border and text, `--v-color-{tone}-surface` for the background (that
color mixed into the page surface — defined once in `@v/design-tokens`, not
computed in `badge.css`). `neutral` (the default) uses no tone token.

## WCAG mapping

- 1.4.1 Use of Color: the wording always carries the status by itself; tone
  color is reinforcement, not the only signal.
- 1.4.11 Non-text Contrast: tone borders at least 3:1 against the page
  (tokens contrast tests).
- 1.4.3 Contrast (Minimum): tone text needs 4.5:1 against its `-surface`
  background. Measured at both ends of `light-dark()`: danger 5.5:1 / 6.2:1,
  success 4.7:1 / 7.5:1, warning 4.8:1 / 8.0:1 (light / dark). `info`
  resolves through `AccentColor`, which is OS/browser-chosen and can't be
  measured at build time — spot-check it manually.
- 1.4.10 Reflow: text wraps anywhere.
- 2.1.1 Keyboard, 2.5.8 Target Size, 4.1.2 Name/Role/Value: out of VBadge's
  scope by design — the responsibility of whatever interactive content you
  place in the slot.

## Automated tests

- tests/badge.test.ts: element, no role, tone data attribute, attribute
  forwarding, arbitrary slot content (icon + button) renders unmodified.

## Manual tests

- [ ] Forced colors: the badge edge is visible.
- [ ] 200% zoom and 400% reflow with long text.
- [ ] Each tone is distinguishable by its text with color vision deficiency
      simulation.
- [ ] If you compose in a remove control: it's reachable and operable, sized
      and colored as you intend, and its name makes sense out of context.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Not a live region: a badge whose content or tone changes after load is not
  announced.
- No built-in support for a composed-in control — sizing, color and
  accessibility are entirely the consumer's responsibility. Revisit this if
  a removable-badge pattern turns out common enough to warrant scoped CSS.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
