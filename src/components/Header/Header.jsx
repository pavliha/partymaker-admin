import React from 'react'
import { object, node, string, func } from 'prop-types'
import { Typography, withStyles, IconButton } from '@material-ui/core'
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'

const styles = {
  root: {
    height: 90,
    display: 'flex',
    alignItems: 'center',
  },

  iconButton: {
    marginRight: 10,
  },

  title: {
    marginRight: 10,
  }
}

const Header = ({ classes, title, action, onBack }) =>
  <header className={classes.root}>
    {onBack && (
      <IconButton
        className={classes.iconButton}
        color="secondary"
        onClick={onBack}
      >
        <ArrowLeftIcon />
      </IconButton>
    )}
    <Typography
      variant={onBack ? 'h5' : 'h4'}
      className={classes.title}
    >{title}
    </Typography>
    {action}
  </header>

Header.propTypes = {
  classes: object.isRequired,
  action: node,
  title: string,
  onBack: func,
}

export default withStyles(styles)(Header)
