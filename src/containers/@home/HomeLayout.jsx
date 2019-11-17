import React from 'react'
import userShape from 'shapes/user'
import { object, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect, select } from 'src/redux'
import { Navigation, SideMenu, UserMenu } from 'components'
import EntertainmentsScene from './@entertainments/EntertainmentsScene'
import PlacesScene from './@places/PlacesScene'

const styles = (theme) => ({

  root: {},

  container: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
  },

  menu: {
    paddingTop: 20,
    flexGrow: 1,
    width: 320,
    [theme.breakpoints.up('md')]: {
      width: 270,
    },
    zIndex: 0,
  },

  content: {
    width: 'calc(100% - 270px)',
    flex: 1,
    paddingTop: 60,
  },

  userMenu: {
    position: 'absolute',
    right: 15,
    top: 5,
  },
})

const HomeLayout = ({ classes, redux: { user } }) => (
  <div className={classes.root}>
    <div className={classes.userMenu}>
      <UserMenu user={user} />
    </div>
    <div className={classes.container}>
      <Navigation>
        <SideMenu user={user} className={classes.menu} />
      </Navigation>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/home/entertainments" component={EntertainmentsScene} />
          <Route exact path="/home/places" component={PlacesScene} />
          <Redirect to="/home/entertainments" />
        </Switch>
      </main>
    </div>
  </div>
)

HomeLayout.propTypes = {
  classes: object.isRequired,
  redux: shape({
    user: userShape.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  user: select.auth.user(state),
})

export default withStyles(styles)(connect(redux)(HomeLayout))
