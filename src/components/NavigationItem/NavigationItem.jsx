import React from 'react'
import { node, object, shape, string } from 'prop-types'
import { SvgIcon } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'

const styles = (theme) => ({

  root: {
    font: '400 14px/20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    borderRadius: '0 50px 50px 0',
    padding: '10px 16px 10px 24px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Google Sans ,Roboto,Arial,sans-serif',
    fontSize: '.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    color: '#3c4043',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.039)',
      transition: 'background 15ms',
    },
  },

  icon: {
    marginRight: 16,
  },

  selected: {
    background: 'rgba(147, 6, 188, 0.12)',
    color: theme.palette.primary.main,
  },
})

export const NavigationItem = ({ location, classes, icon: Icon, url, children }) =>
  <Link
    to={`/home${url}`}
    className={classNames({
      [classes.root]: true,
      [classes.selected]: location.pathname === `/home${url}`,
    })}>
    <SvgIcon className={classes.icon}><Icon /></SvgIcon>
    {children}
  </Link>

NavigationItem.propTypes = {
  classes: object.isRequired,
  location: shape({ pathname: string }).isRequired,
  url: string.isRequired,
  children: node.isRequired,
  icon: object.isRequired,
}

export default withStyles(styles)(withRouter(NavigationItem))
