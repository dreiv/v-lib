# VErrorSummary

## Semantics

- A `section` named by its `h2` heading (`aria-labelledby`), containing a `ul` of links.
- Nothing is rendered when `errors` is empty.
- The heading has `tabindex="-1"` so the app can move focus to it.
- Each link is `href="#<id>"`; `id` is the `id` prop passed to the field (the control id, the checkbox input id, or the first radio of a radio group).

## Name and description

- Section name: the `heading` text, which is required so no language is hard coded.
- Link names: the error messages.
- The summary does not reference the field error ids. The app passes the same message to the field `error` prop and to the summary.

## Keyboard

- `focus()` is exposed; the app calls it after a failed submit. It waits one tick, so it works when the errors are set in the same tick, then focuses the heading.
- Tab moves through the links; Enter activates a link, which focuses the target control and scrolls it into view.
- If no element has the link id, the click keeps the browser default.

## States

- Single appearance: danger color border and links. The error is conveyed as text, not color alone.
- Focus ring comes from the base `:focus-visible` rule.

## Forced colors and zoom

- Border switches to `CanvasText` and links to `LinkText`.
- Layout reflows at any width.

## Automated coverage

- tests/error-summary.test.ts: empty state, heading and landmark name, link targets, focusing text field, radio group and checkbox, missing target, `focus()` including before the summary appears.
- Storybook a11y addon on the VErrorSummary stories.

## Known limitations

- The heading level is fixed at `h2`; the app owns the page heading hierarchy.

## Manual verification

- [ ] Screen readers announce the heading and the link count when focus moves to the heading.
- [ ] Following a link announces the field label, required state and error.
- [ ] The focused control is not hidden behind sticky headers or overlays after following a link.
- [ ] Focus ring on the heading after submitting with a mouse and with the keyboard.
- [ ] Forced colors: border and links distinguishable.
- [ ] 200% zoom and 400% reflow with long messages.
