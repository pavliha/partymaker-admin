import { createSelector } from 'reselect'

const all = (places, entertainments, photos) => {
  return places.map(place => ({
    ...place,
    entertainment: entertainments[place.entertainment_id],
    photos: photos.filter(p => Number(p.place_id) === place.id)
  }))
}

export default createSelector(
  state => Object.values(state.places.entities),
  state => state.entertainments.entities,
  state => Object.values(state.places.photos.entities),
  all,
)
