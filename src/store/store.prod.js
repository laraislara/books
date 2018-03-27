import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from 'reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [ReduxThunk, sagaMiddleware]
const enhancer = [applyMiddleware(...middlewares)]

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, ...enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}
