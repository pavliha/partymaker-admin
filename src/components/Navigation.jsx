import React, { Fragment } from 'react'
import { bool, object, func, node } from 'prop-types'
import { withStyles } from '@material-ui/core'
import SideMenuDrawer from './SideMenuDrawer'

const styles = theme => ({
  root: {
    display: 'none',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }
})

const Navigation = ({ classes, isDrawerOpen, onDrawerClose, children }) =>
  <Fragment>
    <div className={classes.root}>
      {children}
    </div>
    <SideMenuDrawer
      isOpen={isDrawerOpen}
      onClose={onDrawerClose}
    >
      {children}
    </SideMenuDrawer>
  </Fragment>

Navigation.propTypes = {
  classes: object.isRequired,
  isDrawerOpen: bool.isRequired,
  onDrawerClose: func.isRequired,
  children: node.isRequired,
}

export default withStyles(styles)(Navigation)
