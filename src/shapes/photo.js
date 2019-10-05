import { number, oneOfType, shape, string } from 'prop-types'

const photoShape = shape({
  id: number,
  url: string,
  place_id: oneOfType([number, string]),
  created_at: string,
  updated_at: string,
})

export default photoShape
