const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const utils = require('./utils')

let htmls = utils.getHtmls(baseWebpackConfig.entry)

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: true, usePostCss: true })
  },
  plugins: [
    ...htmls,
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin() // HMR shows correct file names in console on update.
  ]
})