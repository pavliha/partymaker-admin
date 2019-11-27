import { createSelector } from 'reselect'

const all = createSelector(
  state => Object.values(state.places.contacts.entities),
  photos => photos,
)

export default {
  all,
}
