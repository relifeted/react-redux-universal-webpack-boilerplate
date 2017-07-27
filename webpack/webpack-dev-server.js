var express = require('express')
var webpack = require('webpack')
var compression = require('compression')
var webpackConfig = require('./webpack.config.dev.js')
var compiler = webpack(webpackConfig)

var host = process.env.HOST || 'localhost'
var port = +process.env.PORT + 1 || 3001
var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
}

var app = express()

app.use(compression())
app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(port, err => {
  if (err) {
    console.error(err)
  } else {
    console.info(
      '==> 🌏  Webpack development server listening on port %s',
      port
    )
  }
})
