import place from 'api/place'

export const LOAD_PLACE = 'LOAD_PLACE'
export const LOAD_PLACE_FULFILLED = 'LOAD_PLACE_FULFILLED'

export const LOAD_PLACES = 'LOAD_PLACES'
export const LOAD_PLACES_FULFILLED = 'LOAD_PLACES_FULFILLED'

export const CREATE_PLACE = 'CREATE_PLACE'
export const CREATE_PLACE_FULFILLED = 'CREATE_PLACE_FULFILLED'

export const UPDATE_PLACE = 'UPDATE_PLACE'
export const UPDATE_PLACE_FULFILLED = 'UPDATE_PLACE_FULFILLED'

export const DESTROY_PLACE = 'DESTROY_PLACE'
export const DESTROY_PLACE_FULFILLED = 'DESTROY_PLACE_FULFILLED'

export const SET_PLACE = 'SET_PLACE'
export const SET_PLACES = 'SET_PLACES'
export const REMOVE_PLACE = 'REMOVE_PLACE'

/**
 * Async actions. Making API requests
 */

const load = (place_id) => ({
  type: LOAD_PLACE,
  payload: place.load(place_id)
})

const loadMany = () => ({
  type: LOAD_PLACES,
  payload: place.loadMany()
})

const create = form => ({
  type: CREATE_PLACE,
  payload: place.create(form)
})

const update = (place_id, form) => ({
  type: UPDATE_PLACE,
  payload: place.update(place_id, form)
})

const destroy = (place_id) => ({
  type: DESTROY_PLACE,
  payload: place.destroy(place_id),
  meta: { place_id }
})

/**
 * Sync actions. Updating store
 */

const setMany = places => ({
  type: SET_PLACES,
  payload: places,
})

const set = place => ({
  type: SET_PLACE,
  payload: place,
})

const remove = place_id => ({
  type: REMOVE_PLACE,
  payload: place_id,
})

export default {
  load,
  loadMany,
  create,
  update,
  destroy,
  set,
  setMany,
  remove,
}
