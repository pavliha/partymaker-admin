import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Logo, NavigationItem } from 'components'
import MapIcon from 'mdi-react/MapIcon'

const styles = theme => ({

  root: {
    display: 'none',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },

  logo: {
    display: 'flex',
    fontFamily: 'Google Sans',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
  },

  logoText: {
    fontWeight: 500,
    fontFamily: 'Google Sans',
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
})

const Navigation = ({ classes }) =>
  <div className={classes.root}>
    <header className={classes.logo}>
      <Logo />
    </header>
    <nav className={classes.menu}>
      <NavigationItem url="/places" icon={MapIcon}>Заведения</NavigationItem>
    </nav>
  </div>

Navigation.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(Navigation)
