import React from 'react'
import userShape from 'shapes/user'
import { func, object, shape, string } from 'prop-types'
import { IconButton, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import classNames from 'classnames'
import { actions, connect, select } from 'src/redux'
import LogoutIcon from 'mdi-react/LogoutIcon'

const styles = {

  root: {
    paddingTop: 3,
    display: 'flex',
    alignItems: 'center',
  },

  avatar: {
    fontSize: '0.9rem',
  },

  userName: {
    marginLeft: 3,
    marginRight: 15,
    fontWeight: 400,
    fontFamily: 'Google Sans',
  },

}

const Account = ({ classes, redux: { user, logout }, className }) => {

  if (!user) return null

  return (
    <div className={classNames([classes.root, className])}>
      <Typography className={classes.userName}>{user.name}</Typography>
      <IconButton onClick={logout} color="inherit"><LogoutIcon /></IconButton>
    </div>
  )
}

Account.propTypes = {
  classes: object.isRequired,
  className: string,
  redux: shape({
    user: userShape,
    logout: func,
  })
}

const redux = state => ({
  user: select.auth.user(state),
  logout: actions.auth.logout,
})

export default withStyles(styles)(connect(redux)(Account))
