# VToastRegion and useToast

## Role

- The viewport is a `region` named by the required `label` prop (`{hotkey}` is replaced with the hotkey, F8 by default), containing an `ol` of toasts.
- Each toast is announced through a visually hidden polite live region, prefixed with the required `announcementLabel`.

## Name source

- Region: `label`.
- Close button: the required `closeLabel` prop.
- Toast: its title and description.

## Description source

- The toast description.

## Keyboard commands

- F8 moves focus to the region.
- Tab moves through toasts and their close buttons.
- Escape on a focused toast dismisses it.

## Focus entry

- Toasts never take focus when they appear.
- F8 or Tab reaches them.

## Focus movement

- Tab and Shift+Tab.

## Focus exit

- Tab out of the region.

## Focus restoration

- Closing a toast with focus inside the region, when no toasts remain, returns focus to the element focused before the region was entered (F8 or Tab).
- With toasts remaining, focus stays in the region (Reka UI).

## Announcements

- Politely, after a short delay: the `announcementLabel`, then the title and description.
- Dismissing a toast is not announced.

## Required consumer content

- Mount one VToastRegion in the app, with `label`, `announcementLabel` and `closeLabel` in the page language.
- Call `useToast().show` from event handlers on the client.
- Use toasts only for brief confirmations of something the user just did, never for errors or required actions.
- For messages the user must be able to read in full, pass `duration: Infinity`.

## WCAG mapping

- 4.1.3 Status Messages: polite live region.
- 2.2.1 Timing Adjustable: the timer pauses while the pointer is over the region, while focus is inside it and while the window is blurred; F8 therefore holds every toast open for as long as the user needs. See the known limitations.
- 2.1.1 Keyboard: close button, Escape and the F8 hotkey.
- 2.5.7 Dragging Movements: swipe is disabled, the close button is the only way to dismiss by pointer.
- 2.5.8 Target Size (Minimum): the close button is 44px.

## Automated tests

- e2e/toast.spec.ts (Chromium): no focus theft, polite announcement, F8 and Tab order, close and Escape return focus.
- tests/toast.test.ts: region name, title and description, polite announcement with label, no description element, close button name and behavior, Escape, dismiss by id, auto close, order.

## Manual tests

- [ ] NVDA, JAWS and VoiceOver announce a new toast once, politely and without moving focus.
- [ ] The timer pauses while the pointer is over the region or focus is inside it.
- [ ] Focus after closing a focused toast with the keyboard.
- [ ] F8 reaches the region in each browser and screen reader.
- [ ] Forced colors: the toast edge is visible.
- [ ] 200% zoom and 400% reflow with long messages.
- [ ] Toasts do not cover focused content on small screens.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Toasts close by themselves after a reading time (3 seconds plus 1 second per 3 words, at least 6 seconds), or after `duration` per toast. The word count assumes space separated languages; for others the 6 second floor applies. Important messages need `duration: Infinity`.
- Toast state is module level: use one region per page and call `show` on the client only, not during server rendering.
- Type `background` (polite) only; there is no assertive variant. Do not use a toast for errors or for anything the user must act on: use an inline message, VAlert or VDialog.
- No action button, variants or icons.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI ~2.10.5 (2.10.5 installed).
