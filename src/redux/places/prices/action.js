import c from 'src/redux/constants'

const remove = price_id => ({
  type: c.REMOVE_PRICE,
  payload: price_id
})

export default {
  remove
}
