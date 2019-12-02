import { fromJWT } from 'utils'
import Storage from 'services/Storage'
import c from 'src/redux/constants'

const initialState = {
  user_id: fromJWT(Storage.get('token'))?.id,
  token: Storage.get('token'),
  isLoading: false,
  email: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case c.REGISTER_USER_FULFILLED:
    case c.LOGIN_USER_FULFILLED:
      return {
        ...state,
        token: payload.token,
        user_id: fromJWT(payload.token)?.id,
      }

    case c.LOGOUT_USER_FULFILLED:
      return {
        ...state,
        user_id: null,
        token: null,
      }

    case c.SET_AUTH_USER:
      return {
        ...state,
        user_id: payload.id,
      }

    default:
      return state
  }
}

export default authReducer
