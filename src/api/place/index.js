import Http from 'services/Http'

import photos from './photos'
import contacts from './contacts'
import clean from 'clean-object'
import { stateToHTML } from 'draft-js-export-html'

const createFormRequest = (form) => clean({
  ...form,
  requirements: clean({
    min_order_amount: form.min_order_amount,
    age_min: form.age_min,
    age_max: form.age_max,
    players_min: form.players_min,
    players_max: form.players_max,
  }),
  description: stateToHTML(form.description.getCurrentContent())
})

const place = {

  photos,

  contacts,

  loadMany() {
    return Http.get(`/places`)
  },

  load(place_id) {
    return Http.get(`/places/${place_id}`)
  },

  create(form) {
    return Http.post(`/places`, createFormRequest(form))
  },

  update(place_id, form) {
    return Http.put(`/places/${place_id}`, createFormRequest(form))
  },

  destroy(place_id) {
    return Http.delete(`places/${place_id}`)
  },
}

export default place
