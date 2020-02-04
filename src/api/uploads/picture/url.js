import Http from 'services/Http'
import qs from 'querystring'

const url = {

  create({ url, type }) {
    const query = qs.stringify({ type })
    return Http.post(`/upload/url?${query}`, { url })
  },

}

export default url
