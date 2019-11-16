import Http from 'services/Http'

const defineConfig = ({ progress }) => ({
  onUploadProgress: e => {
    const percentage = Math.round((e.loaded * 100) / e.total)
    progress(percentage)
  }
})

const file = {

  create(file, progress) {
    const form = new FormData()
    form.append('file', file)
    const config = defineConfig({ progress })
    return Http.post('/uploads/picture/file', form, config)
  },

}

export default file
