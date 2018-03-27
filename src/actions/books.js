import {
  BOOKS_DATA_START,
  BOOKS_DATA_SUCCESS,
  BOOKS_DATA_FAIL,
} from '../constants/ActionTypes'

export function fetchBook(bookId) {
  return dispatch => {
    dispatch({
      type: BOOKS_DATA_START,
      payload: {isLoaded: false}
    })
    const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=id:${bookId}`
    const apiKey = ``
    const allUrl = `${baseUrl}&key=${apiKey}`
    fetch(`${allUrl}`)
      .then(response=> {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Ooooops!')
      })
      .then(book =>
        dispatch({
          type: BOOKS_DATA_SUCCESS,
          payload: {
            items: book.items,
            totalItems: book.totalItems,
            isLoaded: true,
          }
        }))
      .catch(error =>
        dispatch({
          type: BOOKS_DATA_FAIL,
          payload: {error},
      }))
  }
}

