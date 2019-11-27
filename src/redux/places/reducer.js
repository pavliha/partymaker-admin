import { combineReducers } from 'redux'
import arrayToObject from 'utils/arrayToObject'
import c from 'src/redux/constants'
import contacts from './contacts/reducer'
import photos from './photos/reducer'
import requirements from './requirements/reducer'
import additional_services from './additional_services/reducer'

const entities = (state = {}, { type, payload, meta }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.place || payload.places)
      }

    case c.DESTROY_PLACE_FULFILLED: {
      const places = { ...state }
      delete places[meta.place_id]

      return places
    }

    default:
      return state
  }
}

export default combineReducers({
  additional_services,
  photos,
  contacts,
  entities,
  requirements,
})
