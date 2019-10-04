import { LOAD_PHOTOS_FULFILLED } from '../action'

const initialState = {
  total: null,
  page: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PHOTOS_FULFILLED:
      return {
        ...state,
        page: payload.page,
        total: payload.total
      }

    default:
      return state
  }
}
