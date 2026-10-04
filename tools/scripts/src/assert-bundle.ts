import { inspect, readConfig } from './bundle.ts'

const [dist = 'dist', packageJson = 'package.json'] = process.argv.slice(2)
const report = inspect(dist, readConfig(packageJson))

process.stdout.write(`js ${report.js} B gzip, css ${report.css} B gzip\n`)

if (report.failures.length > 0) {
  console.error(report.failures.join('\n'))
  process.exit(1)
}
