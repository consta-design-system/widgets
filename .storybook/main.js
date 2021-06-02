const getCommonConfig = require('@consta/widgets-configs/config/webpack/common.webpack')
const webpackMerge = require('webpack-merge')
const glob = require('fast-glob')

const omit = (obj, props) => {
  const newObj = { ...obj }
  props.forEach(prop => delete newObj[prop])

  return newObj
}

const flowRight = functions => (...args) =>
  [...functions].reverse().reduce((prev, func) => [func(...prev)], args)[0]

const { withMdxRules, disableCSSModules } = require('../webpack/helpers')

module.exports = {
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    'storybook-addon-react-docgen',
    '@storybook/addon-docs/register',
    'storybook-addon-themes',
  ],
  stories: async () => {
    const isDevelop = process.env.NODE_ENV === 'development'

    const paths = await glob(
      ['src/**/*.stories.tsx', !isDevelop && '!src/core/**/*.stories.tsx', 'docs/**/*.mdx'].filter(
        Boolean
      )
    )

    return paths.map(path => `../${path}`)
  },
  webpackFinal: config => {
    // Exclude default module rules to fix svg import issue: https://github.com/storybooks/storybook/issues/5926
    const baseSBConfig = omit(config, ['module'])

    const projectConfig = flowRight([withMdxRules, disableCSSModules])(
      getCommonConfig({ withDocgen: true })
    )

    return webpackMerge(baseSBConfig, projectConfig)
  },
}
