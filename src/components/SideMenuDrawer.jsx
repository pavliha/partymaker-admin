import React from 'react'
import { object, func, bool, node } from 'prop-types'
import { withStyles, Drawer, Typography } from '@material-ui/core'

const styles = () => ({
  root: {},
  head: {
    display: 'flex',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(90deg,#4252d1,#609bdb)',
    height: 250,
  },
})

const SideMenuDrawer = ({ classes, isOpen, onClose, children }) =>
  <Drawer
    anchor="left"
    open={isOpen}
    onClose={onClose}
  >
    <div className={classes.head}>
      <Typography color="inherit" variant="h5">
        Invoice CRM
      </Typography>
    </div>
    {children}
  </Drawer>

SideMenuDrawer.propTypes = {
  classes: object.isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  children: node.isRequired,
}

export default withStyles(styles)(SideMenuDrawer)
