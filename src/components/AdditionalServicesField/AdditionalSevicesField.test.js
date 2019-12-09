import React from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AdditionalServicesField from './AdditionalServicesField'
import theme from 'config/theme'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

describe('AdditionalServicesField', () => {

  it('renders with minimal props', () => {
    const mockStore = configureStore([])
    const store = mockStore({})

    const additional_services = [
      {
        id: 1,
        title: 'Аренда беседок',
        description: 'Вмешает от 1 до 6 человек',
        price: 100,
      }, {
        id: 2,
        title: 'Аренда беседок',
        description: 'Вмешает от 1 до 6 человек',
        price: 100,
      }
    ]

    const tree = renderer
      .create(
        <ThemeProvider theme={createMuiTheme(theme)}>
          <Provider store={store}>
            <AdditionalServicesField
              name="additional_services"
              value={additional_services}
              onChange={() => {}}
            />
          </Provider>
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
