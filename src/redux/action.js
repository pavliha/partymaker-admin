import auth from './auth/action'
import places from './places/action'
import entertainments from './entertainments/action'
import { c } from 'src/redux'

const setModels = models => ({
  type: c.SET_MODELS,
  payload: models,
})

export default {
  setModels,
  auth,
  places,
  entertainments,
}
