const devConfig = require('./webpack.dev.conf')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const options = {
  host: 'localhost',
  hot: true,
  noInfo: true,
  quiet: true,
  overlay: { // 这里配置 html 页面是否显示 eslint 错误信息蒙版 
    errors: true,
    warnings: true
  }
}

console.log(devConfig.entry)
//添加自动刷新功能
webpackDevServer.addDevServerEntrypoints(devConfig, options)
console.log(devConfig.entry)

// console.log(devConfig.entry)

let complier = webpack(devConfig)
let server = new webpackDevServer(complier, options)

server.listen(8080, 'localhost', () => {
  console.log('dev server listening on port 8080')
})
