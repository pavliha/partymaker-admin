import { createSelector } from 'reselect'
import contacts from './contacts/select'

const all = createSelector(
  state => Object.values(state.places.entities),
  state => state.entertainments.entities,
  state => Object.values(state.places.photos.entities),
  state => Object.values(state.places.contacts.entities),
  state => Object.values(state.places.requirements.entities),

  (places, entertainments, photos, contacts, requirements) => {
    return places.map(place => ({
      ...place,
      entertainment: entertainments[place.entertainment_id],
      photos: photos.filter(p => Number(p.place_id) === place.id),
      contacts: contacts.filter(p => Number(p.place_id) === place.id),
      requirements: requirements.filter(p => Number(p.place_id) === place.id),
    }))
  },
)

const current = (state, place_id) => createSelector(
  state => state.places.entities,
  state => state.entertainments.entities,
  state => Object.values(state.places.photos.entities),
  state => Object.values(state.places.contacts.entities),
  state => Object.values(state.places.requirements.entities),

  (places, entertainments, photos, contacts, requirements) => {
    const place = places[place_id]

    if (!place) return null

    return {
      ...place,
      entertainment: entertainments[place.entertainment_id],
      photos: photos.filter(p => Number(p.place_id) === place.id),
      contacts: contacts.find(c => Number(c.place_id) === place.id),
      requirements: requirements.find(c => Number(c.place_id) === place.id),
    }
  }
)(state)

export default {
  contacts,
  all,
  current
}
