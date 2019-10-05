var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

var appDir = path.join(__dirname, '/src/app/')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: false
})

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(appDir, 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    pathinfo: true,
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    definePlugin,
    new CleanWebpackPlugin(['build']),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(appDir, 'index.html'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: true
    })
  ],
  // optimization: {
  //   minimize: true
  // },
  module: {
    rules: [{
      test: /\.css$/,
      use: [ MiniCssExtractPlugin.loader, { loader: 'css-loader', options: {
        importLoaders: 1,
        // minimize: true
      } }, 'postcss-loader' ]
    }, {
      test: /\.js$/,
      use: [ 'babel-loader' ]
    }, {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{ loader: 'file-loader', options: { name: '[name].[hash].[ext]', outputPath: 'fonts' } }]
    }, {
      test: /\.(jsonf|ogg|mp3)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{ loader: 'file-loader', options: { name: '[name].[hash].[ext]', outputPath: 'assets' } }]
    }, {
      test: /\.(png|jpg|svg)$/,
      use: [{ loader: 'file-loader', options: { name: '[name].[hash].[ext]', outputPath: 'assets' } }]
    }]
  }
}
