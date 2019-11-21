import React, { Component } from 'react'
import userShape from 'shapes/user'
import { object, string } from 'prop-types'
import { IconButton, withStyles, MenuItem, Menu, Typography } from '@material-ui/core'
import AccountIcon from 'mdi-react/AccountCircleIcon'
import classNames from 'classnames'

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

class Account extends Component {

  state = {
    anchorEl: null,
  }

  open = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  close = () => {
    this.setState({ anchorEl: null })
  }

  logout = () => {
    window.location.replace('/logout')
  }

  render() {
    const { classes, user, className } = this.props
    const { anchorEl } = this.state

    if (!user) return null

    return (
      <div className={classNames([classes.root, className])}>
        <IconButton
          color="inherit"
          aria-owns={anchorEl ? 'user-menu' : undefined}
          aria-haspopup="true"
          onClick={this.open}
        >
          <AccountIcon className={classes.avatar} user={user} />
        </IconButton>
        <Typography className={classes.userName} onClick={this.open}>
          {user.name}
        </Typography>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.close}
        >
          <MenuItem to="/logout" onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

Account.propTypes = {
  classes: object.isRequired,
  className: string,
  user: userShape.isRequired,
}

export default withStyles(styles)(Account)
