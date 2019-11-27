import { arrayOf, number, shape, string } from 'prop-types'
import photoShape from './photo'

const placeShape = shape({
  id: number.isRequired,
  title: string.isRequired,
  picture_url: string,
  price: string,
  working_hours: string,
  created_at: string,
  updated_at: string,
  entertainment_id: number.isRequired,
  photos: arrayOf(photoShape)
})

export default placeShape
