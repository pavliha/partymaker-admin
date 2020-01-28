/* eslint-disable simple-import-sort/sort */
import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Navigation } from 'components'
import PlacesLayout from './@places/PlacesLayout'

const styles = {

  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
  },

  content: {
    marginLeft: 15,
    width: 'calc(100% - 270px)',
    flex: 1,
  },

}

const HomeLayout = ({ classes }) => (
  <div className={classes.root}>
    <Navigation />
    <main className={classes.content}>
      <Switch>
        <Route path="/home/places" component={PlacesLayout} />
        <Redirect to="/home/places" />
      </Switch>
    </main>
  </div>
)

HomeLayout.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(HomeLayout)
