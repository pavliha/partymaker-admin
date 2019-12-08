import Http from 'services/Http'
import normalize from 'normalize-api'

const contacts = {

  async loadMany(place_id) {
    const contacts = await Http.get(`/places/${place_id}/contacts`)
    return normalize(contacts, 'contacts')
  },

  async load(place_id, contact_id) {
    const contact = await Http.get(`/places/${place_id}/contacts/${contact_id}`)
    return normalize(contact, 'contacts')
  },

  async create(place_id, form, config) {
    const contact = await Http.post(`/places/${place_id}/contacts`, form, config)
    return normalize(contact, 'contacts')
  },

  async update(place_id, contact_id, form) {
    const contact = await Http.put(`/places/${place_id}/contacts/${contact_id}`, form)
    return normalize(contact, 'contacts')
  },

  destroy(place_id, contact_id) {
    return Http.delete(`places/${place_id}/contacts/${contact_id}`)
  },
}

export default contacts
