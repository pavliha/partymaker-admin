class Search {
  isMatches = (model, search) => {

    let matches = []
    for (const [key, value] of Object.entries(model)) {
      if (typeof search[key] !== 'undefined') {
        if (this.hasEntry(value, search[key])) {
          matches.push(key)
        }
      }
    }

    const matchesMustBe = Object.keys(search).length

    return matches.length >= matchesMustBe
  }

  hasEntry = (value, keyword) => {

    if (value === keyword) return true

    return String(value)
      .toLowerCase()
      .includes(String(keyword).toLowerCase())
  }

  findIds = (models, search) =>
    models
      .map(model => this.isMatches(model, search) ? model.id : null)
      .filter(model => !!model)

  cleanSearch = (search) => {
    if (!search) return {}
    const entries = Object.entries(search).filter(([, value]) => value !== '')

    return entries.reduce((a, [k, v]) => {
      a[k] = v

      return a
    }, {})
  }
}

export default new Search()
