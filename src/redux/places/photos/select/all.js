import { createSelector } from 'reselect'

const all = (photos) => {
  return photos
}

export default createSelector(
  state => Object.values(state.photos.entities),
  all,
)
