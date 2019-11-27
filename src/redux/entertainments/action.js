import entertainment from 'api/entertainment'
import c from 'src/redux/constants'

/**
 * Async actions. Making API requests
 */

const loadMany = () => ({
  type: c.LOAD_ENTERTAINMENTS,
  payload: entertainment.loadMany(),
  meta: { normalize: 'entertainment' }
})

const load = (entertainment_id) => ({
  type: c.LOAD_ENTERTAINMENT,
  payload: entertainment.load(entertainment_id),
  meta: { normalize: 'entertainment' },
})

const create = form => ({
  type: c.CREATE_ENTERTAINMENT,
  payload: entertainment.create(form),
  meta: { normalize: 'entertainment' },
})

const update = (entertainment_id, form) => ({
  type: c.UPDATE_ENTERTAINMENT,
  payload: entertainment.update(entertainment_id, form),
  meta: { normalize: 'entertainment' },
})

const destroy = (entertainment_id) => ({
  type: c.DESTROY_ENTERTAINMENT,
  payload: entertainment.destroy(entertainment_id),
  meta: { entertainment_id }
})

const sort = (sorted_ids) => ({
  type: c.SORT_ENTERTAINMENTS,
  payload: entertainment.sort(sorted_ids),
  meta: { sorted_ids }
})

const set = (models) => ({
  type: c.SET_MODELS,
  payload: models
})

export default {
  loadMany,
  load,
  create,
  update,
  sort,
  destroy,
  set,
}
