import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AuthGate } from 'components'
import AuthLayout from './@auth/AuthLayout'
import HomeLayout from './@home/HomeLayout'

const Layout = () =>
  <Switch>
    <Route path="/auth" component={AuthLayout} />
    <AuthGate path="/home" component={HomeLayout} />
    <Redirect to="/home" />
  </Switch>

export default Layout
