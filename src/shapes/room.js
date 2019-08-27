import { number, shape, string } from 'prop-types'

export default shape({
  id: number.isRequired,
  title: string,
  place_id: number,
  order_id: number,
  invite_token: string.isRequired,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})
