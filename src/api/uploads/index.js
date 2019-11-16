import Http from 'services/Http'

import picture from './picture'

const uploads = {

  picture,

  destroy(filename) {
    return Http.delete(`/uploads/${filename}`)
  },
}

export default uploads
