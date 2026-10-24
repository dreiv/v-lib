import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts', '../stories/**/*.mdx'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/vue3-vite',
  features: { experimentalDocgenServer: true },
  core: { disableWhatsNewNotifications: true, disableTelemetry: true },
}

export default config
