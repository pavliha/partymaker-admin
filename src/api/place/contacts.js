import Http from 'services/Http'

const contacts = {

  loadMany(place_id) {
    return Http.get(`/places/${place_id}/contacts`)
  },

  load(place_id, contact_id) {
    return Http.get(`/places/${place_id}/contacts/${contact_id}`)
  },

  create(place_id, form, config) {
    return Http.post(`/places/${place_id}/contacts`, form, config)
  },

  update(place_id, contact_id, form) {
    return Http.put(`/places/${place_id}/contacts/${contact_id}`, form)
  },

  destroy(place_id, contact_id) {
    return Http.delete(`places/${place_id}/contacts/${contact_id}`)
  },
}

export default contacts
