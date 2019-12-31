import React from 'react'
import Account from './Account'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { IconButton } from '@material-ui/core'

describe('<Account />', () => {

  const setup = (Component, state) => {
    const mockStore = configureStore([])
    const store = mockStore(state)

    return mount(
      <Provider store={store}>
        {Component}
      </Provider>
    )
  }

  it('renders null when unauthorized', () => {
    const state = {
      auth: { user_id: null },
      users: { entities: {} }
    }
    const tree = setup(<Account />, state)
    expect(tree.find(IconButton).exists()).toBe(false)
  })

  it('renders username when authorized ', () => {
    const state = {
      auth: { user_id: 1 },
      users: { entities: { 1: { id: 1, name: 'Test User' } } }
    }
    const tree = setup(<Account />, state)
    expect(tree.find(IconButton).exists()).toBe(true)
  })

})
