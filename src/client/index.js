/* globals window document */
/* eslint no-underscore-dangle: ["off"] */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../common/store/configureStore'
import routes from '../common/routes'
import '../styles/scss/main.scss'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(browserHistory, preloadedState)
const history = syncHistoryWithStore(browserHistory, store)

function renderApp() {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}
renderApp()

if (module.hot) {
  module.hot.accept('../common/routes', () => {
    require('../common/routes')
    renderApp()
  })
}
