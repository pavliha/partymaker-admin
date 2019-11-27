import Http from 'services/Http'
import { basename } from 'path'

import picture from './picture'

const uploads = {

  picture,

  destroy(url) {
    return Http.delete(`/uploads/${basename(url)}`)
  },
}

export default uploads
