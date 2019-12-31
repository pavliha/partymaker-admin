import React from 'react'
import PlacesList from './PlacesList'
import PlaceListItem from 'components/PlaceListItem'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createMuiTheme } from '@material-ui/core'
import theme from 'config/theme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { MemoryRouter } from 'react-router-dom'

describe('<PlacesList />', () => {

  const testProps = {
    places: [{
      id: 1,
      title: 'Place title',
      picture_url: 'https://domain.com/fake.jpg',
      price: 100,
    }],
    onDelete: () => {},
  }

  const setup = (Component, state = {}) => {
    const mockStore = configureStore([])
    const store = mockStore(state)

    return mount(
      <MemoryRouter>
        <ThemeProvider theme={createMuiTheme(theme)}>
          <Provider store={store}>{Component}</Provider>
        </ThemeProvider>
      </MemoryRouter>
    )
  }

  it('should show list of places', async () => {
    const field = setup(<PlacesList {...testProps} />)
    expect(field.find(PlaceListItem)).toHaveLength(1)
  })

})
