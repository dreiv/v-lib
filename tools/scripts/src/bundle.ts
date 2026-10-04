import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

export interface BundleConfig {
  present: string[]
  absent: string[]
  maxGzip: { js: number; css: number }
}

export interface BundleReport {
  js: number
  css: number
  failures: string[]
}

function* walk(path: string): Generator<string> {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const full = join(path, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

export function inspect(dist: string, config: BundleConfig): BundleReport {
  let js = 0
  let css = 0
  let source = ''

  for (const file of walk(dist)) {
    if (/\.(js|mjs)$/.test(file)) {
      const text = readFileSync(file, 'utf-8')
      source += text
      js += gzipSync(text).length
    } else if (file.endsWith('.css')) {
      const text = readFileSync(file, 'utf-8')
      source += text
      css += gzipSync(text).length
    }
  }

  const failures: string[] = []
  for (const needle of config.present) {
    if (!source.includes(needle)) failures.push(`missing: ${needle}`)
  }
  for (const needle of config.absent) {
    if (source.includes(needle)) failures.push(`unexpected: ${needle}`)
  }
  if (js > config.maxGzip.js) failures.push(`js ${js} B gzip exceeds ${config.maxGzip.js} B`)
  if (css > config.maxGzip.css) failures.push(`css ${css} B gzip exceeds ${config.maxGzip.css} B`)

  return { js, css, failures }
}

export function readConfig(packageJson: string): BundleConfig {
  const manifest = JSON.parse(readFileSync(packageJson, 'utf-8')) as { bundle: BundleConfig }
  return manifest.bundle
}
