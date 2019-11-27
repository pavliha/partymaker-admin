import { createSelector } from 'reselect'

const all = createSelector(
  state => Object.values(state.entertainments.entities),
  state => Object.values(state.places.entities),

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
