import { combineReducers } from 'redux'
import c from 'src/redux/constants'
import arrayToObject from 'utils/arrayToObject'

const entities = (state = {}, { type, payload, meta }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.entertainment)
      }

    case c.DESTROY_ENTERTAINMENT_FULFILLED: {
      const entertainments = { ...state }
      delete entertainments[meta.entertainment_id]

      return entertainments
    }

    default:
      return state
  }
}

export default combineReducers({
  entities,
})
