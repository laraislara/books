import {
  CHANGE_TEXT,
  BOOKS_DATA_START,
  BOOKS_DATA_SUCCESS,
  BOOKS_DATA_FAIL,
  CLEAR_DATA,
} from '../constants/ActionTypes'

export function fetchData(searchText, startIndex = 0) {
  return dispatch => {
    dispatch({
      type: BOOKS_DATA_START,
    })
    const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
    const apiKey = `api_key`
    const allUrl = `${baseUrl}&key=${apiKey}&startIndex=${startIndex}`
    const nextIndex = startIndex + 10
    fetch(`${allUrl}`)
      .then(response=> {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Ooooops!')
      })
      .then(data =>
      dispatch({
        type: BOOKS_DATA_SUCCESS,
        payload: {
          items: data.items,
          totalItems: data.totalItems,
          isLoaded: true,
          startIndex: nextIndex,
        }
      }))
      .catch(error =>
        dispatch({
          type: BOOKS_DATA_FAIL,
          payload: {error},
        })
      )
  }
}

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: {text},
  }
}

export function clearData() {
  return {
    type: CLEAR_DATA,
    payload: {
      items: [],
      totalItems: 0,
      isLoaded: false,
    }
  }
}
