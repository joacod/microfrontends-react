const { merge } = require('webpack-merge')
const singleSpaDefaults = require('webpack-config-single-spa-react-ts')
const path = require('path')

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'joacod',
    projectName: 'microfrontends-react',
    webpackConfigEnv,
    argv,
  })

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 9001,
    },
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'public/images'),
      },
    },
    externals: ['@joacod/microfrontends-utility'],
  })
}
