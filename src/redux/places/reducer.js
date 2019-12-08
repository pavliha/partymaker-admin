import { combineReducers } from 'redux'
import arrayToObject from 'utils/arrayToObject'
import c from 'src/redux/constants'
import contacts from './contacts/reducer'
import photos from './photos/reducer'
import requirements from './requirements/reducer'
import additional_services from './additional_services/reducer'
import prices from './prices/reducer'
import omit from 'lodash/omit'

const entities = (state = {}, { type, payload, meta }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.places)
      }

    case c.DESTROY_PLACE_FULFILLED:
      return omit(state, meta.place_id)

    case c.SORT_PLACES_PENDING: {
      return {
        ...state,
        ...arrayToObject(meta.places),
      }
    }

    default:
      return state
  }
}

export default combineReducers({
  prices,
  additional_services,
  photos,
  contacts,
  entities,
  requirements,
})
