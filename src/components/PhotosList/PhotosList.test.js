import React from 'react'
import PhotosList from './PhotosList'
import PhotoListItem from 'components/PhotoListItem'

describe('<PhotosList />', () => {

  const testProps = {
    photos: [{ id: 1, url: 'http://domain.com/fake.jpg' }],
    onDelete: () => {},
  }

  const setup = (Component) => mount(Component)

  const photoSchema = expect.objectContaining({
    id: 1,
    url: 'http://domain.com/fake.jpg'
  })

  it('should show list of photos', () => {
    const field = setup(<PhotosList {...testProps} />)
    expect(field.find(PhotoListItem)).toHaveLength(1)
  })

  it('should handle delete', () => {
    const deleteFn = jest.fn()
    const field = setup(<PhotosList {...testProps} onDelete={deleteFn} />)
    const listItem = field.find(PhotoListItem)
    listItem.props().onDelete(testProps.photos[0])
    expect(deleteFn).toBeCalledWith(photoSchema)
  })

})
