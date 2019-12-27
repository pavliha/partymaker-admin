import transformValidationApi from './transformValidationApi'

describe('transformValidationApi.js', () => {
  const internalServerError = {
    'error': {
      'message': 'The "url" argument must be of type string. Received type object',
      'name': 'TypeError',
      'status': 500,
    }
  }

  const validationError = [{
    'message': 'required validation failed on email',
    'field': 'email',
    'validation': 'required'
  }]

  it('should covert InternalServerError to compatible format', () => {
    const response = transformValidationApi(internalServerError)
    expect(response).toStrictEqual({ 'non_field_errors': 'Внутренння ошибка сервера!' })
  })

  it('should covert ValidationError to compatible format', () => {
    const response = transformValidationApi(validationError)
    expect(response).toStrictEqual({ 'email': 'required validation failed on email' })
  })
})
