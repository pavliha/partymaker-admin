import { combineReducers } from 'redux'
import omit from 'lodash/omit'
import c from 'src/redux/constants'
import arrayToObject from 'utils/arrayToObject'

const entities = (state = {}, { type, payload }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.additional_services)
      }

    case c.REMOVE_ADDITIONAL_SERVICE:
      return omit(state, payload)

    default:
      return state
  }
}

export default combineReducers({
  entities,
})
