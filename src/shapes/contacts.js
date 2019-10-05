import { number, shape, string } from 'prop-types'

const contactsShape = shape({
  id: number,
  phone: string,
  website_url: string,
  map_url: string,
  address: string,
  email: string,
  instagram_url: string,
  created_at: string,
  updated_at: string,
})

export default contactsShape
