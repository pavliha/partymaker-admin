import React from 'react'
import EntertainmentsLoader from './EntertainmentsLoader'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe('<EntertainmentsLoader />', () => {

  const setup = (Component, state = {}) => {
    const mockStore = configureStore([])
    const store = mockStore(state)
    return shallow(
      <Provider store={store}>
        {Component}
      </Provider>
    ).dive()
  }

  it('should render children', () => {
    const loader = setup(<EntertainmentsLoader>clild</EntertainmentsLoader>)
    expect(loader.text()).toContain('clild')
  })
})
