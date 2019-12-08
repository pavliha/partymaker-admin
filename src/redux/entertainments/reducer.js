import { combineReducers } from 'redux'
import c from 'src/redux/constants'
import arrayToObject from 'utils/arrayToObject'
import omit from 'lodash/omit'

const entities = (state = {}, { type, payload, meta }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.entertainments)
      }

    case c.SORT_ENTERTAINMENTS_PENDING:
      return arrayToObject(meta.entertainments)

    case c.DESTROY_ENTERTAINMENT_FULFILLED:
      return omit(state, meta.entertainment_id)

    default:
      return state
  }
}

export default combineReducers({
  entities,
})
