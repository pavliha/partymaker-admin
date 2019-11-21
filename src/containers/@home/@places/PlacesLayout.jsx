import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PlacesScene from './PlacesScene'

const PlacesLayout = () =>
  <Switch>
    <Route exact path="/home/places" component={PlacesScene} />
  </Switch>

export default PlacesLayout
