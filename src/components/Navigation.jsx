import React from 'react'
import { object, node } from 'prop-types'
import { withStyles } from '@material-ui/core'
import Logo from 'components/Logo'

const styles = theme => ({

  root: {
    display: 'none',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  logo: {
    padding: 30,
    paddingTop: 20,
    paddingBottom: 15,
    display: 'flex',
    fontFamily: 'Google Sans',
    alignItems: 'center',
  },

  logoText: {
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
})

const Navigation = ({ classes, children }) =>
  <div className={classes.root}>
    <header className={classes.logo}>
      <Logo />
    </header>
    {children}
  </div>

Navigation.propTypes = {
  classes: object.isRequired,
  children: node.isRequired,
}

export default withStyles(styles)(Navigation)
