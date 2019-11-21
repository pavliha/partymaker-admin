import Http from 'services/Http'

import photos from './photos'
import contacts from './contacts'
import clean from 'clean-object'
import { stateToHTML } from 'draft-js-export-html'

const createForm = (values) => clean({
  ...values,
  description: stateToHTML(values.description.getCurrentContent())
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
    return Http.post(`/places`, createForm(form))
  },

  update(place_id, form) {
    return Http.put(`/places/${place_id}`, createForm(form))
  },

  destroy(place_id) {
    return Http.delete(`places/${place_id}`)
  },
}

export default place
