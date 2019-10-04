import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {},
}

const MenuDropdown = ({ classes }) =>
  <div className={classes.root} />

MenuDropdown.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(MenuDropdown)
