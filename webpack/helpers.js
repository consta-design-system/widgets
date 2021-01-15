const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')
const remarkExternalLinks = require('remark-external-links')
const remarkSlug = require('remark-slug')

const createRuleForMdx = (options = {}) => ({
  test: /\.mdx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-transform-react-jsx'],
      },
    },
    {
      loader: '@mdx-js/loader',
      options: {
        remarkPlugins: [remarkSlug, remarkExternalLinks],
        ...options,
      },
    },
  ],
})

module.exports = {
  withMdxRules(config) {
    // Для сборки mdx файлов, которые мы импортируем внутри index.stories.tsx
    config.module.rules.push({
      include: /src|.storybook/,
      ...createRuleForMdx(),
    })

    // Для сборки mdx файлов, которые напрямую подключаются в storybook из папки docs
    config.module.rules.push({
      exclude: /src|.storybook/,
      ...createRuleForMdx({
        compilers: [createCompiler({})],
      }),
    })

    return config
  },
}
