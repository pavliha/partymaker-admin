import React from 'react'
import PhotoListItem from './PhotoListItem'
import { IconButton } from '@material-ui/core'

describe('<PhotoListItem />', () => {

  const testProps = {
    photo: { id: 1, url: 'http://domain.com/fake.jpg' },
    onDelete: () => {},
  }

  const setup = (Component) => mount(Component)

  const photoSchema = expect.objectContaining({
    id: 1,
    url: 'http://domain.com/fake.jpg'
  })

  it('should show photo', () => {
    const field = setup(<PhotoListItem {...testProps} />)
    expect(field.find('img').props().src).toBe('http://domain.com/fake.jpg')
  })

  it('should handle delete', () => {
    const deleteFn = jest.fn()
    const field = setup(<PhotoListItem {...testProps} onDelete={deleteFn} />)
    const listItem = field.find(IconButton)
    listItem.props().onClick()
    expect(deleteFn).toBeCalledWith(photoSchema)
  })

})
