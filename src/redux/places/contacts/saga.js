import { all, takeEvery, put } from 'redux-saga/effects'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils'

import {
  CREATE_CONTACT_FULFILLED,
  LOAD_CONTACT_FULFILLED,
  UPDATE_CONTACT_FULFILLED,
  LOAD_CONTACTS_FULFILLED,
  DESTROY_CONTACT_FULFILLED
} from './action'

const defineRelationsFrom = (models) => ([
  [models.contact, actions.places.contacts.setMany],
])

function * setContacts({ payload: { data } }) {
  const models = normalize(data, 'contact')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * setContact({ payload: contact }) {
  yield put(actions.places.contacts.set(contact))
}

function * removeContact({ meta: { contact_id } }) {
  yield put(actions.places.contacts.remove(contact_id))
}

export default function * saga() {
  yield all([
    takeEvery(LOAD_CONTACTS_FULFILLED, setContacts),
    takeEvery(LOAD_CONTACT_FULFILLED, setContact),
    takeEvery(CREATE_CONTACT_FULFILLED, setContact),
    takeEvery(UPDATE_CONTACT_FULFILLED, setContact),
    takeEvery(DESTROY_CONTACT_FULFILLED, removeContact),
  ])
}
