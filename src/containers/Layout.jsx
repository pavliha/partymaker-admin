import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { object, shape } from 'prop-types'
import { AuthGate, Account } from 'components'
import userShape from 'shapes/user'
import { connect, select } from 'src/redux'
import { withStyles } from '@material-ui/core'
import AuthLayout from './@auth/AuthLayout'
import HomeLayout from './@home/HomeLayout'

const styles = {
  account: {
    position: 'absolute',
    right: 15,
    height: 90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const Layout = ({ classes, redux }) =>
  <Fragment>
    <Account className={classes.account} user={redux.user} />
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <AuthGate path="/home" component={HomeLayout} />
      <Redirect to="/home" />
    </Switch>
  </Fragment>

Layout.propTypes = {
  classes: object.isRequired,
  redux: shape({
    user: userShape.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  user: select.auth.user(state),
})

export default withStyles(styles)(connect(redux)(Layout))
