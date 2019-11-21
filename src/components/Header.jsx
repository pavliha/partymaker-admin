import React from 'react'
import { object, node } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

const styles = {
  root: {
    height: 90,
    display: 'flex',
    alignItems: 'center',
  },

  title: {
    marginRight: 10,
  }
}

const Header = ({ classes, action }) =>
  <header className={classes.root}>
    <Typography variant="h4" className={classes.title}>Заведения</Typography>
    {action}
  </header>

Header.propTypes = {
  classes: object.isRequired,
  action: node,
}

export default withStyles(styles)(Header)
