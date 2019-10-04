import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {
    borderTop: '1px solid #dadce0',
    boxSizing: 'border-box',
    height: '8px',
    marginTop: 8,
  },
}

const MenuSeparator = ({ classes }) =>
  <div className={classes.root} />

MenuSeparator.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(MenuSeparator)
