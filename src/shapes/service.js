import { number, shape, string } from 'prop-types'

const serviceShape = shape({
  id: number.isRequired,
  title: string.isRequired,
  description: string,
  price: number,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})

export default serviceShape
