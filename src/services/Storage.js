
const storage = {

  get(item) {
    return JSON.parse(localStorage.getItem(item))
  },

  put(items) {
    const entries = Object.entries(items)
    entries.forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
  },

  clear() {
    localStorage.clear()
  }

}

export default storage
