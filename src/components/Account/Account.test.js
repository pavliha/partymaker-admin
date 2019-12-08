import React from 'react'
import Account from './Account'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

it('renders null when unauthorized', () => {

  const mockStore = configureStore([])
  const store = mockStore({
    auth: { user_id: null },
    users: {
      entities: {}
    }
  })

  const tree = renderer
    .create(
      <Provider store={store}>
        <Account />
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders username when authorized ', () => {

  const mockStore = configureStore([])
  const store = mockStore({
    auth: { user_id: 1 },
    users: {
      entities: {
        1: {
          id: 1,
          name: 'Test User'
        }
      }
    }
  })

  const tree = renderer
    .create(
      <Provider store={store}>
        <Account />
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
