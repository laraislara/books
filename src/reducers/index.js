import { combineReducers } from 'redux'
import header from './header'
import books from './books'

const rootReducer = combineReducers({
  header,
  books,
})

export default rootReducer
