import React from 'react'
import userShape from 'shapes/user'
import { object, bool, arrayOf, string, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Switch, Route, Redirect } from 'react-router-dom'
import { actions, connect, select } from 'src/redux'
import { Header, SideMenu, Navigation } from 'components'
import RoomsScene from './@rooms/RoomsScene'
import EntertainmentsScene from './@entertainments/EntertainmentsScene'
import PlacesScene from './@places/PlacesScene'
import DashboardScene from './@dashboard/DashboardScene'

const styles = (theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
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
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
})

const HomeLayout = ({ classes, redux }) => (
  <div className={classes.root}>
    <Header user={redux.user} onMenu={redux.openMenuDrawer} />
    <div className={classes.container}>
      <Navigation
        isDrawerOpen={redux.isDrawerOpen}
        onDrawerClose={redux.closeMenuDrawer}
      >
        <SideMenu
          user={redux.user}
          expanded={redux.expanded}
          className={classes.menu}
          onExpand={redux.expandSideMenu}
        />
      </Navigation>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/home/dashboard" component={DashboardScene} />
          <Route exact path="/home/entertainments" component={EntertainmentsScene} />
          <Route exact path="/home/places" component={PlacesScene} />
          <Route exact path="/home/rooms" component={RoomsScene} />
          <Route exact path="/home/orders" component={RoomsScene} />
          <Route exact path="/home/users" component={RoomsScene} />
          <Redirect to="/home/dashboard" />
        </Switch>
      </main>
    </div>
  </div>
)

HomeLayout.propTypes = {
  classes: object.isRequired,
  redux: shape({
    expanded: arrayOf(string).isRequired,
    isDrawerOpen: bool.isRequired,
    user: userShape.isRequired,
    openMenuDrawer: func.isRequired,
    closeMenuDrawer: func.isRequired,
    expandSideMenu: func.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  expanded: state.ui.sideMenu.expanded,
  isDrawerOpen: state.ui.sideMenu.isDrawerOpen,
  user: select.auth.user(state),
  expandSideMenu: actions.ui.sideMenu.expand,
  openMenuDrawer: actions.ui.sideMenu.openDrawer,
  closeMenuDrawer: actions.ui.sideMenu.closeDrawer
})

export default withStyles(styles)(connect(redux)(HomeLayout))
