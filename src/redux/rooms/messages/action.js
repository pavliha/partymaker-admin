import room from 'api/room'

export const LOAD_ROOM_MESSAGES = 'LOAD_ROOM_MESSAGES'
export const LOAD_ROOM_MESSAGES_FULFILLED = 'LOAD_ROOM_MESSAGES_FULFILLED'
export const CREATE_ROOM_MESSAGE = 'CREATE_ROOM_MESSAGE'
export const CREATE_ROOM_MESSAGE_PENDING = 'CREATE_ROOM_MESSAGE_PENDING'
export const CREATE_ROOM_MESSAGE_FULFILLED = 'CREATE_ROOM_MESSAGE_FULFILLED'
export const RECEIVE_ROOM_MESSAGE = 'RECEIVE_ROOM_MESSAGE'

/**
 * Websocket actions. Receive data
 */

const receive = (message) => ({
  type: RECEIVE_ROOM_MESSAGE,
  payload: message,
})

/**
 * Async actions. Making API requests
 */

const loadMany = (room_id, params) => ({
  type: LOAD_ROOM_MESSAGES,
  payload: room.messages.loadMany(room_id, params)
})

const create = (room_id, form) => ({
  type: CREATE_ROOM_MESSAGE,
  payload: room.messages.create(room_id, form),
  meta: { room_id, form }
})

export default {
  loadMany,
  create,
  receive,
}
