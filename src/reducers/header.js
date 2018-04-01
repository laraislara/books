import { CHANGE_TEXT } from '../constants/ActionTypes'

const initialState = {
  searchText: '',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TEXT:
      return {searchText: payload.searchText }
    default:
      return state
  }
}
