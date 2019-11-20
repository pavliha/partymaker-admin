import { fromJWT } from 'utils'
import Storage from 'services/Storage'

import {
  LOGIN_USER_FULFILLED,
  LOGOUT_USER,
  REGISTER_USER_FULFILLED,
  SET_AUTH_USER,
} from './action'

const token = Storage.get('token')

const user_id = fromJWT(token)?.id

const initialState = {
  user_id,
  token,
  isLoading: false,
  email: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case REGISTER_USER_FULFILLED:
    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        token: payload.token,
        user_id: fromJWT(payload.token)?.id,
      }

    case LOGOUT_USER:
      return {
        ...state,
        user_id: null,
      }

    case SET_AUTH_USER:
      return {
        ...state,
        user_id: payload.id,
      }

    default:
      return state
  }
}

export default authReducer
