import Http from 'services/Http'

const photos = {

  loadMany(place_id) {
    return Http.get(`/places/${place_id}/photos`)
  },

  load(place_id, photo_id) {
    return Http.get(`/places/${place_id}/photos/${photo_id}`)
  },

  create(place_id, form, config) {
    return Http.post(`/places/${place_id}/photos`, form, config)
  },

  update(place_id, photo_id, form) {
    return Http.put(`/places/${place_id}/photos/${photo_id}`, form)
  },

  destroy(place_id, photo_id) {
    return Http.delete(`places/${place_id}/photos/${photo_id}`)
  },
}

export default photos
