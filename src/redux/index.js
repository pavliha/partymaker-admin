import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promise from 'redux-promise-middleware'
import createSagaMiddleware from 'redux-saga'
import { connect } from 'utils'
import saga from './saga'
import actions from './action'
import select from './select'
import reducers from './reducer'
import c from './constants'
import normalizeMiddleware from './_middleware/normalizeMiddleware'

const initialState = {}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(normalizeMiddleware, promise, sagaMiddleware),
  ),
)

sagaMiddleware.run(saga)

if (module.hot) {
  module.hot.accept('./reducer', () => {
    const nextRootReducer = reducers
    store.replaceReducer(nextRootReducer)
  })
}
export { store, reducers, actions, select, connect, c }
