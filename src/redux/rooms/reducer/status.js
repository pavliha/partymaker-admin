import { LOAD_ROOM_MESSAGES_FULFILLED } from '../messages/action'
import { LOAD_ROOMS_FULFILLED } from '../action'

const initialState = {
  total: null,
  page: null,

  messages: {
    page: 1,
    total: 0,
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_ROOM_MESSAGES_FULFILLED:
      return {
        ...state,
        messages: {
          page: payload.page,
          total: payload.total
        },
      }

    case LOAD_ROOMS_FULFILLED:
      return {
        page: payload.page,
        total: payload.total,
      }

    default:
      return state
  }
}
