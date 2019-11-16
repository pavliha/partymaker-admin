import Http from 'services/Http'
import qs from 'querystring'

const url = {

  create(url, type) {
    const query = qs.stringify({ type })
    return Http.post(`/uploads/picture/url?${query}`, { url })
  },

}

export default url
