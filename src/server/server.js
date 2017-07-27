import path from 'path'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import serialize from 'serialize-javascript'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import createHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../common/store/configureStore'
import routes from '../common/routes'

const app = express()

app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, '..', 'static')))

app.use(handleRender)

function handleRender(req, res) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const memoryHistory = createHistory(req.originalUrl)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  const finalState = store.getState()

  match(
    { history, routes, location: req.originalUrl },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        res.status(200).send(renderFullPage(html, finalState))
      } else {
        res.status(404).send('Not found')
      }
    }
  )
}

function renderFullPage(html, preloadedState) {
  const assets = webpackIsomorphicTools.assets()
  return `
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>react-redux-universal-webpack2-boilerplate</title>
        <link rel="stylesheet" type="text/css" href=${assets.styles.bundle}>
    </head>
    <body>
        <div id="root">${html}</div>
        <script>
            window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
        </script>
        <script src=${assets.javascript.vendor}></script>
        <script src=${assets.javascript.bundle}></script>
    </body>
</html>
`
}

app.listen(__PORT__, error => {
  if (error) {
    console.error(`error: ${error}`)
  } else {
    console.info(
      `==> 🌏  Listening on port ${__PORT__}. Open up http://localhost:${__PORT__} in your browser.`
    )
  }
})
