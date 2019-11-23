import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PlacesScene from './PlacesScene'
import CreateScene from './@create/CreateScene'
import PlaceScene from './@id/PlaceScene'

const PlacesLayout = () =>
  <Switch>
    <Route exact path="/home/places" component={PlacesScene} />
    <Route exact path="/home/places/create" component={CreateScene} />
    <Route exact path="/home/places/:id" component={PlaceScene} />
  </Switch>

export default PlacesLayout
