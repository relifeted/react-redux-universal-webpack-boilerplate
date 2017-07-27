require('babel-register')

var path = require('path')
var rootDir = path.resolve(__dirname, '../..')

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
global.__PORT__ = process.env.PORT

if (__DEVELOPMENT__) {
  if (!require('piping')({ hook: true })) {
    return
  }
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('../../webpack/webpack-isomorphic-tools')
).server(rootDir, function() {
  require('./server')
})
