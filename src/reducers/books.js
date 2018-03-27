import {
  BOOKS_DATA_START,
  BOOKS_DATA_SUCCESS,
  BOOKS_DATA_FAIL,
  CLEAR_DATA,
} from '../constants/ActionTypes'

const initialState = {
  items: [],
  totalItems: 0,
  isLoaded: false,
  startIndex: 0,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case BOOKS_DATA_START:
      return {
        ...state,
      }

    case BOOKS_DATA_SUCCESS:
      return {
        items: [...state.items, ...payload.items],
        totalItems: payload.totalItems,
        isLoaded: payload.isLoaded,
        startIndex: payload.startIndex,
      }

    case BOOKS_DATA_FAIL:
      return {state, isLoaded: false}

    case CLEAR_DATA:
      return {
        items: [...payload.items],
        totalItems: payload.totalItems,
        isLoaded: payload.isLoaded,
        startIndex: initialState.startIndex,
      }

    default:
      return state
  }
}
