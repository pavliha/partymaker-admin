import React from 'react'
import EntertainmentsField from './EntertainmentsField'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { FormControl } from '@material-ui/core'

describe('<EntertainmentsField />', () => {

  const testProps = {
    name: 'entertainment_id',
    value: 1,
    onChange: () => {},
    error: true,
    label: 'Label',
    helperText: 'Dummy helper text'
  }

  const state = {
    entertainments: {
      entities: {
        1: { id: 1, title: 'Entertainment 1' },
        2: { id: 2, title: 'Entertainment 2' }
      }
    },

    places: {
      entities: {
        1: { id: 1, title: 'Entertainment 1', entertainment_id: 1, },
        2: { id: 2, title: 'Entertainment 2', entertainment_id: 1, }
      }
    }
  }

  const setup = (Component) => {
    const mockStore = configureStore([])
    const store = mockStore(state)
    return mount(<Provider store={store}>{Component}</Provider>)
  }

  it('should show helper text', () => {
    const field = setup(<EntertainmentsField {...testProps} />)
    expect(field.text()).toContain('Dummy helper text')
  })

  it('should handle error', () => {
    const field = setup(<EntertainmentsField {...testProps} />)
    expect(field.find(FormControl).exists()).toBe(true)
  })

  it('should display label', () => {
    const field = setup(<EntertainmentsField {...testProps} />)
    expect(field.text()).toContain('Label')
  })

})
