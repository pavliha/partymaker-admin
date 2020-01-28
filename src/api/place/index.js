import Http from 'services/Http'
import photos from './photos'
import contacts from './contacts'
import { convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import normalize from 'normalize-api'

const saveDescription = (description) => {
  try {
    return JSON.stringify(convertToRaw(description.getCurrentContent()))
  } catch (e) {
    return stateToHTML(description.getCurrentContent())
  }
}

const createForm = form => ({
  ...form,
  description: saveDescription(form.description)
})

const place = {

  photos,
  contacts,

  async loadMany() {
    const places = await Http.get(`/places`)
    return normalize(places, 'places')
  },

  async load(place_id) {
    const place = await Http.get(`/places/${place_id}`)
    return normalize(place, 'places')
  },

  async create(form) {
    const place = await Http.post(`/places`, createForm(form))
    return normalize(place, 'places')
  },

  async update(place_id, form) {
    const place = await Http.put(`/places/${place_id}`, createForm(form))
    return normalize(place, 'places')
  },

  destroy(place_id) {
    return Http.delete(`/places/${place_id}`)
  },

  sort(places) {
    const toSort = places.map(e => ({ id: e.id, order: e.order }))
    return Http.patch(`/places/sort`, toSort)
  }
}

export default place
