import { fork, call, put, takeEvery } from 'redux-saga/effects'
import {
  BOOKS_DATA_START,
  BOOKS_DATA_SUCCESS,
  BOOKS_DATA_FAIL,
  ALL_BOOKS_REQUESTED,
  ONE_BOOK_REQUESTED,
  CHANGE_TEXT,
} from './constants/ActionTypes'
import { fetchBook, fetchData } from './fetchers'

// worker ONE_BOOKS
function* fetchBookSaga(action) {
  yield put({ type: BOOKS_DATA_START })
  try {
    const payload = yield call(fetchBook, action.payload)
    yield put({ type: BOOKS_DATA_SUCCESS, payload })
  } catch (e) {
    yield put({ type: BOOKS_DATA_FAIL, message: e.message })
  }
}

// watcher ONE_BOOKS
function* bookSaga() {
  yield takeEvery(ONE_BOOK_REQUESTED, fetchBookSaga)
}

// worker ALL_BOOKS
function* fetchDataSaga(action) {
  yield put({ type: BOOKS_DATA_START })
  try {
    const payload = yield call(fetchData, action.payload)
    yield put({ type: BOOKS_DATA_SUCCESS, payload })
    // yield put({ type: CHANGE_TEXT, payload: action.payload})
  } catch (e) {
    yield put({ type: BOOKS_DATA_FAIL, message: e.message })
  }
}

// watcher ALL_BOOKS
function* dataSaga() {
  yield takeEvery(ALL_BOOKS_REQUESTED, fetchDataSaga)
}

// merge sagas
function* rootSaga() {
  yield [fork(bookSaga), fork(dataSaga)]
}

export default rootSaga
