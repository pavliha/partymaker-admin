import { createSelector } from 'reselect'
import photos from './photos/select'

const all = createSelector(
  state => Object.values(state.places.entities),
  state => state.entertainments.entities,
  state => Object.values(state.places.photos.entities),

  (places, entertainments, photos) => {
    return places.map(place => ({
      ...place,
      entertainment: entertainments[place.entertainment_id],
      photos: photos.filter(p => Number(p.place_id) === place.id),
    }))
  },
)

const current = (state, place_id) => createSelector(
  state => state.places.entities,
  state => state.entertainments.entities,
  state => photos.all(state),
  state => Object.values(state.places.contacts.entities),
  state => Object.values(state.places.requirements.entities),
  state => Object.values(state.places.additional_services.entities),
  state => Object.values(state.places.prices.entities),

  (
    places,
    entertainments,
    photos,
    contacts,
    requirements,
    additional_services,
    prices
  ) => {
    const place = places[place_id]

    if (!place) return null

    return {
      ...place,
      entertainment: entertainments[place.entertainment_id],
      photos: photos.filter(p => Number(p.place_id) === place.id),
      contacts: contacts.find(c => Number(c.place_id) === place.id),
      requirements: requirements.find(r => Number(r.place_id) === place.id),
      additional_services: additional_services.filter(as => Number(as.place_id) === place.id),
      prices: prices.filter(as => Number(as.place_id) === place.id),
    }
  }
)(state)

export default {
  photos,
  all,
  current
}
