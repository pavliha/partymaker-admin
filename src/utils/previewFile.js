const previewFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => {
    resolve(reader.result)
  }
  try {
    reader.readAsDataURL(file)
  } catch (err) {
    reject(err)
  }
})

export default previewFile
