import photo from 'api/place/photos'

export const LOAD_PHOTO = 'LOAD_PHOTO'
export const LOAD_PHOTO_FULFILLED = 'LOAD_PHOTO_FULFILLED'

export const LOAD_PHOTOS = 'LOAD_PHOTOS'
export const LOAD_PHOTOS_FULFILLED = 'LOAD_PHOTOS_FULFILLED'

export const CREATE_PHOTO = 'CREATE_PHOTO'
export const CREATE_PHOTO_FULFILLED = 'CREATE_PHOTO_FULFILLED'

export const UPDATE_PHOTO = 'UPDATE_PHOTO'
export const UPDATE_PHOTO_FULFILLED = 'UPDATE_PHOTO_FULFILLED'

export const DESTROY_PHOTO = 'DESTROY_PHOTO'
export const DESTROY_PHOTO_FULFILLED = 'DESTROY_PHOTO_FULFILLED'

export const SET_PHOTO = 'SET_PHOTO'
export const SET_PHOTOS = 'SET_PHOTOS'
export const REMOVE_PHOTO = 'REMOVE_PHOTO'

/**
 * Async actions. Making API requests
 */

const load = (photo_id) => ({
  type: LOAD_PHOTO,
  payload: photo.load(photo_id)
})

const loadMany = () => ({
  type: LOAD_PHOTOS,
  payload: photo.loadMany()
})

const create = (place_id, form) => ({
  type: CREATE_PHOTO,
  payload: photo.create(place_id, form)
})

const update = (photo_id, form) => ({
  type: UPDATE_PHOTO,
  payload: photo.update(photo_id, form)
})

const destroy = (place_id, photo_id) => ({
  type: DESTROY_PHOTO,
  payload: photo.destroy(place_id, photo_id),
  meta: { place_id, photo_id }
})

/**
 * Sync actions. Updating store
 */

const setMany = photos => ({
  type: SET_PHOTOS,
  payload: photos,
})

const set = photo => ({
  type: SET_PHOTO,
  payload: photo,
})

const remove = photo_id => ({
  type: REMOVE_PHOTO,
  payload: photo_id,
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
