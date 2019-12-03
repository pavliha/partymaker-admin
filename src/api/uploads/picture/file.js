import Http from 'services/Http'

const defineConfig = ({ progress }) => ({
  onUploadProgress: e => {
    const percentage = Math.round((e.loaded * 100) / e.total)
    progress(percentage)
  }
})

const file = {

  create({ type, file, progress }) {
    const form = new FormData()
    form.append('file', file)
    const config = defineConfig({ progress })
    return Http.post(`/upload/picture/file?type=${type}`, form, config)
  },

}

export default file
