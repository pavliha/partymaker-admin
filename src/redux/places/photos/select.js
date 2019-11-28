import { createSelector } from 'reselect'
import sortBy from 'lodash/sortBy'

const all = createSelector(
  state => Object.values(state.places.photos.entities),

  (photos) => {
    return sortBy(photos, 'order')
  },
)

export default {
  all,
}
