import React from 'react'
import PlaceListItem from './PlaceListItem'
import Thumbnail from 'components/Thumbnail/Thumbnail'
import { createMuiTheme, IconButton } from '@material-ui/core'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from 'config/theme'
import { MemoryRouter } from 'react-router-dom'

describe('<PlaceListItem />', () => {
  const setup = (Component) => {
    return mount(
      <MemoryRouter>
        <ThemeProvider theme={createMuiTheme(theme)}>
          {Component}
        </ThemeProvider>
      </MemoryRouter>
    )
  }
  const place = { id: 1, title: 'Test Place', picture_url: 'fake.jpg' }

  it('should display thumbnail', () => {
    const place = { id: 1, title: 'Test Place', picture_url: 'fake.jpg' }
    const listItem = setup(<PlaceListItem place={place} />)
    expect(listItem.find(Thumbnail).exists()).toBeTruthy()
  })

  it('should handle onDelete', () => {
    const deleteFn = jest.fn()
    const listItem = setup(<PlaceListItem place={place} onDelete={deleteFn} />)
    const iconButton = listItem.find(IconButton).find({ 'data-testid': 'PlaceListItem-delete' }).first()
    iconButton.simulate('click')
    expect(deleteFn).toBeTruthy()
  })

})
