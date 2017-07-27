module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./configureStore.prod.js')
    : require('./configureStore.dev.js')
