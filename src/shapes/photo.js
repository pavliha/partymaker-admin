import { number, shape, string } from 'prop-types'

const photoShape = shape({
  id: number,
  url: string,
  place_id: string,
  created_at: string,
  updated_at: string,
})

export default photoShape
