import { all, takeEvery, put } from 'redux-saga/effects'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils'

import {
  CREATE_PHOTO_FULFILLED,
  LOAD_PHOTO_FULFILLED,
  UPDATE_PHOTO_FULFILLED,
  LOAD_PHOTOS_FULFILLED,
  DESTROY_PHOTO_FULFILLED
} from './action'

const defineRelationsFrom = (models) => ([
  [models.photo, actions.places.photos.setMany],
])

function * setPhotos({ payload: { data } }) {
  const models = normalize(data, 'photo')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * setPhoto({ payload: photo }) {
  yield put(actions.places.photos.set(photo))
}

function * removePhoto({ meta: { photo_id } }) {
  yield put(actions.places.photos.remove(photo_id))
}

export default function * saga() {
  yield all([
    takeEvery(LOAD_PHOTOS_FULFILLED, setPhotos),
    takeEvery(LOAD_PHOTO_FULFILLED, setPhoto),
    takeEvery(CREATE_PHOTO_FULFILLED, setPhoto),
    takeEvery(UPDATE_PHOTO_FULFILLED, setPhoto),
    takeEvery(DESTROY_PHOTO_FULFILLED, removePhoto),
  ])
}
