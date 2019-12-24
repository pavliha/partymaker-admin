import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

const all = createSelector(
  state => Object.values(state.entertainments.entities),
  state => sortBy(Object.values(state.places.entities), 'order'),

  (entertainments, places) =>
    entertainments
      .map(entertainment => ({
        ...entertainment,
        places: places.filter(p => p.entertainment_id === entertainment.id)
      }))
      .sort((prev, next) => prev.order - next.order)
)

export default {
  all
}
