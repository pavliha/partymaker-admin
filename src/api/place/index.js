import Http from 'services/Http'

import photos from './photos'
import contacts from './contacts'
import clean from 'clean-object'
import { stateToHTML } from 'draft-js-export-html'

const createFormRequest = form => clean({
  title: form.title,
  picture_url: form.picture_url,
  price: form.price,
  working_hours: form.working_hours,
  entertainment_id: form.entertainment_id || null,
  prices: form.prices,
  about_prices: form.about_prices,
  photos: form.photos,
  additional_services: form.additional_services,
  description: stateToHTML(form.description.getCurrentContent()),
  requirements: {
    min_order_amount: form.min_order_amount,
    age_min: form.age_min,
    age_max: form.age_max,
    players_min: form.players_min,
    players_max: form.players_max,
  },
  contacts: {
    phone: form.phone,
    website_url: form.website_url,
    map_url: form.map_url,
    address: form.address,
    directions: form.directions,
    email: form.email,
    instagram_url: form.instagram_url,
  },
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
