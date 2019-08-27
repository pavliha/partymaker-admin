import { all, takeEvery, put } from 'redux-saga/effects'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils'

import {
  CREATE_PLACE_FULFILLED,
  LOAD_PLACE_FULFILLED,
  UPDATE_PLACE_FULFILLED,
  LOAD_PLACES_FULFILLED,
  DESTROY_PLACE_FULFILLED
} from './action'

const defineRelationsFrom = (models) => ([
  [models.place, actions.places.setMany],
])

function* setPlaces({ payload: { data: rooms } }) {
  const models = normalize(rooms, 'place')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function* setPlace({ payload: place }) {
  yield put(actions.places.set(place))
}

function* removePlace({ meta: { place_id } }) {
  yield put(actions.places.remove(place_id))
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_PLACES_FULFILLED, setPlaces),
    takeEvery(LOAD_PLACE_FULFILLED, setPlace),
    takeEvery(CREATE_PLACE_FULFILLED, setPlace),
    takeEvery(UPDATE_PLACE_FULFILLED, setPlace),
    takeEvery(DESTROY_PLACE_FULFILLED, removePlace),
  ])
}
