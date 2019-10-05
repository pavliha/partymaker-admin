import { createSelector } from 'reselect'

const current = (place_id) => (places, entertainments, photos, contacts) => {
  const place = places[place_id]

  if (!place) return null

  return {
    ...place,
    entertainment: entertainments[place.entertainment_id],
    photos: photos.filter(p => Number(p.place_id) === place.id),
    contacts: contacts[place.contacts_id],
  }
}

export default (state, place_id) =>
  createSelector(
    state => state.places.entities,
    state => state.entertainments.entities,
    state => Object.values(state.places.photos.entities),
    state => state.places.contacts.entities,
    current(Number(place_id)),
  )(state)
