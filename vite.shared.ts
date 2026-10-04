import nodeFs from 'node:fs'

export const vueFs = {
  fileExists: (file: string) => nodeFs.existsSync(file),
  readFile: (file: string) => nodeFs.readFileSync(file, 'utf-8'),
  realpath: (file: string) => nodeFs.realpathSync(file),
}
