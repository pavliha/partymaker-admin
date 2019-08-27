import React from 'react'
import { object, func, bool } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon'
import classNames from 'classnames'

const styles = {
  root: {},
  expanded: {
    transform: 'rotate(180deg)',
    transition: 'all 0.1s ease-out',
  },

  icon: {
    width: 15,
    height: 15,
  },
}

const ExpandButton = ({ classes, isExpanded, onClick }) =>
  <div>
    <IconButton
      className={classNames({
        [classes.root]: true,
        [classes.expanded]: isExpanded,
      })}
      onClick={onClick}
    >
      <ExpandMoreIcon className={classes.icon} />
    </IconButton>
  </div>

ExpandButton.propTypes = {
  classes: object.isRequired,
  isExpanded: bool,
  onClick: func,
}

export default withStyles(styles)(ExpandButton)
