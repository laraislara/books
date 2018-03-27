import {
  CHANGE_TEXT,
  CLEAR_DATA,
} from '../constants/ActionTypes'



export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: { text },
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
