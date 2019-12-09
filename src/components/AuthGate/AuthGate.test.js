import React from 'react'
import renderer from 'react-test-renderer'
import AuthGate from './AuthGate'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { object } from 'prop-types'

const loggedInState = {
  auth: { user_id: 1 },
  users: {
    entities: {
      1: {
        id: 1,
        name: 'Test User'
      }
    }
  }
}

const loggedOutState = {
  auth: { user_id: null },
  users: {
    entities: {}
  }
}

const TestGate = ({ store }) =>
  <MemoryRouter initialEntries={['/home']} initialIndex={0}>
    <Provider store={store}>
      <AuthGate path="/home" component={() => <div>route 1</div>} />
    </Provider>
  </MemoryRouter>

TestGate.propTypes = {
  store: object,
}

describe('AuthGate', () => {

  const mockStore = configureStore([])

  it('renders /home route when logged in', () => {
    const tree = renderer.create(<TestGate store={mockStore(loggedInState)} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders redirect to /auth/login when logged out', () => {
    const tree = renderer.create(<TestGate store={mockStore(loggedOutState)} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
