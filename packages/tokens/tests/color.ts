export type Lab = [number, number, number]

export interface Context {
  tokens: Map<string, string>
  dark: boolean
  canvas: string
  text: string
  accent: string
}

function srgbToLinear(value: number) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function hexToLab(hex: string): Lab {
  const [r, g, b] = [1, 3, 5].map((i) =>
    srgbToLinear(parseInt(hex.slice(i, i + 2), 16) / 255),
  ) as Lab
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

export function luminance([lightness, a, b]: Lab) {
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
  const [r, g, bl] = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((channel) => Math.min(1, Math.max(0, channel))) as Lab
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl
}

export function contrast(a: Lab, b: Lab) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (high! + 0.05) / (low! + 0.05)
}

function inner(value: string) {
  return value.slice(value.indexOf('(') + 1, value.lastIndexOf(')'))
}

function split(args: string) {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '(') depth++
    else if (args[i] === ')') depth--
    else if (args[i] === ',' && depth === 0) {
      parts.push(args.slice(start, i).trim())
      start = i + 1
    }
  }
  parts.push(args.slice(start).trim())
  return parts
}

function weighted(part: string) {
  const match = /^(.*?)(?:\s+(\d+(?:\.\d+)?)%)?$/s.exec(part)!
  return { color: match[1]!, percent: match[2] === undefined ? undefined : Number(match[2]) }
}

export function resolve(value: string, context: Context): Lab {
  const v = value.trim()

  if (v.startsWith('var(')) {
    const name = inner(v).trim()
    const target = context.tokens.get(name)
    if (target === undefined) throw new Error(`Undefined token ${name}`)
    return resolve(target, context)
  }

  if (v.startsWith('light-dark(')) {
    const [light, dark] = split(inner(v))
    return resolve(context.dark ? dark! : light!, context)
  }

  if (v.startsWith('color-mix(')) {
    const [space, first, second] = split(inner(v))
    if (space !== 'in oklab') throw new Error(`Unsupported color space: ${space}`)
    const a = weighted(first!)
    const b = weighted(second!)
    const percentA = a.percent ?? 100 - (b.percent ?? 50)
    const percentB = b.percent ?? 100 - percentA
    const weight = percentA / (percentA + percentB)
    const labA = resolve(a.color, context)
    const labB = resolve(b.color, context)
    return labA.map((channel, i) => channel * weight + labB[i]! * (1 - weight)) as Lab
  }

  if (v.startsWith('oklch(')) {
    const [lightness, chroma, hue] = inner(v).trim().split(/\s+/)
    const angle = (Number(hue) * Math.PI) / 180
    return [
      Number(lightness!.replace('%', '')) / 100,
      Number(chroma) * Math.cos(angle),
      Number(chroma) * Math.sin(angle),
    ]
  }

  if (v === 'Canvas') return hexToLab(context.canvas)
  if (v === 'CanvasText') return hexToLab(context.text)
  if (v === 'AccentColor') return hexToLab(context.accent)
  if (/^#[0-9a-f]{6}$/i.test(v)) return hexToLab(v)

  throw new Error(`Unsupported color: ${v}`)
}
