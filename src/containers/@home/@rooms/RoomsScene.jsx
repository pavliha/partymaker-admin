import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {},
}

const RoomsScene = ({ classes }) =>
  <div className={classes.root}>

  </div>

RoomsScene.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(RoomsScene)
