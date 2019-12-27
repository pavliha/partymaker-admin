import arrayToObject from './arrayToObject'

describe('arrayToObject.js', () => {
  it('should convert array of objects to object with objects', () => {
    const array = [{ id: 12, name: 'hello' }]
    const result = arrayToObject(array)
    expect(result).toStrictEqual({ 12: { id: 12, name: 'hello' } })
  })

  it('should throw without id', () => {
    const array = [{ name: 'hello' }]
    expect(() => arrayToObject(array)).toThrowError('id not found inside object')
  })
})
