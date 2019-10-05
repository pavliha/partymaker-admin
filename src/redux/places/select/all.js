import { createSelector } from 'reselect'

const all = (places, entertainments, photos, contacts) => {
  return places.map(place => ({
    ...place,
    entertainment: entertainments[place.entertainment_id],
    photos: photos.filter(p => Number(p.place_id) === place.id),
    contacts: contacts[place.contacts_id],
  }))
}

export default createSelector(
  state => Object.values(state.places.entities),
  state => state.entertainments.entities,
  state => Object.values(state.places.photos.entities),
  state => state.places.contacts.entities,
  all,
)
