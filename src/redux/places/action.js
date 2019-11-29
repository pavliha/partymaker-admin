import place from 'api/place'
import c from 'src/redux/constants'
import photos from './photos/action'
import additional_services from './additional_services/action'
import prices from './prices/action'

const load = place_id => ({
  type: c.LOAD_PLACE,
  payload: place.load(place_id),
})

const loadMany = () => ({
  type: c.LOAD_PLACES,
  payload: place.loadMany(),
})

const create = form => ({
  type: c.CREATE_PLACE,
  payload: place.create(form),
})

const update = (place_id, form) => ({
  type: c.UPDATE_PLACE,
  payload: place.update(place_id, form),
})

const destroy = place_id => ({
  type: c.DESTROY_PLACE,
  payload: place.destroy(place_id),
})

export default {
  additional_services,
  prices,
  photos,
  load,
  loadMany,
  create,
  update,
  destroy,
}
