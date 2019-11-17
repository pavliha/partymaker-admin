import { combineReducers } from 'redux'
import auth from './auth/reducer'
import users from './users/reducer'
import places from './places/reducer'
import accounts from './accounts/reducers'
import entertainments from './entertainments/reducer'
import ui from './ui/reducer'

export default combineReducers({
  auth,
  users,
  places,
  accounts,
  entertainments,
  ui,
})
