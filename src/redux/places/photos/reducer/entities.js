import { SET_PHOTO, SET_PHOTOS, REMOVE_PHOTO } from '../action'
import arrayToObject from 'utils/arrayToObject'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_PHOTOS:
      return {
        ...state,
        ...arrayToObject(payload)
      }

    case SET_PHOTO:
      return {
        ...state,
        [payload.id]: payload,
      }

    case REMOVE_PHOTO: {
      const photos = { ...state }
      delete photos[payload]

      return photos
    }

    default:
      return state
  }
}
