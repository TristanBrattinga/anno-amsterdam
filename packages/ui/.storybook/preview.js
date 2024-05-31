const { mergeConfig } = require('vite')
const { svelte } = require('@sveltejs/vite-plugin-svelte')

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/svelte',
  core: {
    builder: '@storybook/builder-vite'
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [svelte()]
    })
  }
}
