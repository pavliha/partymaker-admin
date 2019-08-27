import { number, shape, string } from 'prop-types'

export default shape({
  id: number.isRequired,
  title: string,
  place_id: number,
  order_id: number,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})
