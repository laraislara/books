import {createAction} from 'redux-actions'
import { ONE_BOOK_REQUESTED, ALL_BOOKS_REQUESTED } from '../constants/ActionTypes'


export const fetchBook = createAction(ONE_BOOK_REQUESTED)
export const fetchAllBooks = createAction(ALL_BOOKS_REQUESTED)

