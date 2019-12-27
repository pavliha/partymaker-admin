import appendFileNameSuffix from './appendFileNameSuffix'

describe('appendFileNameSuffix.js', () => {
  it('should add suffix to file name from url ', () => {
    const result = appendFileNameSuffix('https://example.com/uploads/from-clipboard.jpg', '-thumbnail')
    expect(result).toBe('https://example.com/uploads/from-clipboard-thumbnail.jpg')
  })

  it('should add suffix to file name from filename ', () => {
    const result = appendFileNameSuffix('from-clipboard.jpg', '-thumbnail')
    expect(result).toBe('from-clipboard-thumbnail.jpg')
  })

  it('should add suffix to file name from filename without extension ', () => {
    const result = appendFileNameSuffix('from-clipboard', '-thumbnail')
    expect(result).toBe('from-clipboard-thumbnail')
  })
})
