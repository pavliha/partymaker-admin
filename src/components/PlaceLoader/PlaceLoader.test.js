import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import PlaceLoader from './PlaceLoader'

describe('<PlaceLoader />', () => {

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
    const loader = setup(<PlaceLoader>clild</PlaceLoader>)
    expect(loader.text()).toContain('clild')
  })
})
