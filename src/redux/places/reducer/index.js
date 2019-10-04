import { combineReducers } from 'redux'
import entities from './entities'
import status from './status'
import photos from '../photos/reducer'

export default combineReducers({
  photos,
  entities,
  status,
})
