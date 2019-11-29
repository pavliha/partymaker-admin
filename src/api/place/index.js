import Http from 'services/Http'
import photos from './photos'
import contacts from './contacts'
import { stateToHTML } from 'draft-js-export-html'
import normalize from 'normalize-api'

const createForm = form => ({
  ...form,
  description: stateToHTML(form.description.getCurrentContent()),
})

const place = {

  photos,
  contacts,

  async loadMany() {
    const places = await Http.get(`/places`)
    return normalize(places, 'place')
  },

  async load(place_id) {
    const place = await Http.get(`/places/${place_id}`)
    return normalize(place, 'place')
  },

  async create(form) {
    const place = await Http.post(`/places`, createForm(form))
    return normalize(place, 'place')
  },

  async update(place_id, form) {
    const place = Http.put(`/places/${place_id}`, createForm(form))
    return normalize(place, 'place')
  },

  destroy(place_id) {
    return Http.delete(`places/${place_id}`)
  },
}

export default place
