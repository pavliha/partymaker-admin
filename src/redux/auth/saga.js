import actions from 'src/redux/action'
import { all, put, takeEvery } from 'redux-saga/effects'
import { fromJWT } from 'utils'
import Storage from 'services/Storage'

import {
  LOGIN_USER_FULFILLED,
  REGISTER_USER_FULFILLED,
} from './action'

function* setAuthUser({ payload: { token } }) {
  const user = fromJWT(token)
  Storage.put({ token })
  yield put(actions.users.set(user))
}

export default function* saga() {
  yield all([
    takeEvery(LOGIN_USER_FULFILLED, setAuthUser),
    takeEvery(REGISTER_USER_FULFILLED, setAuthUser),
    takeEvery(LOGIN_USER_FULFILLED, setAuthUser),
    takeEvery(REGISTER_USER_FULFILLED, setAuthUser),
  ])
}
