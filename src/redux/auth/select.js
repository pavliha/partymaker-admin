import { createSelector } from 'reselect'

const user = createSelector(
  state => state.users.entities,
  state => state.auth.user_id,

  (users, user_id) => {
    const user = users[user_id]
    if (!user) return null
    return user
  },
)

export default { user }
