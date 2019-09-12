import entertainment from 'api/entertainment'

export const LOAD_ENTERTAINMENTS = 'LOAD_ENTERTAINMENTS'
export const LOAD_ENTERTAINMENTS_FULFILLED = 'LOAD_ENTERTAINMENTS_FULFILLED'
export const LOAD_ENTERTAINMENT = 'LOAD_ENTERTAINMENT'
export const LOAD_ENTERTAINMENT_FULFILLED = 'LOAD_ENTERTAINMENT_FULFILLED'
export const CREATE_ENTERTAINMENT = 'CREATE_ENTERTAINMENT'
export const CREATE_ENTERTAINMENT_FULFILLED = 'CREATE_ENTERTAINMENT_FULFILLED'
export const UPDATE_ENTERTAINMENT = 'UPDATE_ENTERTAINMENT'
export const UPDATE_ENTERTAINMENT_FULFILLED = 'UPDATE_ENTERTAINMENT_FULFILLED'
export const DESTROY_ENTERTAINMENT = 'DESTROY_ENTERTAINMENT'
export const DESTROY_ENTERTAINMENT_FULFILLED = 'DESTROY_ENTERTAINMENT_FULFILLED'
export const SORT_ENTERTAINMENTS = 'SORT_ENTERTAINMENTS'
export const SET_ENTERTAINMENT = 'SET_ENTERTAINMENT'
export const SET_ENTERTAINMENTS = 'SET_ENTERTAINMENTS'
export const REMOVE_ENTERTAINMENT = 'REMOVE_ENTERTAINMENT'

/**
 * Async actions. Making API requests
 */

const loadMany = () => ({
  type: LOAD_ENTERTAINMENTS,
  payload: entertainment.loadMany()
})

const load = (entertainment_id) => ({
  type: LOAD_ENTERTAINMENT,
  payload: entertainment.load(entertainment_id)
})

const create = form => ({
  type: CREATE_ENTERTAINMENT,
  payload: entertainment.create(form)
})

const update = (entertainment_id, form) => ({
  type: UPDATE_ENTERTAINMENT,
  payload: entertainment.update(entertainment_id, form)
})

const destroy = (entertainment_id) => ({
  type: DESTROY_ENTERTAINMENT,
  payload: entertainment.destroy(entertainment_id),
  meta: { entertainment_id }
})

const sort = (sorted_ids) => ({
  type: SORT_ENTERTAINMENTS,
  payload: entertainment.sort(sorted_ids),
  meta: { sorted_ids }
})

/**
 * Sync actions. Updating store
 */

const setMany = entertainments => ({
  type: SET_ENTERTAINMENTS,
  payload: entertainments,
})

const set = entertainment => ({
  type: SET_ENTERTAINMENT,
  payload: entertainment,
})

const remove = entertainment_id => ({
  type: REMOVE_ENTERTAINMENT,
  payload: entertainment_id,
})

export default {
  loadMany,
  load,
  create,
  update,
  set,
  sort,
  setMany,
  remove,
  destroy,
}
