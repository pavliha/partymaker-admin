import { number, shape, string } from 'prop-types'

const entertainmentShape = shape({
  id: number.isRequired,
  title: string,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})

export default entertainmentShape
