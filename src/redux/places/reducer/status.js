import { LOAD_PLACES_FULFILLED } from '../action'

const initialState = {
  total: null,
  page: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PLACES_FULFILLED:
      return {
        ...state,
        page: payload.page,
        total: payload.total
      }

    default:
      return state
  }
}
