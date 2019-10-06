import contact from 'api/place/contacts'

export const LOAD_CONTACT = 'LOAD_CONTACT'
export const LOAD_CONTACT_FULFILLED = 'LOAD_CONTACT_FULFILLED'

export const LOAD_CONTACTS = 'LOAD_CONTACTS'
export const LOAD_CONTACTS_FULFILLED = 'LOAD_CONTACTS_FULFILLED'

export const CREATE_CONTACT = 'CREATE_CONTACT'
export const CREATE_CONTACT_FULFILLED = 'CREATE_CONTACT_FULFILLED'

export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const UPDATE_CONTACT_FULFILLED = 'UPDATE_CONTACT_FULFILLED'

export const DESTROY_CONTACT = 'DESTROY_CONTACT'
export const DESTROY_CONTACT_FULFILLED = 'DESTROY_CONTACT_FULFILLED'

export const SET_CONTACT = 'SET_CONTACT'
export const SET_CONTACTS = 'SET_CONTACTS'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'

/**
 * Async actions. Making API requests
 */

const load = (contact_id) => ({
  type: LOAD_CONTACT,
  payload: contact.load(contact_id)
})

const loadMany = () => ({
  type: LOAD_CONTACTS,
  payload: contact.loadMany()
})

const create = (place_id, form) => ({
  type: CREATE_CONTACT,
  payload: contact.create(place_id, form)
})

const update = (place_id, contact_id, form) => ({
  type: UPDATE_CONTACT,
  payload: contact.update(place_id, contact_id, form)
})

const destroy = (contact_id) => ({
  type: DESTROY_CONTACT,
  payload: contact.destroy(contact_id),
  meta: { contact_id }
})

/**
 * Sync actions. Updating store
 */

const setMany = contacts => ({
  type: SET_CONTACTS,
  payload: contacts,
})

const set = contact => ({
  type: SET_CONTACT,
  payload: contact,
})

const remove = contact_id => ({
  type: REMOVE_CONTACT,
  payload: contact_id,
})

export default {
  load,
  loadMany,
  create,
  update,
  destroy,
  set,
  setMany,
  remove,
}
