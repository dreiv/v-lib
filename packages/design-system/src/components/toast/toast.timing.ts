const minimum = 6000
const base = 3000
const perThreeWords = 1000

export function readingTime(...parts: (string | undefined)[]) {
  const words = parts.join(' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(minimum, base + Math.ceil(words / 3) * perThreeWords)
}
