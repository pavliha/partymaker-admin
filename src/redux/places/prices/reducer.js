import { combineReducers } from 'redux'
import c from 'src/redux/constants'
import arrayToObject from 'utils/arrayToObject'
import omit from 'lodash/omit'

const entities = (state = {}, { type, payload }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.prices)
      }

    case c.REMOVE_PRICE:
      return omit(state, payload)

    default:
      return state
  }
}

export default combineReducers({
  entities,
})
