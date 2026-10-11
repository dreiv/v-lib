export function guardRouterNavigate(event: MouseEvent, navigate: (e: MouseEvent) => void) {
  const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  if (event.defaultPrevented || modified || event.button !== 0) return
  event.preventDefault()
  navigate(event)
}
