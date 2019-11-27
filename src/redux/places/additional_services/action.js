import c from 'src/redux/constants'

const remove = additional_service_id => ({
  type: c.REMOVE_ADDITIONAL_SERVICE,
  payload: additional_service_id
})

export default {
  remove
}
