import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
})

const appliedMiddleWare = applyMiddleware(loggerMiddleware)

export default function configureStore(preloadedStore) {
  return createStore(
    reducers,
    preloadedStore,
    appliedMiddleWare,
  )
}
