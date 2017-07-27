require('babel-polyfill')
require('react-hot-loader/patch')

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const assetsPath = path.resolve(__dirname, '../static/dist')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT + 1 || 3001

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./webpack-isomorphic-tools')
)

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://' +
        host +
        ':' +
        port +
        '/__webpack_hmr',
      './src/client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'react-router-redux',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name]-[hash].js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('style-[hash].css'),
    webpackIsomorphicToolsPlugin.development(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|babel)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'sass-loader?minimize'],
          allChunks: true,
        }),
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'file-loader?name=images/[hash].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
