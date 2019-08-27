import React from 'react'
import { object, func, number } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'

const styles = {
  root: {},
  icon: {
    width: 15,
    height: 15,
  },
}

const CloseButton = ({ classes, size, onClick }) =>
  <div>
    <IconButton onClick={onClick}>
      <CloseIcon className={classes.icon} style={{ width: size, height: size }} />
    </IconButton>
  </div>

CloseButton.propTypes = {
  classes: object.isRequired,
  size: number,
  onClick: func,
}

export default withStyles(styles)(CloseButton)
