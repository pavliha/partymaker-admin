import { createSelector } from 'reselect/lib/index'

const all = createSelector(
  state => Object.values(state.places.contacts.entities),
  contacts => contacts,
)

export default {
  all,
}
