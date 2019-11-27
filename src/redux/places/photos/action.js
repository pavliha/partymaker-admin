import c from 'src/redux/constants'

const remove = photo_id => ({
  type: c.REMOVE_PLACE_PHOTO,
  payload: photo_id
})

export default {
  remove
}
