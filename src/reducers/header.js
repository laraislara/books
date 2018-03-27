import {
  CHANGE_TEXT,
} from '../constants/ActionTypes'

const initialState = {
  searchText: '',
  startIndex: 0,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_TEXT:
      return {...state, searchText: payload.text}
    default:
      return state
  }
}
