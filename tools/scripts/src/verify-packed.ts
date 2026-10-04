import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inspect, readConfig } from './bundle.ts'

const root = resolve(fileURLToPath(new URL('../../..', import.meta.url)))
const work = join(root, '.packed')
const tarballs = join(work, 'tarball')
const library = join(root, 'packages', 'design-system')
const fixtures = readdirSync(join(root, 'fixtures'))

function run(command: string, cwd: string) {
  execSync(command, { cwd, stdio: 'inherit' })
}

rmSync(work, { recursive: true, force: true })
mkdirSync(tarballs, { recursive: true })

try {
  run(`pnpm pack --pack-destination "${tarballs}"`, library)
  const tarball = readdirSync(tarballs).find((file) => file.endsWith('.tgz'))
  if (!tarball) throw new Error('pnpm pack produced no tarball')

  const failures: string[] = []

  for (const fixture of fixtures) {
    const source = join(root, 'fixtures', fixture)
    const target = join(work, fixture)
    const manifestPath = join(source, 'package.json')
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as { name: string }
    const vue = createRequire(manifestPath)('vue/package.json') as { version: string }

    cpSync(source, target, {
      recursive: true,
      filter: (path) => !/[\\/](node_modules|dist)([\\/]|$)/.test(path),
    })

    writeFileSync(
      join(target, 'package.json'),
      JSON.stringify(
        {
          name: manifest.name,
          private: true,
          type: 'module',
          dependencies: {
            '@v/design-system': `file:../tarball/${tarball}`,
            vue: vue.version,
          },
        },
        null,
        2,
      ),
    )

    writeFileSync(
      join(target, 'tsconfig.json'),
      JSON.stringify({ extends: '../../tsconfig.json', include: ['src'] }, null, 2),
    )

    run('pnpm install --ignore-workspace --ignore-scripts', target)
    run('tsc --noEmit -p tsconfig.json', target)
    run('vp build', target)

    const report = inspect(join(target, 'dist'), readConfig(manifestPath))
    process.stdout.write(`${fixture}: js ${report.js} B gzip, css ${report.css} B gzip\n`)
    for (const failure of report.failures) failures.push(`${fixture}: ${failure}`)
  }

  if (failures.length > 0) {
    console.error(failures.join('\n'))
    process.exitCode = 1
  }
} finally {
  rmSync(work, { recursive: true, force: true })
}
