import { createSelector } from 'reselect'

const all = createSelector(
  state => Object.values(state.places.requirements.entities),
  photos => photos,
)

export default {
  all,
}
