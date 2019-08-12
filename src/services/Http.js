import axios from 'axios'
import { store, actions } from 'src/redux'
import Auth from 'src/services/Auth'

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.BACKEND_URL,
      timeout: 20000,
    })
  }

  logout() {
    store.dispatch(actions.auth.logout())
  }

  authorize() {
    const token = Auth.token
    const { headers } = this.instance.defaults
    if (token) {
      headers.common.Authorization = `Bearer ${token}`
    }
  }

  handleError(err) {
    if (err?.response?.status === 401) this.logout()
    if (err?.response?.status === 404) throw err
    if (err?.response?.data) throw err.response.data
    if (err?.response) throw err.response
    if (err) throw err
  }

  async request(method, url, params, config) {
    this.authorize()
    try {
      const { data } = await this.instance[method](url, params, config)

      return data
    } catch (err) {
      this.handleError(err)
    }
  }

  get(url, params) {
    return this.request('get', url, params)
  }

  post(url, params, config) {
    return this.request('post', url, params, config)
  }

  put(url, params) {
    return this.request('put', url, params)
  }

  delete(url, params) {
    return this.request('delete', url, params)
  }

  patch(url, params) {
    return this.request('patch', url, params)
  }
}

const http = new Http()

export default http
