const transformValidationApi = error => {

  if (error?.error?.status === 500) {
    return { non_field_errors: 'Внутренння ошибка сервера!' }
  }
  if (error?.error?.message) {
    return { non_field_errors: 'Неизвестная ошибка!' }
  }

  if (error.message) return { non_field_errors: error.message }

  const isNetworkError = error?.message === 'Network Error'
  const isNotFoundError = error?.response?.status === 404

  if (isNetworkError || isNotFoundError) {
    return { non_field_errors: 'Something wrong with server response' }
  }
  const objectsArray = error.map(error => ({ [error.field]: error.message }))

  return objectsArray.reduce((result, current) => ({ ...result, ...current }))
}
export default transformValidationApi
