import React from 'react'
import { object, func, number, string } from 'prop-types'
import { IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import CloseIcon from 'mdi-react/CloseIcon'

const styles = {
  root: {},
  icon: {
    width: 15,
    height: 15,
  },
}

const CloseButton = ({ classes, className, size, color, onClick }) =>
  <div>
    <IconButton className={className} onClick={onClick}>
      <CloseIcon className={classes.icon} style={{ color: color, width: size, height: size }} />
    </IconButton>
  </div>

CloseButton.propTypes = {
  classes: object.isRequired,
  className: string,
  size: number,
  onClick: func,
  color: string,
}

export default withStyles(styles)(CloseButton)
