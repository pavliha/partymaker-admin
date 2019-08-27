import React from 'react'
import { node, number, object } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {
    display: 'inline-block',
  },
}

const Line = ({ classes, width, children }) =>
  <span className={classes.root} style={{ width }}>
    {children}
  </span>

Line.propTypes = {
  classes: object.isRequired,
  width: number,
  children: node,
}

export default withStyles(styles)(Line)
