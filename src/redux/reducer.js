import { combineReducers } from 'redux'
import auth from './auth/reducer'
import users from './users/reducer'
import places from './places/reducer'
import entertainments from './entertainments/reducer'

export default combineReducers({
  auth,
  users,
  places,
  entertainments,
})
