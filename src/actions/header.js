import { CHANGE_TEXT, CLEAR_DATA } from '../constants/ActionTypes'

export function changeText(searchText) {
  return {
    type: CHANGE_TEXT,
    payload: { searchText },
  }
}

export function clearData() {
  return {
    type: CLEAR_DATA,
    payload: {
      items: [],
      totalItems: 0,
      isLoaded: false,
    },
  }
}
