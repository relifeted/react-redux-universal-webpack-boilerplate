import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import api from '../middleware/api'

export default function configureStore(history) {
  const reduxRouterMiddleware = routerMiddleware(history)
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, api, reduxRouterMiddleware)
  )

  return store
}
