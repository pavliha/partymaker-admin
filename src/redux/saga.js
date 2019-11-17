import { all, fork } from 'redux-saga/effects'
import auth from './auth/saga'
import places from './places/saga'
import entertainments from './entertainments/saga'

export default function* rootSaga() {
  yield all([
    fork(auth),
    fork(places),
    fork(entertainments)
  ])
}
