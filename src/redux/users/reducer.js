import { combineReducers } from 'redux'
import { arrayToObject, fromJWT } from 'utils'
import c from 'src/redux/constants'
import Storage from 'services/Storage'

const user = fromJWT(Storage.get('token'))
const initialState = user ? { [user.id]: user } : {}

const entities = (state = initialState, { type, payload }) => {
  switch (type) {
    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.user)
      }

    default:
      return state
  }
}

export default combineReducers({
  entities,
})
