import room from 'api/room'
import messages from './messages/action'
import guests from './guests/action'

export const LOAD_ROOMS = 'LOAD_ROOMS'
export const LOAD_ROOMS_FULFILLED = 'LOAD_ROOMS_FULFILLED'
export const LOAD_ROOM = 'LOAD_ROOM'
export const LOAD_ROOM_FULFILLED = 'LOAD_ROOM_FULFILLED'
export const CREATE_ROOM = 'CREATE_ROOM'
export const CREATE_ROOM_FULFILLED = 'CREATE_ROOM_FULFILLED'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const UPDATE_ROOM_FULFILLED = 'UPDATE_ROOM_FULFILLED'
export const DESTROY_ROOM = 'DESTROY_ROOM'
export const DESTROY_ROOM_FULFILLED = 'DESTROY_ROOM_FULFILLED'
export const SET_ROOMS = 'SET_ROOMS'
export const SET_ROOM = 'SET_ROOM'
export const REMOVE_ROOM = 'REMOVE_ROOM'

const loadMany = () => ({
  type: LOAD_ROOMS,
  payload: room.loadMany()
})

const load = (room_id) => ({
  type: LOAD_ROOM,
  payload: room.load(room_id)
})

const create = (form) => ({
  type: CREATE_ROOM,
  payload: room.create(form)
})

const update = (id, form) => ({
  type: UPDATE_ROOM,
  payload: room.update(id, form)
})

const destroy = (room_id) => ({
  type: DESTROY_ROOM,
  payload: room.destroy(room_id),
  meta: { room_id }
})

const setMany = rooms => ({
  type: SET_ROOMS,
  payload: rooms,
})

const set = room => ({
  type: SET_ROOM,
  payload: room,
})

const remove = room_id => ({
  type: REMOVE_ROOM,
  payload: room_id,
})

export default {
  guests,
  messages,
  loadMany,
  load,
  create,
  update,
  destroy,
  set,
  setMany,
  remove,
}
