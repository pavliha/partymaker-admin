import { number, shape, string } from 'prop-types'

const assetShape = shape({
  id: number,
  title: string,
  url: string,
  created_at: string,
  updated_at: string,
})

export default assetShape
