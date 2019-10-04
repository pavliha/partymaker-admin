import React from 'react'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {
    borderRadius: 5,
    height: 100,
    padding: 5,
  },
}

const Photo = ({ classes, src }) =>
  <img alt={src} src={src} className={classes.root} />

Photo.propTypes = {
  classes: object.isRequired,
  src: string,
}

export default withStyles(styles)(Photo)
