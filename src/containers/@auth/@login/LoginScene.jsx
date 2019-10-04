import React, { Component } from 'react'
import { AuthCard, Form, LoginForm } from 'components'
import { Helmet } from 'react-helmet'
import { func, shape } from 'prop-types'
import Storage from 'services/Storage'
import { actions, connect } from 'src/redux'

class LoginScene extends Component {

  login = async (form) => {
    const { redux, history } = this.props
    const action = await redux.login(form)
    const previous_user_location = Storage.get('previous_user_location')
    history.push(previous_user_location || '/home')
    return action
  }

  render() {
    return (
      <AuthCard title="ВОЙТИ">
        <Helmet>
          <title>Вход в аккаунт - Partymaker Admin</title>
        </Helmet>
        <Form component={LoginForm} onSubmit={this.login} />
      </AuthCard>
    )
  }
}

LoginScene.propTypes = {
  history: shape({ push: func.isRequired }),
  redux: shape({ login: func.isRequired }),
}

const redux = () => ({
  login: actions.auth.login,
})

export default connect(redux)(LoginScene)
