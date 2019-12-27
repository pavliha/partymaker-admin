import { number, shape, string } from 'prop-types'

const entertainmentShape = shape({
  id: number.isRequired,
  title: string,
  created_at: string,
  updated_at: string,
})

export default entertainmentShape
