import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite-plus'

const packages = (path: string) =>
  fileURLToPath(new URL(`../../../packages/${path}`, import.meta.url))

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts', '../stories/**/*.mdx'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/vue3-vite',
  features: { experimentalDocgenServer: true },
  core: { disableWhatsNewNotifications: true, disableTelemetry: true },
  viteFinal: (viteConfig, { configType }) =>
    configType === 'DEVELOPMENT'
      ? mergeConfig(viteConfig, {
          resolve: {
            alias: [
              {
                find: /^@v\/design-tokens$/,
                replacement: packages('tokens/src/index.ts'),
              },
              {
                find: /^@v\/design-system$/,
                replacement: packages('design-system/src/index.ts'),
              },
              {
                find: /^@v\/design-system\/(button|spinner)$/,
                replacement: `${packages('design-system/src/components')}/$1/index.ts`,
              },
              {
                find: /^@v\/design-system\/styles$/,
                replacement: packages('design-system/src/styles/index.css'),
              },
              {
                find: /^@v\/design-system\/(utilities|tokens)$/,
                replacement: `${packages('design-system/src/styles')}/$1.css`,
              },
            ],
          },
        })
      : viteConfig,
}

export default config
