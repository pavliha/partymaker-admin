import Http from 'services/Http'
import normalize from 'normalize-api'

const entertainment = {

  async loadMany() {
    const entertainments = await Http.get(`/entertainments`)
    return normalize(entertainments, 'entertainment')
  },

  async load(entertainment_id) {
    const entertainment = await Http.get(`/entertainments/${entertainment_id}`)
    return normalize(entertainment, 'entertainment')
  },

  async create(form) {
    const entertainment = await Http.post(`/entertainments`, form)
    return normalize(entertainment, 'entertainment')
  },

  async update(entertainment_id, form) {
    const entertainment = await Http.put(`/entertainments/${entertainment_id}`, form)
    return normalize(entertainment, 'entertainment')
  },

  async destroy(entertainment_id) {
    return Http.delete(`entertainments/${entertainment_id}`)
  },

  sort(sorted_ids) {
    return Http.post(`entertainments/sort`, { sorted_ids })
  }
}

export default entertainment
