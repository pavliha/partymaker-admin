import { all, takeEvery, put, fork } from 'redux-saga/effects'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils'
import photos from './photos/saga'
import contacts from './contacts/saga'

import {
  CREATE_PLACE_FULFILLED,
  LOAD_PLACE_FULFILLED,
  UPDATE_PLACE_FULFILLED,
  LOAD_PLACES_FULFILLED,
  DESTROY_PLACE_FULFILLED
} from './action'

const defineRelationsFrom = (models) => ([
  [models.place, actions.places.setMany],
  [models.entertainment, actions.entertainments.setMany],
  [models.photos, actions.places.photos.setMany],
  [models.contacts, actions.places.contacts.setMany]
])

function * setPlaces({ payload: { data } }) {
  const models = normalize(data, 'place')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * setPlace({ payload }) {
  const models = normalize(payload, 'place')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * removePlace({ meta: { place_id } }) {
  yield put(actions.places.remove(place_id))
}

export default function * saga() {
  yield all([
    fork(contacts),
    fork(photos),
    takeEvery(LOAD_PLACES_FULFILLED, setPlaces),
    takeEvery(LOAD_PLACE_FULFILLED, setPlace),
    takeEvery(CREATE_PLACE_FULFILLED, setPlace),
    takeEvery(UPDATE_PLACE_FULFILLED, setPlace),
    takeEvery(DESTROY_PLACE_FULFILLED, removePlace),
  ])
}
