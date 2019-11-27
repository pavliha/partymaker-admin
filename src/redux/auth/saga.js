import actions from 'src/redux/action'
import { all, put, takeEvery } from 'redux-saga/effects'
import { fromJWT } from 'utils'
import Storage from 'services/Storage'
import c from 'src/redux/constants'

function * setAuthUser({ payload: { token } }) {
  const user = fromJWT(token)
  Storage.put({ token })
  yield put(actions.users.set(user))
}

export default function * saga() {
  yield all([
    takeEvery(c.LOGIN_USER_FULFILLED, setAuthUser),
    takeEvery(c.REGISTER_USER_FULFILLED, setAuthUser),
    takeEvery(c.LOGIN_USER_FULFILLED, setAuthUser),
  ])
}
