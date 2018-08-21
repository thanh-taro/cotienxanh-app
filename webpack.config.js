var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var appDir = path.join(__dirname, '/src/app/')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: true
})

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(appDir, 'index.js')
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(appDir, 'index.html'),
      chunks: [ 'app' ],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [ 'style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader' ]
    }, {
      test: /\.js$/,
      use: [ 'babel-loader' ]
    }, {
      test: /\.(woff(2)?|ttf|eot|jsonf|ogg|mp3)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{ loader: 'file-loader', options: { name: '[name].[hash].[ext]' } }]
    }, {
      test: /\.(png|jpg|svg)$/,
      use: [{ loader: 'file-loader', options: { name: '[name].[hash].[ext]' } }]
    }]
  }
}
