import React from 'react'
import Account from './Account'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe('<Account />', () => {

  const setup = (Component, state) => {
    const mockStore = configureStore([])
    const store = mockStore(state)

    const tree = mount(
      <Provider store={store}>
        {Component}
      </Provider>
    )

    return tree
  }

  it('renders null when unauthorized', () => {
    const state = {
      auth: { user_id: null },
      users: { entities: {} }
    }
    const tree = setup(<Account />, state)
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('renders username when authorized ', () => {
    const state = {
      auth: { user_id: 1 },
      users: { entities: { 1: { id: 1, name: 'Test User' } } }
    }
    const tree = setup(<Account />, state)
    expect(toJson(tree)).toMatchSnapshot()
  })

})
