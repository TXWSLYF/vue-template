const path = require('path')
const globby = require('globby')
const HappyPack = require('happypack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let allEntryPath = globby.sync(`src/pages/*/main.js`)
let allEntryList = allEntryPath.map(entryPath => {
  let arr = entryPath.split('/')
  let entryName = arr[2]

  return {
    entryPath: entryPath,
    entryName: entryName
  }
})
console.log(process.argv)
let entry = {}
if (process.argv[2]) {
  let entryNameList = process.argv[2].split(',')
  entryNameList.forEach(entryName => {
    let targetEntry = allEntryList.find(entry => {
      return entry.entryName === entryName
    })
    if (targetEntry) {
      entry[entryName] = path.resolve(__dirname, '../', targetEntry.entryPath)
    }
  })
} else {
  allEntryList.forEach(i => {
    entry[i.entryName] = path.resolve(__dirname, '../', i.entryPath)
  })
}

// console.log(entry, '===========')

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  // externals: {
  //   'lodash': '_'
  // },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: [resolve('src')]
      },
      {
        resourceQuery: /blockType=i18n/,
        loader: '@kazupon/vue-i18n-loader'
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        use: 'happypack/loader',
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new HappyPack({
      loaders: [ 'babel-loader' ]
    }),
    new VueLoaderPlugin()
  ]
}