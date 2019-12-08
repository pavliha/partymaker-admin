import React, { useState } from 'react'
import userShape from 'shapes/user'
import { func, object, shape, string } from 'prop-types'
import { IconButton, Menu, MenuItem, Typography, withStyles } from '@material-ui/core'
import AccountIcon from 'mdi-react/AccountCircleIcon'
import classNames from 'classnames'
import { actions, connect, select } from 'src/redux'

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
    cursor: 'pointer',
    marginLeft: 3,
    marginRight: 15,
    fontWeight: 400,
    fontFamily: 'Google Sans',
  },
}

const Account = ({ classes, redux: { user, logout }, className }) => {
  const [open, toggleOpen] = useState(null)

  if (!user) return null

  return (
    <div className={classNames([classes.root, className])}>
      <IconButton
        color="inherit"
        aria-owns={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        onClick={e => toggleOpen(e.currentTarget)}
      >
        <AccountIcon className={classes.avatar} user={user} />
      </IconButton>
      <Typography
        className={classes.userName}
        onClick={e => toggleOpen(e.currentTarget)}
      >
        {user.name}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={open}
        open={Boolean(open)}
        onClose={() => toggleOpen(null)}
      >
        <MenuItem onClick={() => {
          logout()
          toggleOpen(null)
        }}>Logout</MenuItem>
      </Menu>
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
