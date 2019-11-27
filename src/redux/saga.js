import { all, fork, put, takeEvery } from 'redux-saga/effects'
import auth from './auth/saga'
import actions from 'src/redux/action'
import c from 'src/redux/constants'

function * setModels({ payload: models }) {
  yield put(actions.setModels(models))
}

export default function * rootSaga() {
  yield all([
    fork(auth),
    takeEvery(c.LOAD_ENTERTAINMENTS_FULFILLED, setModels),
    takeEvery(c.LOAD_ENTERTAINMENT_FULFILLED, setModels),
    takeEvery(c.CREATE_ENTERTAINMENT_FULFILLED, setModels),
    takeEvery(c.UPDATE_ENTERTAINMENT_FULFILLED, setModels),

    takeEvery(c.LOAD_PLACES_FULFILLED, setModels),
    takeEvery(c.LOAD_PLACE_FULFILLED, setModels),
    takeEvery(c.CREATE_PLACE_FULFILLED, setModels),
    takeEvery(c.UPDATE_PLACE_FULFILLED, setModels),
  ])
}
