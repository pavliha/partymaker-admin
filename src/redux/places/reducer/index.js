import { combineReducers } from 'redux'
import entities from './entities'
import status from './status'
import photos from '../photos/reducer'
import contacts from '../contacts/reducer'

export default combineReducers({
  photos,
  contacts,
  entities,
  status,
})
