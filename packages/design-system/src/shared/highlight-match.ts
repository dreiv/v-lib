export interface HighlightPart {
  text: string
  highlight: boolean
}

export function highlightMatch(text: string, term: string): HighlightPart[] {
  const trimmed = term.trim()
  if (!trimmed) return [{ text, highlight: false }]

  const index = text.toLowerCase().indexOf(trimmed.toLowerCase())
  if (index === -1) return [{ text, highlight: false }]

  return [
    { text: text.slice(0, index), highlight: false },
    { text: text.slice(index, index + trimmed.length), highlight: true },
    { text: text.slice(index + trimmed.length), highlight: false },
  ].filter((part) => part.text.length > 0)
}
