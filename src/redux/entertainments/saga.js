import { all, takeEvery, put } from 'redux-saga/effects'
import {
  CREATE_ENTERTAINMENT_FULFILLED,
  LOAD_ENTERTAINMENT_FULFILLED,
  UPDATE_ENTERTAINMENT_FULFILLED,
  LOAD_ENTERTAINMENTS_FULFILLED,
  DESTROY_ENTERTAINMENT_FULFILLED,
} from './action'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils/index'

const defineRelationsFrom = (models) => ([
  [models.entertainment, actions.entertainments.setMany],
  [models.places, actions.places.setMany],
])

function * setEntertainments({ payload }) {
  const models = normalize(payload, 'entertainment')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * setEntertainment({ payload }) {
  const models = normalize(payload, 'entertainment')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * removeEntertainment({ meta: { entertainment_id } }) {
  yield put(actions.entertainments.remove(entertainment_id))
}

export default function * saga() {
  yield all([
    takeEvery(LOAD_ENTERTAINMENTS_FULFILLED, setEntertainments),
    takeEvery(LOAD_ENTERTAINMENT_FULFILLED, setEntertainment),
    takeEvery(CREATE_ENTERTAINMENT_FULFILLED, setEntertainment),
    takeEvery(UPDATE_ENTERTAINMENT_FULFILLED, setEntertainment),
    takeEvery(DESTROY_ENTERTAINMENT_FULFILLED, removeEntertainment)

  ])
}
