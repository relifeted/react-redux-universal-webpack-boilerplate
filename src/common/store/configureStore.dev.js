import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import api from '../middleware/api'

export default function configureStore(history) {
  const reduxRouterMiddleware = routerMiddleware(history)
  const logger = createLogger()
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, api, reduxRouterMiddleware, logger)
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
