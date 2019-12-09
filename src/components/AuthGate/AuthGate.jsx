import React from 'react'
import { string, elementType, shape } from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { connect, select } from 'src/redux'
import userShape from 'shapes/user'

const AuthGate = ({ redux: { user }, ...props }) => {

  if (!user) return <Redirect to="/auth/login" />

  return <Route {...props} />
}

AuthGate.propTypes = {
  path: string,
  component: elementType,
  redux: shape({
    user: userShape,
  })
}

const redux = (state) => ({
  user: select.auth.user(state)
})

export default connect(redux)(AuthGate)
